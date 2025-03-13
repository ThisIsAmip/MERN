import express from 'express';
import dotenv from 'dotenv';


import { connectDB } from './config/mongodb.js';
import productRoutes from '../routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //Allow us to accept json data in the body

app.use("/api/products",productRoutes)

//Start server and connect to database
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
});









