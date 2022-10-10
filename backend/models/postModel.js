import mongoose from "mongoose";
import slug from "mongoose-slug-updater"; 
mongoose.plugin(slug);
//Creating post Model


const postSchema = new mongoose.Schema({
    userId: { type: String, nullable: true},
    title: { type: String, required: true},
    slug: { type: String, slug: "title", slugPaddingSize: 4,unique: true },
    blogContent: { type: String, required: true},
    postType: { type: String, required: true, default: "Article"},
    image: { type: String, required: true},
    tags: {type: Array, required: true},
    author: { type: String, default: "Drbenzene"},
    readTime: {type: Number, default: 0},
    role: {type: String, default: "admin", enum: ["admin", "user"]},
    createdAt: { type: Date, default: new Date()},
})

const Post = mongoose.model("Posts", postSchema);





export default Post;