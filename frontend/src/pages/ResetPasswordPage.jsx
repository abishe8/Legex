import { LuLock } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import "../css/resetpasswordpage.css"
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth.store";
import { useNavigate, useParams } from "react-router-dom";


function ResetPasswordPage() {

    const [ eyeToggle, setEyeToggle ] = useState(false)
    const [ newPasswordInput, setNewPasswordInput ] = useState("")
    const [ confirmPasswordInput, setConfirmPasswordInput ] = useState("")
    const { resetPassword, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const { token } = useParams()

    const handleToggleBtn = () => {
        setEyeToggle( prev => !prev )
    }

    async function handleNewPasswordBtn() {
        if(!newPasswordInput || !confirmPasswordInput){
            toast.error("Please provide all fields")
            return;
        }
        if(newPasswordInput !== confirmPasswordInput){
            toast.error("Passwords did not match")
            return;
        }

        try {
            await resetPassword(token, confirmPasswordInput)
            toast.success("Password changed successfully, redirecting to login page...")
            setTimeout(() => {
                navigate("/login");
             }, 2000);
        } catch (err) {
            toast.error(err.response.data.message || "Reset password failed")
            throw err
        }
    }

    return ( 
        <div className="reset-password">
            <div className="container">
                <div className="reset-password-wrapper">
                    <h2>Reset Password</h2>
                    <div className="new-password">
                        <LuLock size={20}/>
                        <input onChange={ (e) => { setNewPasswordInput(e.target.value)}} value={newPasswordInput} type={ eyeToggle ? "text" : "password" } placeholder="New Password"/>
                        <div className="eye-toggle" onClick={ handleToggleBtn }>
                            { eyeToggle ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20} />}
                        </div>
                    </div>
                    <div className="confirm-new-password">
                        <LuLock size={20}/>
                        <input onChange={ (e) => { setConfirmPasswordInput(e.target.value)}} value={confirmPasswordInput} type="password" placeholder="Confirm New Password"/>
                    </div>
                    <button onClick={handleNewPasswordBtn} className="new-password-btn">{!isLoading ? "Set New Password": <span className="spinner"></span>}</button>
                </div>
            </div>
        </div>
     );
}

export default ResetPasswordPage;