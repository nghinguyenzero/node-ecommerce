import { Schema, model } from 'mongoose'
const productSchema = new Schema({
    name: {
        type: String,
        require: true,
        minLength: 3
    },
    sku: { type: String },
    price:{
        type: Number,
        require: true,
        minLength: 1
    },
    url: { type: String },
    description: { type: String }
}, {
    timestamps: true,
    versionKey: false
})
export default model('Product', productSchema)