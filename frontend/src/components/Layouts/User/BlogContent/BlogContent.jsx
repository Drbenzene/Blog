import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPostsfetch } from "../../../../redux/reducers/postReducers";
import { deletePost } from "../../../../redux/reducers/postReducers";
import axios from 'axios'


export default function BlogContent(props) {
  const dispatch = useDispatch();

  const { loading, success, posts, error } = useSelector(
    (state) => state.posts
  );

  console.log(loading, success, error, posts, "Loading State");

  useEffect(() => {
    dispatch(getPostsfetch());
  }, [dispatch]);


  //Delete Post Function
  const deletePostHandler = async (id) => {
    dispatch(deletePost(id));
  }

  //Edit Post Function

  return (
    <>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {success === true
              ? posts.map((post, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover"
                        src={post.image}
                        alt=""
                      />
                    </div>

                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-indigo-600">
                          {post.postType}
                        </p>

                        <Link to={`/blog/${post.title}`} className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900 cursor-pointer">
                            {post.title}
                          </p>
                          <div
                            className="mt-3 text-base text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html: post.blogContent,
                            }}
                          ></div>
                        </Link>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <a href={post.author.href}>
                            <span className="sr-only">{post.author}</span>
                            <img
                              className="h-10 w-10 rounded-full"
                              src={post.image}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            <a
                              href={post.author.href}
                              className="hover:underline"
                            >
                              {post.author}
                            </a>
                          </p>
                          <div className="flex justify-between space-x-1 text-sm text-gray-500">
                            <div className="mr-5">
                              <time dateTime={post.createdAt}>
                                {post.createdAt}
                              </time>
                              <span aria-hidden="true">&middot;</span>
                              <span>{post.readTime} min read</span>
                            </div>

                            <div className=" flex">
                              <span className="cursor-pointer">{props.edit}</span>
                              <span onClick={(e) => deletePostHandler(post._id)} className="ml-5 cursor-pointer">{props.delete}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : "Loading"}
          </div>
        </div>
      </div>
    </>
  );
}
