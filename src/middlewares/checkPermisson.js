import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"
dotenv.config()

const {SECRET_CODE = 'nghinguyenzero' } = process.env
export const checkPermission = async(req, res, next) => {

    try {
        // 1. Check User login
        const token =  req.headers.authorization?.split(' ')[1]

        // 2. Check token
        if(!token) {
            return res.status(403).json({ 
                message: 'You are not logged in'
            })
        }
        // 3. Check role user
        const decoded = jwt.verify(token, SECRET_CODE )
        const user = await User.findById(decoded._id)
        if(!user) {
            return res.status(403).json({ 
                message: 'Error tokens!'
            })
        }

        if(user.role !== 'admin') {
            return res.status(400).json({ 
                message: 'You do not have permission to log in!'
            })
        }
        // 4. NEXT
        next()
        
    } catch (error) {
        return res.status(500).json({ 
            name: error.name,
            message: error.message 
        })
    }
}