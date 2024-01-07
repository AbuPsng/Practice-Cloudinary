import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import multer from "multer"
import dotenv from "dotenv"
import path from "path"
import UserModel from "./models/userModel.js"
import sharp from "sharp"
import { uploadOnCloudinanry } from "./cloudinary.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

app.post("/upload", upload.single("file"), async (req, res) => {
    const result = await uploadOnCloudinanry(req.file.path)
    const user = await UserModel.create({ name: req.body.name, image: result })
    res.status(200).json({ status: "success", message: "user with image created successfully", user })
})

app.get('/get_user', async (req, res) => {
    const users = await UserModel.find({})
    res.status(200).json({ status: "success", message: "user with image created successfully", users })

})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Successfully connected to the database")
        app.listen(3000, () => {
            console.log(`Server is running on port 3000..`)
        })
    } catch (error) {
        console.log("Unable to connect database")
    }
}

connectDB()
