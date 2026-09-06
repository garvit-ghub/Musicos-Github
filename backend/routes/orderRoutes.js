const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');
const {createOrder, getOrders, myOrders, updateOrderStatus} = require('../controllers/orderController');
const router = express.Router(); 

router.route('/').post(protect, createOrder).get(protect, admin, getOrders); //only logged in user can create order and only admin can get all orders
router.route('/my').get(protect, myOrders); //only logged in user can get their own orders
router.route('/:id').get(protect, myOrders); //only logged in user can get specific order
router.route('/:id/status').put(protect, admin, updateOrderStatus); //only logged in user can get specific order and only admin can update order status

module.exports = router;