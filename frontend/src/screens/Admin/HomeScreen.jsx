import React from 'react'
import Header from '../../components/Layouts/User/Header/Header';
import BlogContent from "../../components/Layouts/User/BlogContent/BlogContent";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
function HomeScreen() {
  return (
    <div>
      <Header />
        <BlogContent delete={<AiFillDelete/>} edit={<AiFillEdit />} />
    </div>
  )
}

export default HomeScreen
