import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String
})

const UserModel = mongoose.model("UserModel", userSchema)

export default UserModel;