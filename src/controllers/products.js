import Category from '../models/Category.js'
import Product from '../models/product.js'
import {productValidator} from '../validation/product.js'


export const getList = async(req, res) => {
    try {
        const {
            _page = 1, 
            _limit = 10, 
            _sort='createdBy',
            _order='asc'
        } = req.query
        const options ={
            page: _page,
            limit: _limit,
            sort: {
                [_sort]:_order === 'asc' ? 1 : -1
            },
            populate: {
                path: 'categoryId',
              },

        }
        const datas = await Product.paginate({}, options)
        if(datas.length === 0 ) {
            return res.status(404).json({ 
                message: 'Product not found'
            })
        } else {
            return res.status(200).json({ 
                message: 'Get the products successfully',
                datas 
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

export const getDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId')
        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        return res.status(200).json({ 
            message: 'Get the product successfully', 
            datas : product 
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const create = async (req, res) => {

    try {
        const {error} = productValidator.validate(req.body, { abortEarly: false})
        if(error) {
            return res.status(400).json({ 
                message: error.details[0].message || 'Please re-check your data !'
            })
        }
        const data = await Product.create(req.body)
        // console.log({data});
        if(!data) {
            return res.status(404).json({ message: 'Create product is not successful !' })
        }

        const updateCategory = await Category.findByIdAndUpdate(data.categoryId, {
            $addToSet : {
                products: data._id
            }
        })
        if(!updateCategory) {
            return res.status(404).json({ message: 'update Category is not successful !' })
        }

        return res.status(200).json({ 
            message: 'Create an successful product !', 
            datas : data 
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const update = async (req, res) => {
    try {
        const { error } = productValidator.validate(req.body, { abortEarly: false})
        console.log({ error:  productValidator.validate(req.body)});
        if(error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!product) {
            return res.status(404).json({ message: 'Update an unsuccessful product' })
        }
        const updateCategory = await Category.findByIdAndUpdate(data.categoryId, {
            $addToSet : {
                products: data._id
            }
        })
        if(!updateCategory) {
            return res.status(404).json({ message: 'update Category is not successful !' })
        }

        return res.status(200).json({ 
            message: 'Update an successful product', 
            datas : product 
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

// export const getMaxValue
// get value max in list

export const remove = async (req, res) => {
    try {
        const data = Product.findByIdAndDelete(req.params.id)
        if(!data) {
             return res.status(404).json({ message: 'Delete product unsuccessful' })
        }
        return res.status(200).json({ message: 'Delete product successful', datas: data })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}