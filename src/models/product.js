import { Schema, model } from 'mongoose'
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    sku: { type: String },
    price:{
        type: Number,
        required: true,
        minLength: 1
    },
    url: { type: String },
    description: { type: String }
}, {
    timestamps: true,
    versionKey: false
})
export default model('Product', productSchema)