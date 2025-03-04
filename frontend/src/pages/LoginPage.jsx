import { MdOutlineEmail } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

import "../css/loginpage.css"
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";
import ContinueWithGoogle from "../components/ContinueWithGoogle";



function LoginPage() {

    const [ eyeToggle, setEyeToggle ] = useState(false)
    const [ emailInput, setEmailInput ] = useState("")
    const [ passwordInput, setPasswordInput ] = useState("")
    const { login, isLoading } = useAuthStore()

    const handleToggleBtn = () => {
        setEyeToggle( prev => !prev )
    }

    async function handleLogin(){
        if(!emailInput || !passwordInput){
            toast.error("Please provide all fields")
            return;
        }
        try {
            await login(emailInput, passwordInput);
            toast.success("Logged in successfully!")
        } catch (err) {
            toast.error(err.response.data.message || "Couldn't login")
            throw err
        }

    }


    return ( 
        <div className="login-page">
            <div className="container">
                <div className="login-page-wrapper">
                    <h2>Welcome Back</h2>
                    <div className="email-input login-input">
                        <MdOutlineEmail size={20}/>
                        <input onChange={(e) => setEmailInput(e.target.value)} value={emailInput} type="email" placeholder="Enter your email"/>
                    </div>
                    <div className="new-password login-input">
                        <LuLock size={20}/>
                        <input onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} type={ eyeToggle ? "text" : "password" } placeholder="Password"/>
                        <div className="eye-toggle" onClick={ handleToggleBtn }>
                            { eyeToggle ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20} />}
                        </div>
                    </div>
                    <div className="forgot-password-link">
                        <Link to={"/forgot-password"} >Forgot password</Link>
                    </div>
                    <button onClick={ handleLogin } className="login-btn">{!isLoading ? "Login": <span className="spinner"></span>}</button>
                    <p>Don&apos;t have an account? <Link to={"/signup"}>Sign up</Link></p>
                    <div className="google-sign-in-divider">
                    </div>
                </div>
                <ContinueWithGoogle />
            </div>
        </div>
     );
}

export default LoginPage;