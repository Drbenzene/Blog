import mongoose from "mongoose";
import bycrypt from "bcryptjs";


//Creating user Model

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    userName: {type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    isVerified: { type: Boolean, default: false},
    token: { type: String},
    password: { type: String, required: true},
    profileImage: {type: String, default: "https://res.cloudinary.com/dlhjvo4tz/image/upload/v1663331486/wcm5jvfjmajrsd8xxr3k.jpg"},
    role: {type: String, default: "user", enum: ["admin", "user"]},
    createdAt: { type: Date, default: new Date()},

})


//Comparing User Password on Login Middlewares
userSchema.methods.matchPassword = async function(enteredPassword) {
    console.log(enteredPassword, "THE ENTERED PASSWORD")
    console.log(this.password, "THE USER PASSWORD")
    return await bycrypt.compare(enteredPassword, this.password);
}



//Encrypting User Password on Registration Middleware

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
})



const User = mongoose.model("User", userSchema);

export default User