import cloudinary from '../configs/cloudinaryConfig.js'

export const uploadImages = async(req, res) => {

 try {
    const images = req.files.map(file => file.path)
    const uploadImages = []
    for (let img of images) {
        const results = await cloudinary.uploader.upload(img)
        console.log({results});
        uploadImages.push({
            url: results.secure_url,
            publicId: results.public_id
        })        
    }
    return res.status(200).json({ 
        message: 'Upload successfull !',
        datas: uploadImages
    })
 } catch (error) {
    return res.status(400).json({ 
        name: error.name,
        message: error 
    })
 }
}

export const removeImages = async(req, res) => {

    try {
        const publicId = req.params.publicId
        const results = await cloudinary.uploader.destroy(publicId)
        console.log({results, publicId});
        if(results.result === 'not found') {
            throw new Error('Delete images failded!')
        }
        return res.status(200).json({ 
            message: 'Delete successfull!' 
        })
    } catch (error) {
        return res.status(400).json({ 
            name: error.name,
            message: error 
        })
    }
}


// @/C:/Users/Admin/Downloads/1.jpg