import { Schema, model } from 'mongoose'
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minLength: 3
    },
    email: { 
        type: String ,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'member',    
    }
}, {
    timestamps: true,
    versionKey: false
})
export default model('User', userSchema)