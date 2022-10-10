import { addPost, getAllPosts, getSinglePost, deletePost } from "../controllers/postController.js";
import express from "express";

const postRouter = express.Router();


postRouter.post("/post", addPost);
postRouter.get("/post", getAllPosts);
postRouter.get("/post/:title", getSinglePost);
postRouter.delete("/post/:id", deletePost);


export default postRouter;
