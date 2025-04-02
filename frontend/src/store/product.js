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
            console.error("Create product error: ", error.message);
            return { success: "failed", message: error.message };
        }

    },
    fetchProducts: async () => {
        try {
            const res = await api.get('/products');
            const data = res.data;
            set({ products: data.data });
        } catch (error) {
            console.error("Fetch products error: ", error.message);
            return { success: "failed", message: error.message };
        }
    },
    deleteProduct: async (id) => {
        try {
            const res = await api.delete('/products/' + id);
            const data = res.data;
            if (!data.success) {
                return { success: "failed", message: data.message };
            }
            set((state) => ({ products: state.products.filter(product => product._id !== id) }));
            return { success: "success", message: "Product deleted successfully" };
        } catch (error) {
            console.error("Delete product error: ", error.message);
            return { success: "failed", message: error.message };
        }
    },
    updateProduct: async (id, updatedProduct) => {
        try {
            const res = await api.patch('/products/' + id, updatedProduct);
            const data = res.data;
            if (!data.success) {
                return { success: "failed", message: data.message };
            }
            set((state) => ({
                products: state.products.map((product) => (product._id === id ? { ...product, ...updatedProduct } : product))
            }));
            return { success: "success", message: "Product updated successfully" };
        } catch (error) {
            console.error("Update product error: ", error.message);
            return { success: "failed", message: error.message };
        }
    },
}));