import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

function EmploymentAgreement() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Retrieve pre-filled form data from location.state
    const preFilledData = location.state?.formData;
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
                documentType: "employment",
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
                    documentType: "employment-agreement",
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
                <h2>Enter The Details For Employment Agreement</h2>
                <form className="agreement-form" onSubmit={handleSubmit}>
                    <div className="form-inputs">
                        <div>
                            <label htmlFor="agreement-date">Enter Agreement Date:</label>
                            <input
                                placeholder="eg. 25/02/2025"
                                type="date"
                                name="agreement-date"
                                value={formData["agreement-date"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="agreement-month">Enter Agreement Month:</label>
                            <input
                                placeholder="eg. February"
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
                            <label htmlFor="company-name">Enter Company Name:</label>
                            <input
                                placeholder="eg. Infosys Limited"
                                type="text"
                                name="company-name"
                                value={formData["company-name"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="company-address">Enter Company Address:</label>
                            <input
                                placeholder="eg. No. 44, Electronics City, Bangalore, India"
                                type="text"
                                name="company-address"
                                value={formData["company-address"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-name">Enter Employee Name:</label>
                            <input
                                placeholder="eg. Priya Sharma"
                                type="text"
                                name="employee-name"
                                value={formData["employee-name"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="dependant-name">Enter Dependant Name:</label>
                            <input
                                placeholder="eg. Rahul Sharma"
                                type="text"
                                name="dependant-name"
                                value={formData["dependant-name"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-age">Enter Employee Age:</label>
                            <input
                                placeholder="eg. 30"
                                type="text"
                                name="employee-age"
                                value={formData["employee-age"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-address">Enter Employee Address:</label>
                            <input
                                placeholder="eg. 102, Green Avenue, New Delhi, India"
                                type="text"
                                name="employee-address"
                                value={formData["employee-address"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="job-position">Enter Job Position:</label>
                            <input
                                placeholder="eg. Software Engineer"
                                type="text"
                                name="job-position"
                                value={formData["job-position"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="initial-work-period">Enter Initial Work Period:</label>
                            <input
                                placeholder="eg. 90 days probation"
                                type="text"
                                name="initial-work-period"
                                value={formData["initial-work-period"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="job-responsibilities">Enter Job Responsibilities:</label>
                            <input
                                placeholder="eg. Software development, testing, documentation"
                                type="text"
                                name="job-responsibilities"
                                value={formData["job-responsibilities"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="salary-amount">Enter Salary Amount:</label>
                            <input
                                placeholder="eg. ₹1,20,000/-"
                                type="text"
                                name="salary-amount"
                                value={formData["salary-amount"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="causal-leave-days">Enter Causal Leave Days:</label>
                            <input
                                placeholder="eg. 12 per year"
                                type="text"
                                name="causal-leave-days"
                                value={formData["causal-leave-days"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="causal-leave-in-words">Enter Causal Leave In Words:</label>
                            <input
                                placeholder="eg. Twelve Leaves Per Year"
                                type="text"
                                name="causal-leave-in-words"
                                value={formData["causal-leave-in-words"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="sick-leave-days">Enter Sick Leave Days:</label>
                            <input
                                placeholder="eg. 8 per year"
                                type="text"
                                name="sick-leave-days"
                                value={formData["sick-leave-days"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="sick-leave-in-words">Enter Sick Leave In Words:</label>
                            <input
                                placeholder="eg. Eight Leaves Per Year"
                                type="text"
                                name="sick-leave-in-words"
                                value={formData["sick-leave-in-words"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="public-holidays-allowed">Enter Public Holidays Allowed:</label>
                            <input
                                placeholder="eg. 10 per year"
                                type="text"
                                name="public-holidays-allowed"
                                value={formData["public-holidays-allowed"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="public-holidays-in-words">Enter Public Holidays In Words:</label>
                            <input
                                placeholder="eg. Ten Holidays Per Year"
                                type="text"
                                name="public-holidays-in-words"
                                value={formData["public-holidays-in-words"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="notice-period-duration">Enter Notice Period Duration:</label>
                            <input
                                placeholder="eg. 2 Months"
                                type="text"
                                name="notice-period-duration"
                                value={formData["notice-period-duration"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="notice-period-in-words">Enter Notice Period In Words:</label>
                            <input
                                placeholder="eg. Two Months"
                                type="text"
                                name="notice-period-in-words"
                                value={formData["notice-period-in-words"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-advance-payment">Enter Employee Advance Payment:</label>
                            <input
                                placeholder="eg. ₹50,000/-"
                                type="text"
                                name="employee-advance-payment"
                                value={formData["employee-advance-payment"]}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-advance-payment-words">Enter Employee Advance Payment Words:</label>
                            <input
                                placeholder="eg. Fifty Thousand Rupees Only"
                                type="text"
                                name="employee-advance-payment-words"
                                value={formData["employee-advance-payment-words"]}
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

export default EmploymentAgreement;