import Category from '../models/Category.js'
import {categoryValidator} from '../validation/category.js'


export const getAll = async(req, res) => {
    try {
        const data = await Category.find()
        console.log({data});
        if(!data && data.length == 0) {
            return res.status(404).json({ 
                message: 'No categories'
            })
        }
        return res.status(200).json({ 
            message: 'Categories has been',
            datas: data

        })
    } catch (error) {
        return res.status(500).json({ 
            name: error.name,
            message: error 
        })
    }

}

export const create = async(req, res) => {
    try {
        const {error} = categoryValidator.validate(req.body, { abortEarly: false})
        if(error) {
            const errors = error.map(err => err.message)
            return res.status(400).json({ 
                message: errors  
            })
        }

        const category = await Category.create(req.body)
        console.log({category});

        if(!category) {
            return res.status(404).json({ 
                message: 'Create Categories not successfull !',
                // datas: data
            })
        }
        return res.status(200).json({ 
            message: 'Create Categories is successfull !',
            datas: category
        })
    } catch (error) {
        return res.status(500).json({ 
            name: error.name,
            message: error 
        })
    }

}

export const update = async (req, res) => {
    try {
        const { error } = categoryValidator.validate(req.body, { abortEarly: false})
        console.log({ error:  categoryValidator.validate(req.body)});
        if(error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!category) {
            return res.status(404).json({ message: 'Update an unsuccessful category' })
        }
        return res.status(200).json({ 
            message: 'Update an successful category', 
            datas : category 
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getDetail = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if(!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        return res.status(200).json({ 
            message: 'Get the category successfully', 
            datas : category 
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


export const remove = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete(req.params.id)
        console.log({id :req.params.id});

        console.log({data});

        if(!data) {
             return res.status(404).json({ message: 'Delete category unsuccessful' })
        }
        return res.status(200).json({ message: 'Delete category successful', datas: data })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}