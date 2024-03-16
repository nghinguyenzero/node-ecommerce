import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

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
    description: { type: String },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})
productSchema.plugin(mongoosePaginate)
export default model('Product', productSchema)