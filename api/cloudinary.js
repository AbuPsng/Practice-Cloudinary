import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv'
import fs from "fs"


// Load environment variables synchronously

dotenv.config({ path: '.env' })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

export const uploadOnCloudinanry = async (localFilePath) => {
    console.log(localFilePath)
    try {
        const default_Image = "public/default/default_images.jpg"
        //**upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath || default_Image, {
            resource_type: "auto"
        })
        console.log(`file is upload and its url is ${response.url}`)
        if (localFilePath) fs.unlinkSync(localFilePath)
        console.log(response)
        return response.url
    } catch (error) {
        // if(there is an error then it will deleted using unlinkSync)
        if (localFilePath) fs.unlinkSync(localFilePath)
        return error
    }
}