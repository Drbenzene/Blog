import { token } from "morgan";
import React, { useEffect, useState } from "react";
import DashBoard from "../../components/Layouts/Admin/Dashboard";
import Footer from "../../components/Layouts/User/Footer/Footer";
import Header from "../../components/Layouts/User/Header/Header";
import Modal from "../../components/modal/Modal";
import axios from "axios";

function DashboardScreen() {
  const [isAutorized, setIsAutorized] = useState(true);
  console.log(isAutorized, "THE ISAUTORIZED");
  useEffect(() => {
    // MiddleWare For Getting the Dashboard StackFinder Search
    //Get User Token
    const token = localStorage.getItem("token");
    console.log(token, "THE TOKEN");
    // console.log(token)
    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/dashboard",
          config
        );
        console.log(res, "THE DATA");
      } catch (err) {
        console.log(err);
        localStorage.clear()
        setIsAutorized(false);
      }
    };
    fetchDashboard();
  });

  return (
    <div>
      {isAutorized === true ? (
        <>
          {" "}
          <DashBoard />
          <Footer />
        </>
      ) : (
        <>
          {" "}
          <Modal
            title="NOT AUTHORIZED"
            message="You Are Not Autorized To Access This Resources. Please Login To Your Account."
            link="/login"
            btn="Login"
          />{" "}
        </>
      )}
    </div>
  );
}

export default DashboardScreen;
