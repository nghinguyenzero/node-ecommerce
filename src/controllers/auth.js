import User from '../models/User.js'
import {signUpValidator, loginValidator} from '../validation/user.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const {SECRET_CODE} = process.env

export const signUp = async(req, res) => {
    try {
        // 1. Validate user data
        const { error } = signUpValidator.validate(req.body, { abortEarly: false})
        if(error) {
            const errors = error.details.map(err=>err.message)
            return res.status(400).json({ message: errors })
        }

        // 2. check email unique
        const userExists = await User.findOne({ email: req.body.email })
        if(userExists){
            return res.status(400).json({ 
                message: 'Email đã được đăng kí bạn có muốn đăng nhập không'
            })
        }

        // 3. Encript password
        const hashPassword = await bcryptjs.hash(req.body.password, 10)

        // 4.Create User at bd
        const user = await User.create({
            ...req.body,
            password: hashPassword
        })

        // 5. Noti create successful, remove password
        user.password= undefined
        return res.status(200).json({ 
            message: 'Account has been successfully registered!',
            user
        })
    } catch (error) {
        return res.status(500).json({ 
            name: error.name,
            message: error.message 
        })
    }

}


export const login = async(req, res) => {
    try {
        // 1. Validate user data
        const { error } = loginValidator.validate(req.body, { abortEarly: false})
        if(error) {
            const errors = error.details.map(err=>err.message)
            return res.status(400).json({ message: errors })
        }

        // 2. check email exist, find userby email
        const user = await User.findOne({ email: req.body.email })
        if(!user){
            return res.status(400).json({ 
                message: 'Email does not exist, do you want to register?'
            })
        }

        // 3. check password
        const isMatch = await bcryptjs.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(404).json({ 
                message: 'Password not match!'
            })
        }
        // 4.Create JWT
        const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE)
        console.log({accessToken});

        // 5. Noti login successfull
        user.password= undefined
        return res.status(200).json({ 
            message: 'Login successfully!',
            user,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({ 
            name: error.name,
            message: error.message 
        })
    }

}
// export const getDetail = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if(!user) {
//             return res.status(404).json({ message: 'User not found' })
//         }
//         return res.status(200).json({ 
//             message: 'Get the user successfully', 
//             datas : user 
//         })
//     } catch (error) {
//         return res.status(500).json({ message: error })
//     }
// }

// export const create = async (req, res) => {

//     try {
//         const {error} = userValid.validate(req.body, { abortEarly: false})
//         if(error) {
//             return res.status(400).json({ message: error.details[0].message})
//         }
//         const user = await User.create(req.body)
//         if(!user) {
//             return res.status(404).json({ message: 'Create an unsuccessful user' })
//         }
//         return res.status(200).json({ 
//             message: 'Create an successful user', 
//             datas : user 
//         })
//     } catch (error) {
//         return res.status(500).json({ message: error })
//     }
// }

// export const update = async (req, res) => {
//     try {
//         const { error } = userValid.validate(req.body, { abortEarly: false})
//         console.log({ error:  userValid.validate(req.body)});
//         if(error) {
//             return res.status(400).json({ message: error.details[0].message})
//         }
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         if(!user) {
//             return res.status(404).json({ message: 'Update an unsuccessful user' })
//         }
//         return res.status(200).json({ 
//             message: 'Update an successful user', 
//             datas : user 
//         })
//     } catch (error) {
//         return res.status(500).json({ message: error })
//     }
// }

// export const remove = async (req, res) => {
//     try {
//         // const { error } = userValid.validate(req.body, { abortEarly: false})
//         // console.log({ error:  userValid.validate(req.body)});
//         // if(error) {
//         //     return res.status(400).json({ message: error.details[0].message})
//         // }
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         // if(!user) {
//         //     return res.status(404).json({ message: 'Update an unsuccessful user' })
//         // }
//         // return res.status(200).json({ 
//         //     message: 'Update an successful user', 
//         //     datas : user 
//         // })
//         const data = User.findByIdAndDelete(req.params.id)
//         if(!data) {
//              return res.status(404).json({ message: 'Delete user unsuccessful' })
//         }
//         return res.status(200).json({ message: 'Delete user successful', datas: data })

//     } catch (error) {
//         return res.status(500).json({ message: error })
//     }
// }