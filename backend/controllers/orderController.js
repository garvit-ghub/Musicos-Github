const Order = require('../model/Order');
const sendEmail = require('../utils/sendEmail');
const {
    orderConfirmationEmail,
    orderDeliveredEmail,
} = require('../utils/emailTemplates');

const COURSE_DOWNLOAD_URL = 'https://youtu.be/dQw4w9WgXcQ';

const createOrder = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const newOrder = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId,
            status: 'Delivered',
            downloadUrl: COURSE_DOWNLOAD_URL,
        });

        await newOrder.save();

        res.status(201).json(newOrder);

        try {
            const confirmEmail = orderConfirmationEmail(
                req.user.name,
                newOrder._id,
                items,
                totalAmount
            );
            sendEmail(
                req.user.email,
                confirmEmail.subject,
                confirmEmail.text,
                confirmEmail.html
            ).catch((e) => console.error('Confirmation email failed:', e.message));
        } catch (emailError) {
            console.error('Confirmation email failed:', emailError.message);
        }

        try {
            const deliveredEmail = orderDeliveredEmail(
                req.user.name,
                newOrder._id,
                items,
                totalAmount,
                COURSE_DOWNLOAD_URL
            );
            sendEmail(
                req.user.email,
                deliveredEmail.subject,
                deliveredEmail.text,
                deliveredEmail.html
            ).catch((e) => console.error('Course delivery email failed:', e.message));
        } catch (emailError) {
            console.error('Course delivery email failed:', emailError.message);
        }
    } catch (error) {
        console.error('Create order error:', error.message);
        res.status(500).json({ message: error.message || 'Server error : Cannot create order' });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('user', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot get orders' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', '_id name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot get orders' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status, downloadUrl } = req.body;
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        if (downloadUrl) {
            order.downloadUrl = downloadUrl;
        }
        await order.save();

        if (order.user && status === 'Delivered') {
            try {
                const emailContent = orderDeliveredEmail(
                    order.user.name,
                    order._id,
                    order.items,
                    order.totalAmount,
                    order.downloadUrl
                );

                await sendEmail(
                    order.user.email,
                    emailContent.subject,
                    emailContent.text,
                    emailContent.html
                );
            } catch (emailError) {
                console.error('Delivery email failed:', emailError.message);
            }
        }

        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot update order status' });
    }
};

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };
