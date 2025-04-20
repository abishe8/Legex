import { useState,useEffect} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function VehicleSaleAgreement() {
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve pre-filled form data from location.state
    const preFilledData = location.state?.formData;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        "agreement-date": "",
        "agreement-year": "",
        "sellers-name": "",
        "sellers-fathers-name": "",
        "sellers-address": "",
        "vehicle-name-model": "",
        "buyer-name": "",
        "buyers-fathers-name": "",
        "buyers-address": "",
        "vehicle-registration-number": "",
        "vehicle-chassis-number": "",
        "vehicle-engine-number": "",
        "sale-price": "",
        "payment-mode": "",
        "nominee-address": "",
        "bank-name": "",
        "place-of-agreement": "",
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
                documentType: "vehicle",
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
                    documentType: "motor-vehicle-sale-agreement",
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
            <h2>Enter The Details for Vehicle Sale Agreement</h2>
            <form className="agreement-form" onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <div>
                        <label htmlFor="agreement-date">Enter Agreement Date:</label>
                        <input
                            placeholder="eg. 10th May"
                            type="text"
                            name="agreement-date"
                            value={formData["agreement-date"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="agreement-year">Enter Agreement Year:</label>
                        <input
                            placeholder="eg. 2025"
                            type="text"
                            name="agreement-year"
                            value={formData["agreement-year"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="sellers-name">Enter Seller's Name:</label>
                        <input
                            placeholder="eg. Ravi Kumar"
                            type="text"
                            name="sellers-name"
                            value={formData["sellers-name"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="sellers-fathers-name">Enter Seller's Fathers Name:</label>
                        <input
                            placeholder="eg. Prakash Kumar"
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
                        <label htmlFor="vehicle-name-model">Enter Vehicle Name/Model:</label>
                        <input
                            placeholder="eg. Maruti Suzuki Swift VXi 2022"
                            type="text"
                            name="vehicle-name-model"
                            value={formData["vehicle-name-model"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="buyer-name">Enter Buyer Name:</label>
                        <input
                            placeholder="eg. Arun Sharma"
                            type="text"
                            name="buyer-name"
                            value={formData["buyer-name"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="buyers-fathers-name">Enter Buyer's Fathers Name:</label>
                        <input
                            placeholder="eg. Rajesh Sharma"
                            type="text"
                            name="buyers-fathers-name"
                            value={formData["buyers-fathers-name"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="buyers-address">Enter Buyer's Address:</label>
                        <input
                            placeholder="eg. 45, MG Road, Bangalore, Karnataka, India"
                            type="text"
                            name="buyers-address"
                            value={formData["buyers-address"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="vehicle-registration-number">Enter Vehicle Registration Number:</label>
                        <input
                            placeholder="eg. TN 10 AB 4567"
                            type="text"
                            name="vehicle-registration-number"
                            value={formData["vehicle-registration-number"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="vehicle-chassis-number">Enter Vehicle Chassis Number:</label>
                        <input
                            placeholder="eg. MA3EHKD1S00234567"
                            type="text"
                            name="vehicle-chassis-number"
                            value={formData["vehicle-chassis-number"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="vehicle-engine-number">Enter Vehicle Engine Number</label>
                        <input
                            placeholder="eg. D13A456789"
                            type="text"
                            name="vehicle-engine-number"
                            value={formData["vehicle-engine-number"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="sale-price">Enter Sale Price :</label>
                        <input
                            placeholder="eg. ₹6,00,000/-"
                            type="text"
                            name="sale-price"
                            value={formData["sale-price"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="payment-mode">Enter Payment Mode:</label>
                        <input
                            placeholder="eg. Online Transfer"
                            type="text"
                            name="payment-mode"
                            value={formData["payment-mode"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="nominee-address">Enter Nominee Address:</label>
                        <input
                            placeholder="eg. 98, Residency Road, Mumbai, Maharashtra, India"
                            type="text"
                            name="nominee-address"
                            value={formData["nominee-address"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="bank-name">Enter Bank Name:</label>
                        <input
                            placeholder="eg. State Bank of India"
                            type="text"
                            name="bank-name"
                            value={formData["bank-name"]}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="place-of-agreement">Enter Place of Agreement :</label>
                        <input
                            placeholder="eg. Chennai, Tamil Nadu"
                            type="text"
                            name="place-of-agreement"
                            value={formData["place-of-agreement"]}
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

export default VehicleSaleAgreement;