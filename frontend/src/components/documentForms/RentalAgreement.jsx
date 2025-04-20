import { useState,useEffect} from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

function RentalAgreement() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Retrieve pre-filled form data from location.state
    const preFilledData = location.state?.formData;

    const [formData, setFormData] = useState({
        "owner-name": "",
        "owners-father": "",
        "owner-age": "",
        "owner-occupation": "",
        "address": "",
        "tenant-name": "",
        "tenant-age": "",
        "tenant-occupation": "",
        "amount": "",
        "interest": "",
        "from-to-date": "",
        "notice-period": "",
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
                documentType: "rental",
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
                    documentType: "rental-agreement",
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
                    <h2>Enter The Details For Rental Agreement</h2>
                    <form className="agreement-form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="owner-name">Enter Owner Name:</label>
                                <input
                                    placeholder="eg. Ramsesh Iyer"
                                    type="text"
                                    name="owner-name"
                                    value={formData["owner-name"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="owners-father">Owner's Father's Name:</label>
                                <input
                                    placeholder="eg. Suresh Iyer"
                                    type="text"
                                    name="owners-father"
                                    value={formData["owners-father"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="owner-age">Enter Owner Age:</label>
                                <input
                                    placeholder="eg. 50"
                                    type="text"
                                    name="owner-age"
                                    value={formData["owner-age"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="owner-occupation">Enter Owner Occupation:</label>
                                <input
                                    placeholder="eg. Retired Govt. Officer"
                                    type="text"
                                    name="owner-occupation"
                                    value={formData["owner-occupation"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="address">Enter Owner's Address:</label>
                                <input
                                    placeholder="14, Lakeview Street, Chennai, Tamil Nadu, India"
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="tenant-name">Enter Tenant Name:</label>
                                <input
                                    placeholder="eg. Anuj Sharma"
                                    type="text"
                                    name="tenant-name"
                                    value={formData["tenant-name"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="tenant-age">Enter Tenant Age:</label>
                                <input
                                    placeholder="eg. 30"
                                    type="text"
                                    name="tenant-age"
                                    value={formData["tenant-age"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="tenant-occupation">Enter Tenant Occupation:</label>
                                <input
                                    placeholder="eg. Software Engineer"
                                    type="text"
                                    name="tenant-occupation"
                                    value={formData["tenant-occupation"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="amount">Enter Rental Amount:</label>
                                <input
                                    placeholder="eg. ₹15,000/- per month"
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="interest">Enter Security Deposit:</label>
                                <input
                                    placeholder="eg. ₹1,00,000/-"
                                    type="text"
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="from-to-date">Enter Rental Period Start & End Date:</label>
                                <input
                                    placeholder="eg. 01/04/2024 - 31/03/2025"
                                    type="text"
                                    name="from-to-date"
                                    value={formData["from-to-date"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="notice-period">Enter Notice Period Duration:</label>
                                <input
                                    placeholder="eg. 2 months prior notice required"
                                    type="text"
                                    name="notice-period"
                                    value={formData["notice-period"]}
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

export default RentalAgreement;