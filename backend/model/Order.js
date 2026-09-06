const mongoose = require('mongoose');
const orderschema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        items: [
            {
                productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true },
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        address: {
            fullName: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        paymentId: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered'],
            default: 'Pending',
        },
    }, {timestamps: true}
);

module.exports = mongoose.model('Order', orderschema);