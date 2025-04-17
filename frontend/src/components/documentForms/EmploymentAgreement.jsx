import { useState } from "react";
import axios from "axios";

function EmploymentAgreement() {
    const [formData, setFormData] = useState({
        "agreement-date": "",
        "agreement-month": "",
        "agreement-year": "",
        "company-name": "",
        "company-address": "",
        "employee-name": "",
        "dependant-name": "",
        "employee-age": "",
        "employee-address": "",
        "job-position": "",
        "initial-work-period": "",
        "job-responsibilities": "",
        "salary-amount": "",
        "causal-leave-days": "",
        "causal-leave-in-words": "",
        "sick-leave-days": "",
        "sick-leave-in-words": "",
        "public-holidays-allowed": "",
        "public-holidays-in-words": "",
        "notice-period-duration": "",
        "notice-period-in-words": "",
        "employee-advance-payment": "",
        "employee-advance-payment-words": "",
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
                documentType: "employment", // Specify the document type
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
                    <h2>Enter The Details For Employment Agreement</h2>
                    <form className="agreement-form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="agreement-date">Enter Agreement Date:</label>
                                <input placeholder="eg. 25/02/2025" type="date" name="agreement-date"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-month">Enter Agreement Month:</label>
                                <input placeholder="eg. February" type="text" name="agreement-month"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-year">Enter Agreement Year:</label>
                                <input placeholder="eg. 2025" type="text" name="agreement-year"/>
                            </div>
                            <div>
                                <label htmlFor="company-name">Enter Company Name:</label>
                                <input placeholder="eg. Infosys Limited" type="text" name="company-name"/>
                            </div>
                            <div>
                                <label htmlFor="company-address">Enter Company Address:</label>
                                <input placeholder="eg. No. 44, Electronics City, Bangalore, India" type="text" name="company-address"/>
                            </div>
                            <div>
                                <label htmlFor="employee-name">Enter Employee Name:</label>
                                <input placeholder="eg. Priya Sharma" type="text" name="employee-name"/>
                            </div>
                            <div>
                                <label htmlFor="dependant-name">Enter Dependant Name:</label>
                                <input placeholder="eg. Rahul Sharma" type="text" name="dependant-name"/>
                            </div>
                            <div>
                                <label htmlFor="employee-age">Enter Employee Age:</label>
                                <input placeholder="eg. 30" type="text" name="employee-age"/>
                            </div>
                            <div>
                                <label htmlFor="employee-address">Enter Employee Address:</label>
                                <input placeholder="eg. 102, Green Avenue, New Delhi, India" type="text" name="employee-address"/>
                            </div>
                            <div>
                                <label htmlFor="job-position">Enter Job Position:</label>
                                <input placeholder="eg. Software Engineer" type="text" name="job-position"/>
                            </div>
                            <div>
                                <label htmlFor="initial-work-period">Enter Initial Work Period:</label>
                                <input placeholder="eg. 90 days probation" type="text" name="initial-work-period"/>
                            </div>
                            <div>
                                <label htmlFor="job-responsibilities">Enter Job Responsibilities:</label>
                                <input placeholder="eg. Software development, testing, documentation" type="text" name="job-responsibilities"/>
                            </div>
                            <div>
                                <label htmlFor="salary-amount">Enter Salary Amount:</label>
                                <input placeholder="eg. ₹1,20,000/-" type="text" name="salary-amount"/>
                            </div>
                            <div>
                                <label htmlFor="causal-leave-days">Enter Causal Leave Days:</label>
                                <input placeholder="eg. 12 per year" type="text" name="causal-leave-days"/>
                            </div>
                            <div>
                                <label htmlFor="causal-leave-in-words">Enter Causal Leave In Words:</label>
                                <input placeholder="eg. Twelve Leaves Per Year" type="text" name="causal-leave-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="sick-leave-days">Enter Sick Leave Days:</label>
                                <input placeholder="eg. 8 per year" type="text" name="sick-leave-days"/>
                            </div>
                            <div>
                                <label htmlFor="sick-leave-in-words">Enter Sick Leave In Words:</label>
                                <input placeholder="eg. Eight Leaves Per Year" type="text" name="sick-leave-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="public-holidays-allowed">Enter Public Holidays Allowed:</label>
                                <input placeholder="eg. 10 per year" type="text" name="public-holidays-allowed"/>
                            </div>
                            <div>
                                <label htmlFor="public-holidays-in-words">Enter Public Holidays In Words:</label>
                                <input placeholder="eg. Ten Holidays Per Year" type="text" name="public-holidays-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="notice-period-duration">Enter Notice Period Duration:</label>
                                <input placeholder="eg. 2 Months" type="text" name="notice-period-duration"/>
                            </div>
                            <div>
                                <label htmlFor="notice-period-in-words">Enter Notice Period In Words:</label>
                                <input placeholder="eg. Two Months" type="text" name="notice-period-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="employee-advance-payment">Enter Employee Advance Payment:</label>
                                <input placeholder="eg. ₹50,000/-" type="text" name="employee-advance-payment"/>
                            </div>
                            <div>
                                <label htmlFor="employee-advance-payment-words">Enter Employee Advance Payment Words:</label>
                                <input placeholder="eg. Fifty Thousand Rupees Only" type="text" name="employee-advance-payment-words"/>
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

export default EmploymentAgreement;