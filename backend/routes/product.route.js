import express from 'express';

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

//GET Products
router.get('/', getProducts);

//POST Product
router.post('/', createProduct);

//PATCH Product
router.patch('/:id', updateProduct);

//DELETE Products
router.delete('/:id', deleteProduct);


export default router;