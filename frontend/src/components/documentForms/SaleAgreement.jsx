import { useState } from "react";
import axios from "axios";

function SaleAgreement() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/documents/generate", {
                documentType: "sale-agreement", // Specify the document type
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
                    <h2>Enter The Details for Sale Agreement</h2>
                    <form className="agreement-form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="agreement-day">Enter Agreement Day:</label>
                                <input placeholder="eg.25" type="date" name="agreement-day"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-month">Enter Agreement Month:</label>
                                <input placeholder="eg.January " type="date" name="agreement-month"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-year">Enter Agreement Year:</label>
                                <input placeholder="eg.2025" type="date" name="agreement-year"/>
                            </div>
                            <div>
                                <label htmlFor="place-of-agreement">Enter Place Of Agreement:</label>
                                <input placeholder="eg. Chennai, Tamil Nadu" type="text" name="place-of-agreement"/>
                            </div>
                            <div>
                                <label htmlFor="sellers-name">Enter Seller's Name:</label>
                                <input placeholder="eg. Ramesh Kumar" type="text" name="sellers-name"/>
                            </div>
                            <div>
                                <label htmlFor="sellers-fathers-name">Enter Seller's Fathers Name:</label>
                                <input placeholder="eg. Suresh Kumar" type="text" name="sellers-fathers-name"/>
                            </div>
                            <div>
                                <label htmlFor="sellers-address">Enter Seller's Address:</label>
                                <input placeholder="eg. 12, Gandhi Street, Chennai, Tamil Nadu, India" type="text" name="sellers-address"/>
                            </div>
                            <div>
                                <label htmlFor="purchasers-name">Enter Purchaser's Name:</label>
                                <input placeholder="eg. Anuj Sharma" type="text" name="purchasers-name"/>
                            </div>
                            <div>
                                <label htmlFor="purchasers-fathers-name">Enter purchaser's Fathers Name:</label>
                                <input placeholder="eg. Vinod Sharma" type="text" name="purchasers-fathers-name"/>
                            </div>
                            <div>
                                <label htmlFor="purchasers-address">Enter purchaser's Address:</label>
                                <input placeholder="eg. 45, MG Road, Bangalore, Karnataka, India" type="text" name="purchasers-address"/>
                            </div>
                            <div>
                                <label htmlFor="total-sale-price">Enter Total Sale Price(₹):</label>
                                <input placeholder="eg. ₹50,00,000/-" type="text" name="total-sale-price"/>
                            </div>
                            <div>
                                <label htmlFor="total-sale-price-in-words">Enter Total Sale Price-in Words:</label>
                                <input placeholder="eg. Ten Lakh Rupees Only" type="text" name="total-sale-price-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="property-area">Enter Property Area:</label>
                                <input placeholder="eg. 1500 sq.ft." type="text" name="property-area"/>
                            </div>
                            <div>
                                <label htmlFor="advance-payment-amount">Enter Advance Payment Amount:</label>
                                <input placeholder="eg. ₹10,00,000/-" type="text" name="advance-payment-amount"/>
                            </div>
                            <div>
                                <label htmlFor="advance-payment-amount-in-words">Enter Advance Payment Amount in Words:</label>
                                <input placeholder="eg. Ten Lakh Rupees Only" type="text" name="advance-payment-amount-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="cheque-number">Enter Cheque Number:</label>
                                <input placeholder="eg. 4567890123" type="text" name="cheque-number"/>
                            </div>
                            <div>
                                <label htmlFor="cheque-issuance-date ">Enter Cheque Issuance Date:</label>
                                <input placeholder="eg. 05/02/2024" type="date" name="cheque-issuance-date "/>
                            </div>
                            <div>
                                <label htmlFor="cheque-drawn-date ">Enter Cheque Drawn Date:</label>
                                <input placeholder="eg. 05/02/2024" type="date" name="cheque-drawn-date "/>
                            </div>
                            <div>
                                <label htmlFor="remaining-balance-amount">Enter Remaining Balance Amount:</label>
                                <input placeholder="eg. ₹40,00,000/-" type="text" name="remaining-balance-amount"/>
                            </div>
                            <div>
                                <label htmlFor="remaining-balance-amount-in-words">Enter Remaining Balance Amount in Words:</label>
                                <input placeholder="eg. Forty Lakh Rupees Only" type="text" name="remaining-balance-amount-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="compensation-amount-for-breach">Enter Compensation Amount For Breach:</label>
                                <input placeholder="eg. ₹5,00,000/- (in case of non-fulfillment)" type="text" name="compensation-amount-for-breach"/>
                            </div>
                            <div>
                                <label htmlFor="day-of-agreement-execution">Enter Day of Agreement Execution:</label>
                                <input placeholder="eg. Monday, 15th April 2024" type="text" name="day-of-agreement-execution"/>
                            </div>
                            <div>
                                <label htmlFor="property-address">Enter Property Address:</label>
                                <input placeholder="eg. 22, Anna Nagar, Chennai - 600028, Tamil Nadu" type="text" name="property-address"/>
                            </div>
                            <div>
                                <label htmlFor="north-boundary-details">Enter North Boundary Details:</label>
                                <input placeholder="eg. Adjacent to Mr. Kumar’s House" type="text" name="north-boundary-details"/>
                            </div>
                            <div>
                                <label htmlFor="south-boundary-details">Enter South Boundary Details:</label>
                                <input placeholder="eg. 20 ft. Wide Road" type="text" name="south-boundary-details"/>
                            </div>
                            <div>
                                <label htmlFor="west-boundary-details">Enter West Boundary Details:</label>
                                <input placeholder="eg. Adjoining Residential Apartment" type="text" name="west-boundary-details"/>
                            </div>
                            <div>
                                <label htmlFor="east-boundary-details">Enter East Boundary Details:</label>
                                <input placeholder="eg. Empty Land" type="text" name="east-boundary-details"/>
                            </div>
                            <div>
                                <label htmlFor="shop-flat-plot-number">Enter Shop/Flat/Plot Number:</label>
                                <input placeholder="eg. Flat No. 5B, Block C" type="text" name="shop-flat-plot-number"/>
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

export default SaleAgreement;