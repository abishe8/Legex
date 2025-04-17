import { useState } from "react";
import axios from "axios";

function ReleaseDeed() {
    const [formData, setFormData] = useState({
        "agreement-day": "",
        "agreement-month": "",
        "agreement-year": "",
        "releaser-name": "",
        "releasers-fathers-name": "",
        "releasers-address": "",
        "releasee-name": "",
        "releasees-fathers-name": "",
        "releasees-address": "",
        "property-size": "",
        "property-door-number": "",
        "property-location": "",
        "survey-number": "",
        "taluk-name": "",
        "district-name": "",
        "document-number": "",
        "registration-file-page-start": "",
        "registration-file-page-end": "",
        "sub-registrar-office-location": "",
        "rights-granted": "",
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
                documentType: "release", // Specify the document type
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
                    <h2>Enter The Details for Release Deed</h2>
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
                                <label htmlFor="releaser-name ">Enter Releaser Name:</label>
                                <input placeholder="eg. Rajesh Kumar" type="text" name="releaser-name "/>
                            </div>
                            <div>
                                <label htmlFor="releasers-fathers-name ">Enter Releaser's Fathers Name:</label>
                                <input placeholder="eg. Mahesh Kumar" type="text" name="releasers-fathers-name "/>
                            </div>
                            <div>
                                <label htmlFor="releasers-address ">Enter Releaser's Address:</label>
                                <input placeholder="eg. 12, MG Road, Chennai, Tamil Nadu, India" type="text" name="releasers-address "/>
                            </div>
                            <div>
                                <label htmlFor="releasee-name ">Enter Releasee Name:</label>
                                <input placeholder="eg. Ankit Raj" type="text" name="releasee-name "/>
                            </div>
                            <div>
                                <label htmlFor="releasees-fathers-name ">Enter Releasee's Fathers Name:</label>
                                <input placeholder="eg. Suresh Raj" type="text" name="releasees-fathers-name "/>
                            </div>
                            <div>
                                <label htmlFor="releasees-address ">Enter Releasee's Address:</label>
                                <input placeholder="eg. 22, Park Street, Kolkata, West Bengal, India" type="text" name="releasees-address "/>
                            </div>
                            <div>
                                <label htmlFor="property-size">Enter Property Size:</label>
                                <input placeholder="eg. 1200 sq. ft." type="text" name="property-size"/>
                            </div>
                            <div>
                                <label htmlFor="property-door-number">Enter Property Door Number:</label>
                                <input placeholder="eg. 21B/3" type="text" name="property-door-number"/>
                            </div>
                            <div>
                                <label htmlFor="property-location">Enter Property Location:</label>
                                <input placeholder="eg. Chennai, Tamil Nadu, PIN - 600028" type="text" name="property-location"/>
                            </div>
                            <div>
                                <label htmlFor="survey-number">Enter Survey Number:</label>
                                <input placeholder="eg. 235/B" type="text" name="survey-number"/>
                            </div>
                            <div>
                                <label htmlFor="taluk-name">Enter Taluk Name:</label>
                                <input placeholder="eg. Tambaram Taluk" type="text" name="taluk-name"/>
                            </div>
                            <div>
                                <label htmlFor="district-name">Enter District Name:</label>
                                <input placeholder="eg. Chennai District" type="text" name="district-name"/>
                            </div>
                            <div>
                                <label htmlFor="document-number">Enter Document Number:</label>
                                <input placeholder="eg. 4567/2024" type="text" name="document-number"/>
                            </div>
                            <div>
                                <label htmlFor="registration-file-page-start">Enter Registration File Page Start:</label>
                                <input placeholder="eg. Page 12" type="text" name="registration-file-page-start"/>
                            </div>
                            <div>
                                <label htmlFor="registration-file-page-end">Enter Registration File Page End:</label>
                                <input placeholder="eg. Page 15" type="text" name="registration-file-page-end"/>
                            </div>
                            <div>
                                <label htmlFor="sub-registrar-office-location">Enter Sub-Registrar Office Location:</label>
                                <input placeholder="eg. SRO, Chennai South" type="text" name="sub-registrar-office-location"/>
                            </div>
                            <div>
                                <label htmlFor="rights-granted">Enter Rights Granted:</label>
                                <input placeholder="eg. 600 sq.ft." type="text" name="rights-granted"/>
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

export default ReleaseDeed;