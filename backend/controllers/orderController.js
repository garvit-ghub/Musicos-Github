const Order = require('../model/Order');
const sendEmail = require('../utils/sendEmail');

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
        });

        await newOrder.save();
        try {
            console.log('Sending email to:', req.user.email, 'Name:', req.user.name);
            await sendEmail(
                req.user.email,
                'Order Confirmation',
                `Hello ${req.user.name}, your order has been placed successfully! Thank you for shopping with us. Your order ID is ${newOrder._id}.`
            );
        } catch (emailError) {
            console.error('Email sending failed:', emailError.message);
        }
        res.status(201).json(newOrder);
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
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot update order status' });
    }
};
module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };