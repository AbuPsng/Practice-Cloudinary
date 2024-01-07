import { v2 as cloudinary } from "cloudinary"
// Load environment variables synchronously
import dotenv from 'dotenv'
import fs from "fs"

dotenv.config({ path: '.env' })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

export const uploadOnCloudinanry = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //**upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log(`file is upload and its url is ${response.url}`)
        fs.unlinkSync(localFilePath)
        return response.url
    } catch (error) {
        // if(there is an error then it will deleted using unlinkSync)
        fs.unlinkSync(localFilePath)
        return error
    }
}