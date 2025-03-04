import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./css/agreementformpage.css"
import LegexHeader from "./components/LegexHeader";
import HomePage from "./pages/HomePage";
import SelectDocumentPage from "./pages/SelectDocumentPage";
import DisplaySummaryPage from "./pages/DisplaySummaryPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/verifyEmailPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import RentalAgreement from "./components/documentForms/RentalAgreement";
import GrantCopyrightInComputerSoftware from "./components/documentForms/GrantCopyrightInComputerSoftware";
import EmploymentAgreement from "./components/documentForms/EmploymentAgreement";
import DeedOfSimpleMortgage from "./components/documentForms/DeedOfSimpleMortgage";
import LockoutAgreement from "./components/documentForms/LockoutAgreement";
import PowerOfAttorney from "./components/documentForms/PowerOfAttorney";
import ReleaseDeed from "./components/documentForms/ReleaseDeed";
import SaleAgreement from "./components/documentForms/SaleAgreement";
import TrustDeed from "./components/documentForms/TrustDeed";
import VehicleSaleAgreement from "./components/documentForms/VehicleSaleAgreement";

const ProtectedRoute = ({ children }) => {
   const { isAuthenticated, user } = useAuthStore();

   if (!isAuthenticated) {
      return <Navigate to={"/login"} replace />;
   }
   if (!user.isVerified) {
      return <Navigate to={"/verify-email"} replace />;
   }
   return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
   const { isAuthenticated, user } = useAuthStore();

      if (isAuthenticated && user.isVerified) {
         return <Navigate to={"/"} replace />;
      }
   
   return children;
};

function App() {
   const { checkAuth, isCheckingAuth } = useAuthStore();

   useEffect(() => {
      checkAuth();
   }, [checkAuth]);

   return (
      <div className="app-container">
         <LegexHeader />
         {isCheckingAuth ? (
            <div className="home-page-spinner-container">
               <div className="home-page-spinner"></div>
            </div>
         ) : (
            <Routes>
               <Route
                  path="/"
                  element={
                     <ProtectedRoute>
                        <HomePage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/signup"
                  element={
                     <RedirectAuthenticatedUser>
                        <SignupPage />
                     </RedirectAuthenticatedUser>
                  }
               />
               <Route
                  path="/login"
                  element={
                     <RedirectAuthenticatedUser>
                        <LoginPage />
                     </RedirectAuthenticatedUser>
                  }
               />
               <Route path="/verify-email" element={<VerifyEmailPage />} />
               <Route
                  path="/select-document"
                  element={
                     <ProtectedRoute>
                        <SelectDocumentPage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/rental-agreement"
                  element={
                     <ProtectedRoute>
                        <RentalAgreement />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/agreement-to-grant-copyright-in-computer-software"
                  element={
                     <ProtectedRoute>
                        <GrantCopyrightInComputerSoftware />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/employment-agreement"
                  element={
                     <ProtectedRoute>
                        <EmploymentAgreement />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/mortgage-agreement"
                  element={
                     <ProtectedRoute>
                        <DeedOfSimpleMortgage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/lockout-agreement"
                  element={
                     <ProtectedRoute>
                        <LockoutAgreement />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/power-of-attorney"
                  element={
                     <ProtectedRoute>
                        <PowerOfAttorney />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/release-deed"
                  element={
                     <ProtectedRoute>
                        <ReleaseDeed />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/sale-agreement"
                  element={
                     <ProtectedRoute>
                        <SaleAgreement />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/trust-deed"
                  element={
                     <ProtectedRoute>
                        <TrustDeed />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/motor-vehicle-sale-agreement"
                  element={
                     <ProtectedRoute>
                        <VehicleSaleAgreement />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/display-summary"
                  element={
                     <ProtectedRoute>
                        <DisplaySummaryPage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/forgot-password"
                  element={
                     <RedirectAuthenticatedUser>
                        <ForgotPasswordPage />
                     </RedirectAuthenticatedUser>
                  }
               />
               <Route
                  path="/reset-password/:token"
                  element={<ResetPasswordPage />}
               />
               <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
         )}
         <Toaster toastOptions={{ duration: 1800 }} />
      </div>
   );
}

export default App;
