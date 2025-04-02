import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { connectDB } from './config/mongodb.js';
import productRoutes from './routes/product.route.js';

dotenv.config({path: '.env.local'});

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //Get the current directory name

app.use(cors());

app.use(express.json()); //Allow us to accept json data in the body

app.use("/api/products",productRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist'))); //Serve static files from the frontend build folder
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

//Start server and connect to database
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
});









