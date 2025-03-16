import { create } from 'zustand';
import axios from 'axios';

const headers = {
    "Content-Type": "application/json",
}
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers
});

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.imageUrl || newProduct.countInStock === undefined) {
            return { success: "failed", message: "Please fill out all fields." };
        }

        try {
            console.log(newProduct)
            const res = await api.post('/products', newProduct);
            const data = res.data;
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: "success", message: "Product created successfully" };
        } catch (error) {
            return { success: "failed", message: error.message };
        }

    },
}));