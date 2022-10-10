import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Verify() {
  const [showModal, setShowModal] = useState(true);
  const [verified, setVerified] = useState(false);
  
  const { email, token } = useParams();

  useEffect(() => {
    //Making a API Call to the backend for Verification
    const verify = async () => {
      try {
        const { data } = await axios.get(`/api/users/verify/${email}/${token}`);
        console.log(data);
        setVerified(true);
      } catch (err) {
        console.log(err);
        setVerified(false);
      }
    };

    verify();
  });

  return (
    <>
    {verified === true ? (      <Modal
        title="Verified Successfully"
        message="Your Account Has Been Verified Successfully. Please Login To Continue"
        btn="Login To Your Account"
        link="/login"
      />) : (<><Modal
        title="Verification Failed"
        message="Invalid Email or Token. Please Login If You Already Have an existing account with us. "
        btn="Login To Your Account"
        link="/login"
      /></>)}

    </>
  );
}
