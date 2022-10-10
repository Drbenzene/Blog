import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import "./blog.css";
import axios from "axios";


function SingleBlog() {
    const { title } = useParams();
    const [blog, setBlog] = useState({});
    console.log(blog, "The Blog")
    //Fetching Single Blog Post 

    useEffect(() => {
        //Making A API FECH TO THE BACKEND
        const fetchSinglePost = async () => {
            const { data } = await axios.get(`/api/post/${title}`);
            setBlog(data.data);
            
        };
        fetchSinglePost();
    }, [])

  return (
    <div>
      <Header />
      {blog && (      <div className="con mx-40">
        <img className="image-content" src={blog.image} alt="Blog" />
        <div className="post-header">{blog.title}</div>
        <div className="post-content">
            <div  dangerouslySetInnerHTML={{ __html: blog.blogContent }}>

            </div>
          <p></p>
        </div>
      </div>)}

      <Footer />
    </div>
  );
}


export default SingleBlog;