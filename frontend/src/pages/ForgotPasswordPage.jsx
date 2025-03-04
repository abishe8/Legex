import { MdOutlineEmail } from "react-icons/md";

import "../css/forgotpasswordpage.css"
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth.store";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

function ForgotPasswordPage() {

    const [ emailInput, setEmailInput ] = useState("")
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const { forgotPassword, isLoading } = useAuthStore();

    async function handleSendResetLink() {
        if(!emailInput){
            toast.error("Email cannot be empty")
            return;
        }
        try {
            await forgotPassword(emailInput)
            toast.success("Reset link sent successfully")
            setIsSubmitted(true)
        } catch (err) {
            toast.error(err.response.data.message || "Sending Reset link failed")
            throw err
        }
    }

    return ( 
        <div className="forgot-password">
            <div className="container">
                <div className="forgot-password-wrapper">
                    <h2>Forgot Password</h2>
                    { !isSubmitted ? (
                        <>
                           <p>
                              Enter your email address and we'll send you a link to reset your password.
                           </p>
                           <div className="email-input">
                              <MdOutlineEmail size={20}/>
                              <input onChange={ (e) => { setEmailInput(e.target.value)}} value={emailInput} type="email" placeholder="Enter your email"/>
                           </div>
                           <button onClick={handleSendResetLink}>{!isLoading ? "Send Reset Link": <span className="spinner"></span>}</button>
                        </>
                    ) : (<>
                           <p className="reset-link-para">
                              If an account exists for {emailInput}, you will receive a password reset link shortly.
                           </p>
                           <div className="back-to-login"><LuArrowLeft /><Link to={"/login"}>Back to Login</Link></div>
                    </>)}
                </div>
            </div>
        </div>
     );
}

export default ForgotPasswordPage;