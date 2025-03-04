import { MdOutlineEmail } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth.store";

import "../css/signuppage.css"
import ContinueWithGoogle from "../components/ContinueWithGoogle";


function SignupPage() {

    const navigate = useNavigate()

    const [ eyeToggle, setEyeToggle ] = useState(false)
    const [ emailInput, setEmailInput ] = useState("")
    const [ newPasswordInput, setNewPasswordInput ] = useState("")
    const [ confirmPasswordInput, setConfirmPasswordInput ] = useState("")

    const { isLoading, signup } = useAuthStore();


    const handleToggleBtn = () => {
        setEyeToggle( prev => !prev )
    }


    
    async function handleSignup(){

        if(!emailInput || !newPasswordInput || !confirmPasswordInput){
            toast.error("Please provide all fields")
            return;           
        }

        if(newPasswordInput !== confirmPasswordInput){
            toast.error("Passwords did not match")
            return;
        }

        try {
            await signup(emailInput, confirmPasswordInput);
            toast.success("Account created successfully");

            setTimeout(() => {
               navigate("/verify-email")
            }, 1800);
        } catch (err) {
            console.log("Error signing up:",err);
            toast.error(err.response.data.message || "Error signing up")
        }

        
    }



    return ( 
        <div className="signup-page">
            <div className="container">
                <div className="signup-page-wrapper">

                    <div className="signup-logo">
                        <img src="/assets/LegEX_logo.svg" alt="Legex logo" />
                    </div>

                    <h2>Create Account</h2>
                    <div className="email-input">
                        <MdOutlineEmail size={20}/>
                        <input onChange={ (e) => { setEmailInput(e.target.value)}} value={emailInput} type="email" placeholder="Enter your email"/>
                    </div>
                    <div className="new-password">
                        <LuLock size={20}/>
                        <input onChange={ (e) => { setNewPasswordInput(e.target.value)}} value={newPasswordInput} type={ eyeToggle ? "text" : "password" } placeholder="Create Password"/>
                        <div className="eye-toggle" onClick={ handleToggleBtn }>
                            { eyeToggle ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20} />}
                        </div>
                    </div>
                    <div className="confirm-new-password">
                        <LuLock size={20}/>
                        <input onChange={ (e) => { setConfirmPasswordInput(e.target.value)}} value={confirmPasswordInput} type="password" placeholder="Confirm Password"/>
                    </div>
                    <button onClick={ handleSignup } className="signup-btn">{!isLoading ? "Sign Up": <span className="spinner"></span>}</button>

                    <p>Already have an account? <Link to={"/login"}>Login</Link></p>
                    <div className="google-sign-in-divider">
                    </div>
                </div>
                
                <ContinueWithGoogle />
            </div>
        </div>
     );
}

export default SignupPage;