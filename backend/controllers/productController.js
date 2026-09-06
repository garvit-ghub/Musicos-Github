const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot get products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot get product' });
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log('Cloudinary upload result:', result); // Log the result for debugging
            imageUrl = result.secure_url;
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    }   catch (error) {
        res.status(500).json({ message: 'Server error : Cannot create product' });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log('Cloudinary upload result:', result);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot update product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.status(200).json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot delete product' });
    }
};



module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};