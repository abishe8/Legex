import { useEffect } from "react";
import "../css/homepage.css"
import { Link } from "react-router-dom"


function HomePage() {



   return (
      <div className="home-page">
         <div className="container">
            <div className="home-page-wrapper">
               <div className="home-content">
                  <h1 className="home-content-heading">UNLOCK THE POWER OF STREAMLINED LEGAL DOCUMENT CREATION WITH <span className="legex">LegEX</span></h1>
                  <p>
                     Your go-to solution for effortlessly generation a wide range of legal sound documents. Whether you&apos;re a seasoned legal professional, a business owner, or an individual Navigating the complexities of the legal world. LegEX is designed to simplify and expedite the documentation creation process.
                  </p>
                  <Link to="/select-document" className="get-started-btn">Get Started</Link>
               </div>
               <div className="home-page-image">
                  <img src="/assets/01_illustration.svg" alt="image of an legal document" />
               </div>
            </div>
         </div>
      </div>
   );
}

export default HomePage;
