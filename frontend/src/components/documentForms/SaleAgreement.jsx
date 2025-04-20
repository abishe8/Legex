import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function SaleAgreement() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Retrieve pre-filled form data from location.state
    const preFilledData = location.state?.formData;
    const [formData, setFormData] = useState({
        "agreement-day": "",
        "agreement-month": "",
        "agreement-year": "",
        "place-of-agreement": "",
        "sellers-name": "",
        "sellers-fathers-name": "",
        "sellers-address": "",
        "purchasers-name": "",
        "purchasers-fathers-name": "",
        "purchasers-address": "",
        "total-sale-price": "",
        "total-sale-price-in-words": "",
        "property-area": "",
        "advance-payment-amount": "",
        "advance-payment-amount-in-words": "",
        "cheque-number": "",
        "cheque-issuance-date": "",
        "cheque-drawn-date": "",
        "remaining-balance-amount": "",
        "remaining-balance-amount-in-words": "",
        "compensation-amount-for-breach": "",
        "day-of-agreement-execution": "",
        "property-address": "",
        "north-boundary-details": "",
        "south-boundary-details": "",
        "west-boundary-details": "",
        "east-boundary-details": "",
        "shop-flat-plot-number": "",
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
              documentType: "sale",
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
                  formData,
                  documentType: "sale-agreement",
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
      <h2>Enter The Details for Sale Agreement</h2>
      <form className="agreement-form" onSubmit={handleSubmit}>
        <div className="form-inputs">
          <div>
            <label htmlFor="agreement-day">Enter Agreement Day:</label>
            <input
              placeholder="eg.25"
              type="date"
              name="agreement-day"
              value={formData["agreement-day"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="agreement-month">Enter Agreement Month:</label>
            <input
              placeholder="eg.January "
              type="date"
              name="agreement-month"
              value={formData["agreement-month"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="agreement-year">Enter Agreement Year:</label>
            <input
              placeholder="eg.2025"
              type="date"
              name="agreement-year"
              value={formData["agreement-year"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="place-of-agreement">Enter Place Of Agreement:</label>
            <input
              placeholder="eg. Chennai, Tamil Nadu"
              type="text"
              name="place-of-agreement"
              value={formData["place-of-agreement"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sellers-name">Enter Seller's Name:</label>
            <input
              placeholder="eg. Ramesh Kumar"
              type="text"
              name="sellers-name"
              value={formData["sellers-name"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sellers-fathers-name">Enter Seller's Fathers Name:</label>
            <input
              placeholder="eg. Suresh Kumar"
              type="text"
              name="sellers-fathers-name"
              value={formData["sellers-fathers-name"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sellers-address">Enter Seller's Address:</label>
            <input
              placeholder="eg. 12, Gandhi Street, Chennai, Tamil Nadu, India"
              type="text"
              name="sellers-address"
              value={formData["sellers-address"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="purchasers-name">Enter Purchaser's Name:</label>
            <input
              placeholder="eg. Anuj Sharma"
              type="text"
              name="purchasers-name"
              value={formData["purchasers-name"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="purchasers-fathers-name">Enter purchaser's Fathers Name:</label>
            <input
              placeholder="eg. Vinod Sharma"
              type="text"
              name="purchasers-fathers-name"
              value={formData["purchasers-fathers-name"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="purchasers-address">Enter purchaser's Address:</label>
            <input
              placeholder="eg. 45, MG Road, Bangalore, Karnataka, India"
              type="text"
              name="purchasers-address"
              value={formData["purchasers-address"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="total-sale-price">Enter Total Sale Price(₹):</label>
            <input
              placeholder="eg. ₹50,00,000/-"
              type="text"
              name="total-sale-price"
              value={formData["total-sale-price"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="total-sale-price-in-words">Enter Total Sale Price-in Words:</label>
            <input
              placeholder="eg. Ten Lakh Rupees Only"
              type="text"
              name="total-sale-price-in-words"
              value={formData["total-sale-price-in-words"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="property-area">Enter Property Area:</label>
            <input
              placeholder="eg. 1500 sq.ft."
              type="text"
              name="property-area"
              value={formData["property-area"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="advance-payment-amount">Enter Advance Payment Amount:</label>
            <input
              placeholder="eg. ₹10,00,000/-"
              type="text"
              name="advance-payment-amount"
              value={formData["advance-payment-amount"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="advance-payment-amount-in-words">Enter Advance Payment Amount in Words:</label>
            <input
              placeholder="eg. Ten Lakh Rupees Only"
              type="text"
              name="advance-payment-amount-in-words"
              value={formData["advance-payment-amount-in-words"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cheque-number">Enter Cheque Number:</label>
            <input
              placeholder="eg. 4567890123"
              type="text"
              name="cheque-number"
              value={formData["cheque-number"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cheque-issuance-date ">Enter Cheque Issuance Date:</label>
            <input
              placeholder="eg. 05/02/2024"
              type="date"
              name="cheque-issuance-date "
              value={formData["cheque-issuance-date "]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cheque-drawn-date ">Enter Cheque Drawn Date:</label>
            <input
              placeholder="eg. 05/02/2024"
              type="date"
              name="cheque-drawn-date "
              value={formData["cheque-drawn-date "]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="remaining-balance-amount">Enter Remaining Balance Amount:</label>
            <input
              placeholder="eg. ₹40,00,000/-"
              type="text"
              name="remaining-balance-amount"
              value={formData["remaining-balance-amount"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="remaining-balance-amount-in-words">Enter Remaining Balance Amount in Words:</label>
            <input
              placeholder="eg. Forty Lakh Rupees Only"
              type="text"
              name="remaining-balance-amount-in-words"
              value={formData["remaining-balance-amount-in-words"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="compensation-amount-for-breach">Enter Compensation Amount For Breach:</label>
            <input
              placeholder="eg. ₹5,00,000/- (in case of non-fulfillment)"
              type="text"
              name="compensation-amount-for-breach"
              value={formData["compensation-amount-for-breach"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="day-of-agreement-execution">Enter Day of Agreement Execution:</label>
            <input
              placeholder="eg. Monday, 15th April 2024"
              type="text"
              name="day-of-agreement-execution"
              value={formData["day-of-agreement-execution"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="property-address">Enter Property Address:</label>
            <input
              placeholder="eg. 22, Anna Nagar, Chennai - 600028, Tamil Nadu"
              type="text"
              name="property-address"
              value={formData["property-address"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="north-boundary-details">Enter North Boundary Details:</label>
            <input
              placeholder="eg. Adjacent to Mr. Kumar’s House"
              type="text"
              name="north-boundary-details"
              value={formData["north-boundary-details"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="south-boundary-details">Enter South Boundary Details:</label>
            <input
              placeholder="eg. 20 ft. Wide Road"
              type="text"
              name="south-boundary-details"
              value={formData["south-boundary-details"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="west-boundary-details">Enter West Boundary Details:</label>
            <input
              placeholder="eg. Adjoining Residential Apartment"
              type="text"
              name="west-boundary-details"
              value={formData["west-boundary-details"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="east-boundary-details">Enter East Boundary Details:</label>
            <input
              placeholder="eg. Empty Land"
              type="text"
              name="east-boundary-details"
              value={formData["east-boundary-details"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="shop-flat-plot-number">Enter Shop/Flat/Plot Number:</label>
            <input
              placeholder="eg. Flat No. 5B, Block C"
              type="text"
              name="shop-flat-plot-number"
              value={formData["shop-flat-plot-number"]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="select-language">Select Language To Generate Summary:</label>
            <select
              name="select-language"
              id="select-language"
              value={formData["select-language"]}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
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

export default SaleAgreement;