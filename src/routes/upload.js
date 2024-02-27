import {Router} from 'express'
import { uploadImages, removeImages } from '../controllers/images.js'
import cloudinary from '../configs/cloudinaryConfig.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

const routerImgages = Router()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'node-ecommerce',
        format:'jpg'
    }
})

const upload = multer({storage: storage})

routerImgages.post('/upload', upload.array('images', 10), uploadImages )
routerImgages.delete('/remove/:publicId', removeImages )


export default routerImgages