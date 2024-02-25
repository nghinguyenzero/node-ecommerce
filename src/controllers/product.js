import Product from '../models/product.js'
import {productValid} from '../validation/product.js'


export const getAll = async(req, res) => {
    try {
        const products = await Product.find()
        if(products.length === 0 ) {
            return res.status(404).json({ 
                messenge: 'Product not found'
            })
        } else {
            return res.status(200).json({ 
                messenge: 'Get the products successfully',
                datas: products
            })
        }
    } catch (error) {
        return res.status(500).json({ messenge: error })
    }

}

export const getDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(404).json({ messenge: 'Product not found' })
        }
        return res.status(200).json({ 
            messenge: 'Get the product successfully', 
            datas : product 
        })
    } catch (error) {
        return res.status(500).json({ messenge: error })
    }
}

export const create = async (req, res) => {

    try {
        const {error} = productValid.validate(req.body, { abortEarly: false})
        if(error) {
            return res.status(400).json({ messenge: error.details[0].message})
        }
        const product = await Product.create(req.body)
        if(!product) {
            return res.status(404).json({ messenge: 'Create an unsuccessful product' })
        }
        return res.status(200).json({ 
            messenge: 'Create an successful product', 
            datas : product 
        })
    } catch (error) {
        return res.status(500).json({ messenge: error })
    }
}

export const update = async (req, res) => {
    try {
        const { error } = productValid.validate(req.body, { abortEarly: false})
        console.log({ error:  productValid.validate(req.body)});
        if(error) {
            return res.status(400).json({ messenge: error.details[0].message})
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!product) {
            return res.status(404).json({ messenge: 'Update an unsuccessful product' })
        }
        return res.status(200).json({ 
            messenge: 'Update an successful product', 
            datas : product 
        })
    } catch (error) {
        return res.status(500).json({ messenge: error })
    }
}

export const remove = async (req, res) => {
    try {
        // const { error } = productValid.validate(req.body, { abortEarly: false})
        // console.log({ error:  productValid.validate(req.body)});
        // if(error) {
        //     return res.status(400).json({ messenge: error.details[0].message})
        // }
        // const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        // if(!product) {
        //     return res.status(404).json({ messenge: 'Update an unsuccessful product' })
        // }
        // return res.status(200).json({ 
        //     messenge: 'Update an successful product', 
        //     datas : product 
        // })
        const data = Product.findByIdAndDelete(req.params.id)
        if(!data) {
             return res.status(404).json({ messenge: 'Delete product unsuccessful' })
        }
        return res.status(200).json({ messenge: 'Delete product successful', datas: data })

    } catch (error) {
        return res.status(500).json({ messenge: error })
    }
}