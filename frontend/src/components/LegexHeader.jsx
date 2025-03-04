import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { useAuthStore } from "../store/auth.store";
import { useState } from "react";
import toast from "react-hot-toast";

function LegexHeader() {
   const { user, isAuthenticated, logout, isLoading } = useAuthStore();
   const [isOpen, setIsOpen] = useState(false);

   async function handleLogoutBtn() {
      try {
         await logout();
         toast.success("Logged out successfully");
      } catch (err) {
         toast.error(err.respose.data.message || "Failed to logout");
      }
   }

   return (
      <div className="legex-header">
         <div className="container">
            <div className="legex-header-wrapper">
               <Link to={"/"}>
                  <div className="logo">
                     <img src="/assets/LegEX_logo.svg" alt="Legex logo" />
                  </div>
               </Link>
               {isAuthenticated && user?.isVerified ? (
                  <>
                     <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={`user-container ${isOpen ? "active" : ""}`}
                     >
                        <span className="user-initial">
                           {user ? user.email[0].toUpperCase() : <></>}
                        </span>
                        <FaChevronDown />

                        <div
                           className={`user-details-container ${
                              isOpen ? "show" : ""
                           }`}
                        >
                           <div className="user-inial">
                              {user ? user.email[0].toUpperCase() : <></>}
                           </div>
                           <div className="user-email">
                              {user ? user.email : <></>}
                           </div>
                           <button
                              onClick={() => {
                                 handleLogoutBtn(), setIsOpen;
                              }}
                              className="logout-btn"
                           >
                              {!isLoading ? (
                                 <>
                                    <span>Logout</span>
                                    <FaPowerOff />
                                 </>
                              ) : (
                                 <span className="spinner"></span>
                              )}
                           </button>
                        </div>
                     </div>
                  </>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
}

export default LegexHeader;
