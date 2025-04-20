import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

function PowerOfAttorney() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Retrieve pre-filled form data from location.state
    const preFilledData = location.state?.formData;

    const [formData, setFormData] = useState({
        "principal-name": "",
        "principal-age": "",
        "principal-address": "",
        "nominee-name": "",
        "nominee-fathers-name": "",
        "nominee-age": "",
        "nominee-address": "",
        "bank-name": "",
        "day-of-agreement": "",
        "year-of-agreement": "",
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
                    <h2>Enter The Details for Power of Attorney</h2>
                    <form className="agreement-form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="principal-name">Enter Principal Name:</label>
                                <input placeholder="eg. Rajesh Kumar" type="text" name="principal-name"
                                value={formData["principal-name"]}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="principal-age">Enter Principal Age:</label>
                                <input placeholder="eg. 55" type="text" name="principal-age"
                                value={formData["principal-age"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="principal-address">Enter Principal Address:</label>
                                <input placeholder="eg. 12, MG Road, Chennai, Tamil Nadu, India" type="text" name="principal-address" value={formData["principal-address"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="nominee-name">Enter Nominee Name:</label>
                                <input placeholder="eg. Ankit Raj" type="text" name="nominee-name" value={formData["nominee-name"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="nominee-fathers-name">Enter Nominee Fathers Name:</label>
                                <input placeholder="eg. Mahesh Raj" type="text" name="nominee-fathers-name" value={formData["nominee-fathers-name"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="nominee-age">Enter Nominee Age:</label>
                                <input placeholder="eg. 35" type="text" name="nominee-age" value={formData["nominee-age"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="nominee-address">Enter Nominee Address:</label>
                                <input placeholder="eg. 22, Park Street, Kolkata, West Bengal, India" type="text" name="nominee-address" value={formData["nominee-address"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="bank-name">Enter Bank Name:</label>
                                <input placeholder="eg. State Bank of India (SBI)" type="text" name="bank-name" value={formData["bank-name"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="day-of-agreement">Enter Day Of Agreement:</label>
                                <input placeholder="eg. 25" type="text" name="day-of-agreement" value={formData["day-of-agreement"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="year-of-agreement">Enter Year Of Agreement:</label>
                                <input placeholder="eg. 2025" type="text" name="year-of-agreement" value={formData["year-of-agreement"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="place-of-agreement">Enter Place Of Agreement:</label>
                                <input placeholder="eg. New Delhi, India" type="text" name="place-of-agreement" value={formData["place-of-agreement"]} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="select-language">Select Language To Generate Summary:</label>
                                <select name="select-language" id="select-language" value={formData["select-language"]} onChange={handleChange} >
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

export default PowerOfAttorney;