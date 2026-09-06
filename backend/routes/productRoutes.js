const express = require('express');


//user routes - not required
//const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');   

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

const router = express.Router();


//if get is called then getProducts will be called and if post is called then createProduct will be called
router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct); //all products will be fetched and only admin can create a product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct); //specific product will be fetched and only admin can update or delete a product


module.exports = router;