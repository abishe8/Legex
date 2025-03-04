import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../css/verifyemailpage.css";
import { useAuthStore } from "../store/auth.store";

function VerifyEmailPage() {
   const [code, setCode] = useState(["", "", "", "", "", ""]);
   const inputRefs = useRef([]);
   const navigate = useNavigate();
   const { verifyEmail, isLoading, error } = useAuthStore();

   const handleChange = (index, value) => {
      const newCode = [...code];

      // Handle pasted content
      if (value.length > 1) {
         const pastedCode = value.slice(0, 6).split("");
         for (let i = 0; i < 6; i++) {
            newCode[i] = pastedCode[i] || "";
         }
         setCode(newCode);

         // Focus on the last non-empty input or the first empty one
         const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
         const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
         inputRefs.current[focusIndex].focus();
      } else {
         newCode[index] = value;
         setCode(newCode);

         // Move focus to the next input field if value is entered
         if (value && index < 5) {
            inputRefs.current[index + 1].focus();
         }
      }
   };

   const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
         inputRefs.current[index - 1].focus();
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const verificationCode = code.join("");
      try {
         await verifyEmail(verificationCode);
         navigate("/");
         toast.success("Email verified successfully");
      } catch (err) {
         console.log("Error verifying email;", err);
         toast.error(err.response.data.message || "Couldn't verify")
      }
   };

   // Auto submit when all fields are filled
   useEffect(() => {
      if (code.every((digit) => digit !== "")) {
         handleSubmit(new Event("submit"));
      }
   }, [code]);

   return (
      <div className="verify-email-page">
         <div className="container">
            <form onSubmit={handleSubmit} className="verify-email-wrapper">
               <h2>Verify Email</h2>
               <div className="code-inputs">
                  {code.map((digit, index) => (
                     <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="6"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="code-input"
                     />
                  ))}
               </div>
               <button type="submit" className="verify-email-btn">{!isLoading ? "Verify": <span className="spinner"></span>}</button>
            </form>
         </div>
      </div>
   );
}

export default VerifyEmailPage;
