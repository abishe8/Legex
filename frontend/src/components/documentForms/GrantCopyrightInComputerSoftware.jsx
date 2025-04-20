import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

function GrantCopyrightInComputerSoftware() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve pre-filled form data from location.state
  const preFilledData = location.state?.formData;
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Populate form data with pre-filled values if they exist
  useEffect(() => {
    if (preFilledData) {
      setFormData(preFilledData);
    }
  }, [preFilledData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        console.log("entered submit function");
        const response = await axios.post("http://localhost:3000/api/documents/generate", {
            documentType: "grantcs",
            data: formData,
        });

        console.log("Document generated:", response.data);
        alert("Document generated successfully!");

        navigate("/display-summary", {
            state: {
                wordFilePath: response.data.wordFilePath,
                summaryFilePath: response.data.summaryFilePath,
                pdfFilePath: response.data.pdfFilePath,
                roadmapFolderPath: response.data.roadmapFolderPath,
                translatedSummaryFilePath: response.data.translatedSummaryFilePath,
                formData,
                documentType: "agreement-to-grant-copyright-in-computer-software",
            },
        });
    } catch (error) {
        console.error("Error generating document:", error);
        alert("Failed to generate document.");
    } finally {
        setIsSubmitting(false);
    }
};

  return (
  <div className="agreement-form-page">
   <div className="container">
       <div className="agreement-form-wrapper">
           <h2>Enter The Details For Lockout Agreement</h2>
           <form className="agreement-form" onSubmit={handleSubmit}>
               <div className="form-inputs">
                   <div>
                       <label htmlFor="agreement-day">Enter Agreement Day:</label>
                       <input placeholder="eg. 23" type="text" name="agreement-day" value={formData["agreement-day"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="agreement-year">Enter Agreement Year:</label>
                       <input placeholder="eg. 2025" type="text" name="agreement-year" value={formData["agreement-year"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="agreement-location">Enter Agreement Location:</label>
                       <input placeholder="eg. Chennai, Tamil Nadu" type="text" name="agreement-location" value={formData["agreement-location"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendors-name">Enter Vendor's Name:</label>
                       <input placeholder="eg. Ramesh Kumar" type="text" name="vendors-name" value={formData["vendors-name"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendors-fathers-name">Enter Vendor's Father's Name:</label>
                       <input placeholder="eg. Suresh Kumar" type="text" name="vendors-fathers-name" value={formData["vendors-fathers-name"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendors-age">Enter Vendor's Age:</label>
                       <input placeholder="eg. 27" type="text" name="vendors-age" value={formData["vendors-age"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendors-occupation">Enter Vendor's Occupation:</label>
                       <input placeholder="eg. Software Engineering" type="text" name="vendors-occupation" value={formData["vendors-occupation"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendors-address">Enter Vendor's Address:</label>
                       <input placeholder="eg. 12, Gandhi Street, Chennai, Tamil Nadu, India" type="text" name="vendors-address" value={formData["vendors-address"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendee-name">Enter Vendee's Name:</label>
                       <input placeholder="eg. Anuj Sharma" type="text" name="vendee-name" value={formData["vendee-name"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendees-fathers-name">Enter Vendee's Father's Name:</label>
                       <input placeholder="eg. Vinod Sharma" type="text" name="vendees-fathers-name" value={formData["vendees-fathers-name"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendees-age">Enter Vendee's Age:</label>
                       <input placeholder="eg. 30" type="text" name="vendees-age" value={formData["vendees-age"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendees-occupation">Enter Vendee's Occupation:</label>
                       <input placeholder="eg. Businessman" type="text" name="vendees-occupation" value={formData["vendees-occupation"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="vendees-address">Enter Vendee's Address:</label>
                       <input placeholder="eg. 45, MG Road, Bangalore, Karnataka, India" type="text" name="vendees-address" value={formData["vendees-address"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="plot-number">Enter Plot Number:</label>
                       <input placeholder="eg. 12B" type="text" name="plot-number" value={formData["plot-number"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="plot-area-yards">Enter Plot Area:</label>
                       <input placeholder="eg. 200 sq. yards" type="text" name="plot-area-yards" value={formData["plot-area-yards"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="plot-area-meters">Enter Plot Area:</label>
                       <input placeholder="eg. 167 sq. meters" type="text" name="plot-area-meters" value={formData["plot-area-meters"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="survey-number-start">Enter Survey Number Start:</label>
                       <input placeholder="eg. 123/2" type="text" name="survey-number-start" value={formData["survey-number-start"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="survey-number-end">Enter Survey Number End:</label>
                       <input placeholder="eg. 126/4" type="text" name="survey-number-end" value={formData["survey-number-end"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="plot-address">Enter Plot Address:</label>
                       <input placeholder="eg. 45, MG Road, Bangalore, Karnataka, India" type="text" name="plot-address" value={formData["plot-address"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="previous-owner-name">Enter Previous Owner Name:</label>
                       <input placeholder="eg. Kunal Singh" type="text" name="previous-owner-name" value={formData["previous-owner-name"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="sale-deed-document-no">Enter Sale Deed Document Number:</label>
                       <input placeholder="eg. 4567/2024" type="text" name="sale-deed-document-no" value={formData["sale-deed-document-no"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="sale-deed-date">Enter Sale Deed Date:</label>
                       <input placeholder="eg. DD/MM/YYYY" type="date" name="sale-deed-date" value={formData["sale-deed-date"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="sale-amount">Enter Sale Amount:</label>
                       <input placeholder="eg. ₹50,00,000/-" type="text" name="sale-amount" value={formData["sale-amount"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="sale-amount-in-words">Enter Sale Amount In Words:</label>
                       <input placeholder="eg. Fifty Lakh Rupees Only" type="text" name="sale-amount-in-words" value={formData["sale-amount-in-words"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="advance-amount-paid">Enter Advance Amount Paid:</label>
                       <input placeholder="eg. ₹10,00,000/-" type="text" name="advance-amount-paid" value={formData["advance-amount-paid"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="advance-amount-paid-in-words">Enter Advance Amount Paid In Words:</label>
                       <input placeholder="eg. Ten Lakh Rupees Only" type="text" name="advance-amount-paid-in-words" value={formData["advance-amount-paid-in-words"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="remaining-balance-amount">Enter Remaining Balance Amount:</label>
                       <input placeholder="eg. ₹40,00,000/-" type="text" name="remaining-balance-amount" value={formData["remaining-balance-amount"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="remaining-balance-amount-in-words">Enter Remaining Balance Amount In Words:</label>
                       <input placeholder="eg. Forty Lakh Rupees Only" type="text" name="remaining-balance-amount-in-words" value={formData["remaining-balance-amount-in-words"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="balance-payment-due-days">Enter Balance Payment Due Days:</label>
                       <input placeholder="eg. 90 days" type="text" name="balance-payment-due-days" value={formData["balance-payment-due-days"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="plot-mandal">Enter Plot's Mandal:</label>
                       <input placeholder="eg. Mandal Name" type="text" name="plot-mandal" value={formData["plot-mandal"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="plot-jurisdiction">Enter Plot's Jurisdiction:</label>
                       <input placeholder="eg. Court Jurisdiction" type="text" name="plot-jurisdiction" value={formData["plot-jurisdiction"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="north-boundary-details">Enter North Boundary Details:</label>
                       <input placeholder="eg. Adjacent to Mr. Kumar’s House" type="text" name="north-boundary-details" value={formData["north-boundary-details"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="south-boundary-details">Enter South Boundary Details:</label>
                       <input placeholder="eg. 20 ft. Wide Road" type="text" name="south-boundary-details" value={formData["south-boundary-details"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="East-boundary-details">Enter East Boundary Details:</label>
                       <input placeholder="eg. Adjoining Residential Apartment" type="text" name="East-boundary-details" value={formData["East-boundary-details"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="west-boundary-details">Enter West Boundary Details:</label>
                       <input placeholder="eg. Empty Land" type="text" name="west-boundary-details" value={formData["west-boundary-details"]} onChange={handleChange} />
                   </div>
                   <div>
                       <label htmlFor="select-language">Select Language To Generate Summary:</label>
                       <select name="select-language" id="select-language" value={formData["select-language"]} onChange={handleChange}>
                                                               <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Tamil">Tamil</option>
                                    <option value="Telugu">Telugu</option>
                                    <option value="Bengali">Bengali</option></select>
                   </div>
               </div>
               <button className="submit-btn" type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Submitting..." : "Submit"}
</button>
           </form>
       </div>
   </div>
</div>
);
}

export default GrantCopyrightInComputerSoftware;
