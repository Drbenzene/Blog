import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()

  //Getting session If User Is Logged In
  const token = localStorage.getItem("token")

  //Get User Info from LocalStorage
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user, "THE USER")

  const logOutHandler = () => {
    localStorage.clear();

    navigate("/")
  }
  
  return (
    <div>
      <div className="navbar bg-base-100 flex justify-between items-center mt-5">
        <div className="">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            MyBlog
          </Link>
        </div>

        <div className="form-control">
          <input
            type="text"
            placeholder="Search Discovery, New, Trending and Latest Tech Updates"
            className="input input-bordered w-full"
          />
        </div>
        <div></div>
        <div className="flex-none gap-2">
          {token === null || token === undefined ? (          <div>
           <Link to='/login'> <button className=" px-5 py-2 mx-3 font-bold bg-yellow-500 btn btn-ghost normal-case">
              Login
            </button> </Link>
            <Link to="/register"><button className=" px-5 py-2 font-bold bg-yellow-500 btn btn-ghost normal-case">
              Register
            </button></Link>
          </div>) : (          <div className="dropdown dropdown-end">
            {user &&             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.profileImage} alt="Profile" />
              </div>
            </label>}
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard" className="justify-between">
                  Add New Post
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings </Link>
              </li>
              <li>

                <Link onClick={logOutHandler}>Logout</Link>
              </li>
            </ul>
          </div>)}


        </div>
      </div>
    </div>
  );
}

export default Header;