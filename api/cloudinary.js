import cloudinary from "cloudinary"

const cloudinary = cloudinary.v2

cloudinary.ConfigAndUrlOptions({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})