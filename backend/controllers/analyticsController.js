const Order = require('../model/Order');
const User = require('../model/User');
const Product = require('../model/Product');

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        const orders = await Order.find({});
        const totalRevenueData = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        res.status(200).json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenueData,
        });
    } catch (error) {
        console.error('Get admin stats error:', error);
        res.status(500).json({ message: 'Server error : Cannot fetch admin stats' });
    }
};

module.exports = { getAdminStats };

