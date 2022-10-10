import { useEffect, useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {successToast, errorToast} from "../../Alert/Alert"
import { Editor } from '@tinymce/tinymce-react';

function DashBoard() {
  const [blog, setBlog] = useState({
    title: "",
    postType: "Article",
    blogContent: "",
    readTime: 0,
    tags: [],
    image: "",
  });

  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const changeHandler = async (e) => {
    const { name, value, type } = e.target;
    //Sending the Image To Cloudinary. 
    setBlog({ ...blog, [name]: value });

    if (type === "file") {
      setUploading(true);
      const data = new FormData()
      data.append("file", e.target.files[0])
      data.append("upload_preset", "drbenzene")
      data.append("cloud_name", "dlhjvo4tz")

      try {
        const result = await axios.post("https://api.cloudinary.com/v1_1/dlhjvo4tz/image/upload", data)
        console.log(result, "The Result")
        setBlog({ ...blog, image: result.data.secure_url }) 
        console.log(result.data.secure_url, "The ResultURL")
        setMessage("Uploaded Successfully")
        setUploading(false)
        
      } catch (err) {
        console.log(err)
        setTimeout(() => {
          setMessage("Something Went Wrong. Please Try Again")
        }, 2000)
        setUploading(false)
      }

    }

    // setBlog({...blog, readTime: readingTime(blog.blogContent)})
    console.log(blog, "The Content");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // const { title, postType, image, blogContent, readTime } = blog;
    console.log(blog, "The Content on Submit");

    try {
      const res = await axios.post("http://localhost:5000/api/post", blog);
      console.log(res, "The Response");
      successToast("Post Created Successfully")
      setBlog({
        title: "",
        postType: "Article",
        blogContent: "",
        readTime: null,
        tags: ""
      })

    } catch (err) {
      console.log(err, "The Error");
      errorToast("Something Went Wrong. Please Try Again")
      setBlog({
        title: "",
        postType: "Article",
        blogContent: "",
        readTime: null,
        tags: ""
      })
    }
  };

  return (
    
    <div>
      <ToastContainer />
      <div className=" container flex flex-col justify-center items-center">
        <div>
          <label className="flex flex-col justify-center items-center">
            Title{" "}
          </label>
          <input
            value={blog.title}
            onChange={changeHandler}
            name="title"
            type="text"
            className="border-2 w-96 border-gray-300 p-2 rounded-lg my-3"
          />
        </div>

        <div>
          <label className="flex flex-col justify-center items-center">
            Post Type
          </label>

          <select
            name="postType"
            onChange={changeHandler}
            className=" form-select border-2 border-gray-300 p-2 rounded-lg my-3 px-10 py-3"
            id="title"
          >
            <option value="article">Article</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className="flex flex-col justify-center items-center w-96 h-">
          <label className="flex justify-center items-center my-3 ">
            Blog Content
          </label>

          <Editor
          apiKey="1n5gjvaeq5wx60yds6p4b6okpeirmefias0pw5y8gsrz7c1c"
          onChange={(event, editor) => {
            const data = editor.getContent();
            setBlog({ ...blog, blogContent: data });
          }}
          // tinymceScriptSrc="/path/to/tinymce.min.js" 
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
          
           height: 300,
           width: 800,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
        </div>

        <div>
          <label className="flex flex-col justify-center items-center">
            Blog Image
          </label>
          <input
            type="file"
            className="border-2 border-gray-300 p-2 rounded-lg my-3"
            name="image"
            onChange={changeHandler}
          />
          {uploading && <h3 className="text-green-900 font-bold text-2xl">Uploading...</h3>}  
          {message && <p className="font-bold">{message}</p>}
        </div>

        <div>
          <label className="flex flex-col justify-center items-center">
            Tags
          </label>
          <input
            onChange={changeHandler}
            value={blog.tags}
            name="tags"
            type="text"
            className="border-2 border-gray-300 p-2 rounded-lg my-3 w-96"
          />
          <p className="text-gray-400">Separate tags with commas</p>
        </div>

        <div>
          <button
            onClick={submitHandler}
            className="flex my-7 text-white text-xl px-8 py-3 bg-black rounded-lg flex-col justify-center items-center"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
