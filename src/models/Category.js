import mongoose, { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        defaultValue: 'uncategorized'
    },
    slug: { 
        type: String ,
        required: true,
        unique: true,
        defaultValue: 'uncategorized'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
},
    { timestamps: true, versionKey: false}
)
// categorySchema.plugin(mongoosePaginate)
export default model('Category', categorySchema)