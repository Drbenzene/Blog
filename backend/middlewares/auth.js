//MiddleWare For Accessing  User DashBoard API

import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {

    //Check if the user is logged in and have a token before accessing the Dashboard Route

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            console.log(req.user, "THE USER")
            next();
        } catch (error) {
            console.log(error);
            console.log("THE USER, OUT")
            res.status(401).json({
                status: "failed",
                error: "Not Authorized, Token Failed. You are Not Autorized to Access this resources"
            })
        }
    }
}

export { protect }

