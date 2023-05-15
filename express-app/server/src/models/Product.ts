import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    brand: { type: String, required: false },
    image: { type: String, required: true },
    stock: { type: Number, required: false }
});

export const Product = model('Product', productSchema);