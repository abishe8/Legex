
import { useState } from "react";
import axios from "axios";
function VehicleSaleAgreement() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/documents/generate", {
                documentType: "vehicle", // Specify the document type
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
                    <h2>Enter The Details for Vehicle Sale Agreement</h2>
                    <form className="agreement-form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="agreement-date">Enter Agreement Date:</label>
                                <input placeholder="eg. 10th May" type="text" name="agreement-date"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-year">Enter Agreement Year:</label>
                                <input placeholder="eg. 2025" type="text" name="agreement-year"/>
                            </div>
                            <div>
                                <label htmlFor="sellers-name">Enter Seller's Name:</label>
                                <input placeholder="eg. Ravi Kumar" type="text" name="sellers-name"/>
                            </div>
                            <div>
                                <label htmlFor="sellers-fathers-name">Enter Seller's Fathers Name:</label>
                                <input placeholder="eg. Prakash Kumar" type="text" name="sellers-fathers-name"/>
                            </div>
                            <div>
                                <label htmlFor="sellers-address">Enter Seller's Address:</label>
                                <input placeholder="eg. 12, Gandhi Street, Chennai, Tamil Nadu, India" type="text" name="sellers-address"/>
                            </div>
                            <div>
                                <label htmlFor="vehicle-name-model">Enter Vehicle Name/Model:</label>
                                <input placeholder="eg. Maruti Suzuki Swift VXi 2022" type="text" name="vehicle-name-model"/>
                            </div>
                            <div>
                                <label htmlFor="buyer-name">Enter Buyer Name:</label>
                                <input placeholder="eg. Arun Sharma" type="text" name="buyer-name"/>
                            </div>
                            <div>
                                <label htmlFor="buyers-fathers-name">Enter Buyer's Fathers Name:</label>
                                <input placeholder="eg. Rajesh Sharma" type="text" name="buyers-fathers-name"/>
                            </div>
                            <div>
                                <label htmlFor="buyers-address">Enter Buyer's Address:</label>
                                <input placeholder="eg. 45, MG Road, Bangalore, Karnataka, India" type="text" name="buyers-address"/>
                            </div>
                            <div>
                                <label htmlFor="vehicle-registration-number">Enter Vehicle Registration Number:</label>
                                <input placeholder="eg. TN 10 AB 4567" type="text" name="vehicle-registration-number"/>
                            </div>
                            <div>
                                <label htmlFor="vehicle-chassis-number">Enter Vehicle Chassis Number:</label>
                                <input placeholder="eg. MA3EHKD1S00234567" type="text" name="vehicle-chassis-number"/>
                            </div>
                            <div>
                                <label htmlFor="vehicle-engine-number">Enter Vehicle Engine Number</label>
                                <input placeholder="eg. D13A456789" type="text" name="vehicle-engine-number"/>
                            </div>
                            <div>
                                <label htmlFor="sale-price ">Enter Sale Price :</label>
                                <input placeholder="eg. ₹6,00,000/-" type="text" name="sale-price "/>
                            </div>
                            <div>
                                <label htmlFor="payment-mode">Enter Payment Mode:</label>
                                <input placeholder="eg. Online Transfer" type="text" name="payment-mode"/>
                            </div>
                            <div>
                                <label htmlFor="nominee-address">Enter Nominee Address:</label>
                                <input placeholder="eg. 98, Residency Road, Mumbai, Maharashtra, India" type="text" name="nominee-address"/>
                            </div>
                            <div>
                                <label htmlFor="bank-name">Enter Bank Name:</label>
                                <input placeholder="eg. State Bank of India" type="text" name="bank-name"/>
                            </div>
                            <div>
                                <label htmlFor="place-of-agreement">Enter Place of Agreement :</label>
                                <input placeholder="eg. Chennai, Tamil Nadu" type="text" name="place-of-agreement"/>
                            </div>
                            <div>
                                <label htmlFor="select-language">Select Language To Generate Summary:</label>
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

export default VehicleSaleAgreement;