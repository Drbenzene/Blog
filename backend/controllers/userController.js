import User from "../models/userModel.js";
import { sendMail, generateToken } from "../utils/verifyEmail.js";
import { signUserLogin } from "../utils/helperFunc.js";
import asyncHandler from 'express-async-handler';

// @desc Register User
// @method POST
// @route /api/users
// @endpoint /api/users
// @access Public

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists. Please login with your existing account information");
    }

    //Generate Token For Email Verification
    const  token = await generateToken();
    console.log(password, "THE PASSWORD ON REG")
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      token,
    });

    //Sending Verification Email to user
   await  sendMail(user.email, user.token);
   
    if (user) {
      res.status(200).json({
        message: "User Created Successfully",
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          profileImage: user.profileImage,
          role: user.role,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "failed",
      error: err.message,
    });
  }
};



// @desc Login User Details
// @method POST
// @route /api/users/login
// @endpoint /api/users/login
// @access Public

export const loginUser = asyncHandler(async (req, res) => {

  const {email, password} = req.body;

  try {
    //Getting user from database
    const user = await User.findOne({email});

    //Checking if user exists
    if (!user) {
      res.status(404);
      throw new Error("User Not Found");
    }

    //Checking of UseREmail Is Verified
    if (user.isVerified === false) {
      throw new Error(`Please verify Your Email Address To continue Your Access to the Account. Kindly Check your email ${user.email} for your verification link`)
    }

    // console.log(user, "THE USER")
    console.log(await user.matchPassword(password), "THE PASSWORD MATCH")
    console.log(password, "THE PASSWORD")
    // Checking if user Password is matches correctly
    if (user && (await user.matchPassword(password))) {
      console.log(await user.matchPassword(password), "THE PASSWORD MATCH")
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        profileImage: user.profileImage,
        role: user.role,
        token: signUserLogin(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }


  } catch(err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
});






//Email Verification Route
// @desc Verify User Email
// @method GET
// @route /api/users/verify/:email/:token
// @endpoint /api/users/verify/:email/:token
// @access Public

export const verifyEmail = async (req, res) => {
    try {
        const { email, token } = req.params;
      
        const user = await User.findOne({ email });
        if (user && user.token === token) {
        user.isVerified = true;
        user.token = "";
        await user.save();

        res.status(200).json({
            message: "Email Verified Successfully. Please Login Your Account",
        });
        } else {
        res.status(401);
        throw new Error("Invalid Email or Token. Please Try Again");
        }
        
    } catch (err) {
        console.log(err);
        res.json({
        status: "failed",
        error: err,
        });
    }
}


// Dashboard Redirect Controller 
// @desc Redirect User To Dashboard
// @method GET
// @route /api/users/dashboard
// @endpoint /api/users/dashboard
// @access Public API

export const Dashboard = async (req, res) => {
    res.json({
      message: "Dashboard"
    })
}