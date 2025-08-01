import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ReleaseDeed() {
   const navigate = useNavigate();
   const location = useLocation();
   const [isSubmitting, setIsSubmitting] = useState(false);

   // Retrieve pre-filled form data from location.state
   const preFilledData = location.state?.formData;

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

   function validateReleaseDeedFormData(formData) {
      const labels = {
         "agreement-day": "Agreement Day",
         "agreement-month": "Agreement Month",
         "agreement-year": "Agreement Year",
         "releaser-name": "Releaser Name",
         "releasers-fathers-name": "Releaser’s Father’s Name",
         "releasers-address": "Releaser’s Address",
         "releasee-name": "Releasee Name",
         "releasees-fathers-name": "Releasee’s Father’s Name",
         "releasees-address": "Releasee’s Address",
         "property-size": "Property Size",
         "property-door-number": "Property Door Number",
         "property-location": "Property Location",
         "survey-number": "Survey Number",
         "taluk-name": "Taluk Name",
         "district-name": "District Name",
         "document-number": "Document Number",
         "registration-file-page-start": "Registration File Page Start",
         "registration-file-page-end": "Registration File Page End",
         "sub-registrar-office-location": "Sub-Registrar Office Location",
         "rights-granted": "Rights Granted",
         "select-language": "Language",
      };

      const errors = {};

      Object.entries(formData).forEach(([key, raw]) => {
         const val = raw.trim();

         // 1) Required check
         if (!val) {
            errors[key] = `${labels[key] || key} is required`;
            return;
         }

      });

      return {
         isValid: Object.keys(errors).length === 0,
         errors,
      };
   }

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

      const { isValid, errors: newErrors } = validateReleaseDeedFormData(formData);
      if (!isValid) {
         // show only the first error as a toast:
         toast.error(Object.values(newErrors)[0]);
         return;
      }

      setIsSubmitting(true);
      try {
         console.log("entered submit function");
         const response = await axios.post(
            "http://localhost:3000/api/documents/generate",
            {
               documentType: "release",
               data: formData,
            }
         );

         console.log("Document generated:", response.data);
         alert("Document generated successfully!");

         navigate("/display-summary", {
            state: {
               wordFilePath: response.data.wordFilePath,
               summaryFilePath: response.data.summaryFilePath,
               pdfFilePath: response.data.pdfFilePath,
               roadmapFolderPath: response.data.roadmapFolderPath,
               translatedSummaryFilePath:
                  response.data.translatedSummaryFilePath,
               formData,
               documentType: "release-deed",
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
               <h2>Enter The Details for Release Deed</h2>
               <form className="agreement-form" onSubmit={handleSubmit}>
                  <div className="form-inputs">
                     <div>
                        <label htmlFor="agreement-day">
                           Enter Agreement Day:
                        </label>
                        <input
                           placeholder="eg.25"
                           type="date"
                           name="agreement-day"
                           value={formData["agreement-day"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="agreement-month">
                           Enter Agreement Month:
                        </label>
                        <input
                           placeholder="eg.January"
                           type="date"
                           name="agreement-month"
                           value={formData["agreement-month"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="agreement-year">
                           Enter Agreement Year:
                        </label>
                        <input
                           placeholder="eg.2025"
                           type="date"
                           name="agreement-year"
                           value={formData["agreement-year"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="releaser-name">
                           Enter Releaser Name:
                        </label>
                        <input
                           placeholder="eg. Rajesh Kumar"
                           type="text"
                           name="releaser-name"
                           value={formData["releaser-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="releasers-fathers-name">
                           Enter Releaser's Father's Name:
                        </label>
                        <input
                           placeholder="eg. Mahesh Kumar"
                           type="text"
                           name="releasers-fathers-name"
                           value={formData["releasers-fathers-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="releasers-address">
                           Enter Releaser's Address:
                        </label>
                        <input
                           placeholder="eg. 12, MG Road, Chennai, Tamil Nadu, India"
                           type="text"
                           name="releasers-address"
                           value={formData["releasers-address"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="releasee-name">
                           Enter Releasee Name:
                        </label>
                        <input
                           placeholder="eg. Ankit Raj"
                           type="text"
                           name="releasee-name"
                           value={formData["releasee-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="releasees-fathers-name">
                           Enter Releasee's Father's Name:
                        </label>
                        <input
                           placeholder="eg. Suresh Raj"
                           type="text"
                           name="releasees-fathers-name"
                           value={formData["releasees-fathers-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="releasees-address">
                           Enter Releasee's Address:
                        </label>
                        <input
                           placeholder="eg. 22, Park Street, Kolkata, West Bengal, India"
                           type="text"
                           name="releasees-address"
                           value={formData["releasees-address"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="property-size">
                           Enter Property Size:
                        </label>
                        <input
                           placeholder="eg. 1200 sq. ft."
                           type="text"
                           name="property-size"
                           value={formData["property-size"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="property-door-number">
                           Enter Property Door Number:
                        </label>
                        <input
                           placeholder="eg. 21B/3"
                           type="text"
                           name="property-door-number"
                           value={formData["property-door-number"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="property-location">
                           Enter Property Location:
                        </label>
                        <input
                           placeholder="eg. Chennai, Tamil Nadu, PIN - 600028"
                           type="text"
                           name="property-location"
                           value={formData["property-location"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="survey-number">
                           Enter Survey Number:
                        </label>
                        <input
                           placeholder="eg. 235/B"
                           type="text"
                           name="survey-number"
                           value={formData["survey-number"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="taluk-name">Enter Taluk Name:</label>
                        <input
                           placeholder="eg. Tambaram Taluk"
                           type="text"
                           name="taluk-name"
                           value={formData["taluk-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="district-name">
                           Enter District Name:
                        </label>
                        <input
                           placeholder="eg. Chennai District"
                           type="text"
                           name="district-name"
                           value={formData["district-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="document-number">
                           Enter Document Number:
                        </label>
                        <input
                           placeholder="eg. 4567/2024"
                           type="text"
                           name="document-number"
                           value={formData["document-number"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="registration-file-page-start">
                           Enter Registration File Page Start:
                        </label>
                        <input
                           placeholder="eg. Page 12"
                           type="text"
                           name="registration-file-page-start"
                           value={formData["registration-file-page-start"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="registration-file-page-end">
                           Enter Registration File Page End:
                        </label>
                        <input
                           placeholder="eg. Page 15"
                           type="text"
                           name="registration-file-page-end"
                           value={formData["registration-file-page-end"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="sub-registrar-office-location">
                           Enter Sub-Registrar Office Location:
                        </label>
                        <input
                           placeholder="eg. SRO, Chennai South"
                           type="text"
                           name="sub-registrar-office-location"
                           value={formData["sub-registrar-office-location"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="rights-granted">
                           Enter Rights Granted:
                        </label>
                        <input
                           placeholder="eg. 600 sq.ft."
                           type="text"
                           name="rights-granted"
                           value={formData["rights-granted"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="select-language">
                           Select Language To Generate Summary:
                        </label>
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
                           <option value="Bengali">Bengali</option>
                        </select>
                     </div>
                  </div>
                  <button
                     className="submit-btn"
                     type="submit"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default ReleaseDeed;
