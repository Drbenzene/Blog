import React, {useEffect, useState} from 'react'
import Modal from '../../components/modal/Modal'

function Auth() {
  const [showModal, setShowModal] = useState(false)


  return (
    <div>
        <Modal 
        title="Registered Successfully"
        message="Your registration was successful. We sent an email to the email address provided on registration. Please check your inbox and verify your email. Once verified,
        you can continue by logging to your account."
        btn ="Login To Your Account"
        link="/login"
         />
    </div>
  )
}

export default Auth
