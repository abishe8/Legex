import { useState } from "react";
import axios from "axios";

function DeedOfSimpleMortgage() {
    const [formData, setFormData] = useState({
        "agreement-day": "",
        "agreement-month": "",
        "agreement-year": "",
        "borrowers-name": "",
        "borrowers-location": "",
        "lenders-name": "",
        "lenders-address": "",
        "loan-amount": "",
        "loan-agreement-day": "",
        "loan-agreement-month": "",
        "loan-agreement-year": "",
        "interest-rate": "",
        "fixed-repayment-day": "",
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
                documentType: "mortage", // Specify the document type
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
                    <h2>Enter The Details For Deed of Simple Mortgage</h2>
                    <form className="agreement-form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="agreement-day">Enter Agreement Day:</label>
                                <input
                                    placeholder="eg. 30"
                                    type="text"
                                    name="agreement-day"
                                    value={formData["agreement-day"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="agreement-month">Enter Agreement Month:</label>
                                <input
                                    placeholder="eg. 11"
                                    type="text"
                                    name="agreement-month"
                                    value={formData["agreement-month"]}
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
                                <label htmlFor="borrowers-name">Enter Borrower's Name:</label>
                                <input
                                    placeholder="eg. Ram Kumar"
                                    type="text"
                                    name="borrowers-name"
                                    value={formData["borrowers-name"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="borrowers-location">Enter Borrower's Location:</label>
                                <input
                                    placeholder="eg. 102, Green Avenue, New Delhi, India"
                                    type="text"
                                    name="borrowers-location"
                                    value={formData["borrowers-location"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lenders-name">Enter Lenders Name:</label>
                                <input
                                    placeholder="eg. Priya Sharma"
                                    type="text"
                                    name="lenders-name"
                                    value={formData["lenders-name"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lenders-address">Enter Lenders Address:</label>
                                <input
                                    placeholder="eg. No. 44, Electronics City, Bangalore, India"
                                    type="text"
                                    name="lenders-address"
                                    value={formData["lenders-address"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="loan-amount">Enter Loan Amount:</label>
                                <input
                                    placeholder="eg. (₹5,00,000/-)"
                                    type="text"
                                    name="loan-amount"
                                    value={formData["loan-amount"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="loan-agreement-day">Enter Loan Agreement Day:</label>
                                <input
                                    placeholder="eg. 17"
                                    type="text"
                                    name="loan-agreement-day"
                                    value={formData["loan-agreement-day"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="loan-agreement-month">Enter Loan Agreement Month:</label>
                                <input
                                    placeholder="eg. 06"
                                    type="text"
                                    name="loan-agreement-month"
                                    value={formData["loan-agreement-month"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="loan-agreement-year">Enter Loan Agreement Year:</label>
                                <input
                                    placeholder="eg. 2025"
                                    type="text"
                                    name="loan-agreement-year"
                                    value={formData["loan-agreement-year"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="interest-rate">Enter Interest Rate(%):</label>
                                <input
                                    placeholder="eg. 12% per annum"
                                    type="text"
                                    name="interest-rate"
                                    value={formData["interest-rate"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="fixed-repayment-day">Enter Fixed Repayment Day:</label>
                                <input
                                    placeholder="eg. 10th of every month"
                                    type="text"
                                    name="fixed-repayment-day"
                                    value={formData["fixed-repayment-day"]}
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
                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeedOfSimpleMortgage;