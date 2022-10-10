import React from 'react'
import {Routes, Route, Link } from 'react-router-dom'
import Dashboard from "./screens/Admin/DashboardScreen";
import Home from './screens/Users/Home';
import Login from './components/Layouts/User/Login/Login'
import Register from './components/Layouts/User/Register/Register'
import Verify from './screens/Users/verify';
import Auth from './screens/Users/auth';
import SingleBlog from './components/Layouts/User/BlogContent/SingleBlog';
import HomeScreen from './screens/Admin/HomeScreen';


function Router() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:email/:token" element={<Verify />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog/:title" element={<SingleBlog />} />
            <Route path="/dashboard/home" element={<HomeScreen />} />
        </Routes>
    </div>
  )
}

export default Router
