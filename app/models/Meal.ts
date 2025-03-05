
import mongoose, { Document, model, Schema } from "mongoose";
export interface IProduct extends Document {
    name: string;
    price: number;
}

const productSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});
const Meal = model('Meal', productSchema);
export default Meal;
