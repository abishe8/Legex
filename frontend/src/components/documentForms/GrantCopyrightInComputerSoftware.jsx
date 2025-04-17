import { useState } from "react";
import axios from "axios";

function GrantCopyrightInComputerSoftware() {
   const [formData, setFormData] = useState({
      place: "",
      "agreement-day": "",
      "agreement-month": "",
      "agreement-year": "",
      "consultant-name": "",
      "programmer-name": "",
      "consultant-address": "",
      "programmer-father": "",
      "programmer-address": "",
      "programmer-payment": "",
      "delivery-year-month": "",
      "delivery-day": "",
      "delivery-month": "",
      "delivery-year": "",
      "first-advance-payment": "",
      "remaining-payment": "",
      "select-language": "English",
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:3000/api/documents/generate", {
              documentType: "grantcs", // Specify the document type
              data: formData, // Send form data
          });
          console.log("Document generated:", response.data);
          alert("Document generated successfully!");
      } catch (error) {
          console.error("Error generating document:", error);
          alert("Failed to generate document.");
      }
  };


   return (
      <div className="agreement-form-page">
         <div className="container">
            <div className="agreement-form-wrapper">
               <h2>Enter The Details For Agreement to Grant Copyright in Computer Software</h2>
               <form className="agreement-form" onSubmit={handleSubmit}>
                  <div className="form-inputs">
                     <div>
                        <label htmlFor="place">Enter Place of Agreement:</label>
                        <input placeholder="eg. Chennai, Tamil Nadu" type="text" name="place" />
                     </div>
                     <div>
                        <label htmlFor="agreement-day">Enter Agreement Day:</label>
                        <input placeholder="eg. 21" type="text" name="agreement-day" />
                     </div>
                     <div>
                        <label htmlFor="agreement-month">Enter Agreement Month:</label>
                        <input placeholder="eg. 03" type="text" name="agreement-month" />
                     </div>
                     <div>
                        <label htmlFor="agreement-year">Enter Agreement Year:</label>
                        <input placeholder="eg. 2025" type="text" name="agreement-year" />
                     </div>
                     <div>
                        <label htmlFor="consultant-name">
                           Enter Consultant Name:
                        </label>
                        <input placeholder="eg. Ram Kumar" type="text" name="consultant-name" />
                     </div>
                     <div>
                        <label htmlFor="programmer-name">Enter Programmer Name:</label>
                        <input placeholder="eg. Ankit Sharma" type="text" name="programmer-name" />
                     </div>
                     <div>
                        <label htmlFor="consultant-address">Enter Consultant Address:</label>
                        <input placeholder="eg. 102, Green Avenue, New Delhi, India" type="text" name="consultant-address" />
                     </div>
                     <div>
                        <label htmlFor="programmer-father">Enter Programmer's Father's Name:</label>
                        <input type="text" placeholder="eg. Ishan Sharma" name="programmer-father" />
                     </div>
                     <div>
                        <label htmlFor="programmer-address">Enter Programmer Address:</label>
                        <input placeholder="eg. No. 44, Electronics City, Bangalore, India" type="text" name="programmer-address" />
                     </div>
                     <div>
                        <label htmlFor="programmer-payment">Enter Payment To Programmer:</label>
                        <input placeholder="eg. ₹50,000/-" type="text" name="programmer-payment" />
                     </div>
                     <div>
                        <label htmlFor="delivery-year-month">Enter Delivery Year & Month:</label>
                        <input placeholder="eg. 2025-04" type="month" name="delivery-year-month" />
                     </div>
                     <div>
                        <label htmlFor="delivery-day">
                           Enter Delivery Day:
                        </label>
                        <input placeholder="eg. 19" type="text" name="delivery-day" />
                     </div>
                     <div>
                        <label htmlFor="delivery-month">
                           Enter Delivery Month
                        </label>
                        <input placeholder="eg. 07" type="text" name="delivery-month" />
                     </div>
                     <div>
                        <label htmlFor="delivery-year">Enter Delivery Year:</label>
                        <input placeholder="eg. 2025" type="text" name="delivery-year" />
                     </div>
                     <div>
                        <label htmlFor="first-advance-payment">Enter First Advance Payment:</label>
                        <input placeholder="eg. ₹20,000/-" type="text" name="first-advance-payment" />
                     </div>
                     <div>
                        <label htmlFor="remaining-payment">Enter Remaining Payment:</label>
                        <input placeholder="eg. ₹30,000/-" type="text" name="remaining-payment" />
                     </div>
                     <div>
                        <label htmlFor="select-language">
                           Select Language To Generate Summary:
                        </label>
                        <select name="select-language" id="select-language">
                           <option value="English">English</option>
                           <option value="Hindi">Hindi</option>
                        </select>
                     </div>
                  </div>
                  <button className="submit-btn">Submit</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default GrantCopyrightInComputerSoftware;
