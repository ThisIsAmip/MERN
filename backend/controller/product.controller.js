import Product from '../models/product.model.js';
import mongoose from 'mongoose';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Get products error: ", error.message);
        res.status(500).json({message: 'Server error.'});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data

    //if any of the data is missing
    if (!product.name || !product.price || !product.description || product.countInStock  === undefined || !product.imageUrl) { 
        return res.status(400).json({success: false, message: 'Please fill all the fields'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true,  data: newProduct});
    } catch (error) {
        console.error("Create product error: ", error.message);
        res.status(500).json({success: false, message: 'Server error.'});
    }
}

export const updateProduct =  async (req, res) => {
    const { id } = req.params; 
    const product = req.body; //user will send this data
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Invalid product id');
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});

    } catch (error) {
        console.error("Update product error: ", error.message);
        res.status(500).json({success: false, message: 'Server error.'});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Invalid product');
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted'});
    } catch (error) {
        console.error("Delete product error: ", error.message);
        res.status(500).json({success: false, message: 'Server error.'});
    }
}