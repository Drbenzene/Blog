import Post from "../models/postModel.js";
import {readingTime } from "../utils/helperFunc.js";
import qs from 'querystring';
import { error } from "console";


// @desc Add New Post 
// @metho POST
// @route /api/posts
// @endpoint /api/posts
// @access Public

const addPost = async (req, res) => {
   
    try {
        const {image, title, blogContent, tags, postType} = req.body;
        console.log(req.body, "The Body")
        const readTime = readingTime(blogContent);
        console.log(readTime, "The ReadTime")
        const newPost = await Post.create({
            image, title, blogContent, tags, postType, readTime
        })
    
        res.status(200).json({
            message: "Your Post has been published successfully."
        })

    } catch(err) {
        console.log(err);
        res.json ({
            status: "failed",
            error: err
        })
    }
}


//Desc get all Posts 
// @method GET
// @route /api/post
// @endpoint /api/post

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: "success",
            data: posts
        })

    } catch (err) {
        console.log(err);
        res.json ({
            status: "failed",
            error: err
        })
    }
}



//@Desc Get Single Post
//@method GET
//@route /api/post/:id
//@endpoint /api/post/:id

const getSinglePost = async (req, res) => {
    const {title} = req.params;

    try {
        const post = await Post.findOne({title: title})
        console.log(post)
        if (post) {
            res.status(200).json({
                status: "success",
                data: post
            })    
        } else {
            res.status(404).json({
                status: "failed",
                message: "Post Not Found"
            })
        }

    } catch(err) {
        console.log(err);
        res.json ({
            status: "failed",
            error: err
        })
    }

}

// @desc Delete A Post
// @method DELETE
// @param {id}
// @route /api/post/:id
// @param {object} params
// @endpoint /api/delete/:id

const deletePost = async (req, res) => {
    const {id} = req.params;
    console.log(id, "The ID")

    try {
        const thePost = await Post.findOneAndDelete(id, (err) => {

            if (err) {
                throw new Error("POST NOT FOUND")
            } 

                res.status(200).json({
                    status: "success",
                    message: `Post Deleted Successfully, ${thePost}`
                })
            
        })

    } catch(err) {
        console.log(err);
        res.json ({
            status: "failed",
            error: err
        })
    }
}


export {addPost, getAllPosts, getSinglePost, deletePost}


