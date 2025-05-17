import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function TrustDeed() {
   const navigate = useNavigate();
   const location = useLocation();
   const [isSubmitting, setIsSubmitting] = useState(false);
   // Retrieve pre-filled form data from location.state
   const preFilledData = location.state?.formData;
   const [formData, setFormData] = useState({
      "place-of-agreement": "",
      "agreement-day": "",
      "agreement-year": "",
      "trustors-name": "",
      "trustors-fathers-name": "",
      "trustors-address": "",
      "trust-fund-amount": "",
      "trust-fund-amount-in-words": "",
      "advance-payment-amount": "",
      "trust-address": "",
      "trust-authorities-names": "",
      "trust-objectives": "",
      "trust-functions": "",
      "trust-occupations": "",
      "conditions-of-trustee-removal": "",
      "appointment-of-new-trustees": "",
      "trust-administration-details": "",
      "trust-meeting-schedule": "",
      "trust-resolutions-decision-making": "",
      "trust-legal-rights": "",
      "trust-bank-account-details": "",
      "trust-indemnity-conditions": "",
      "trust-activities-operations": "",
      "trust-dissolution-procedure": "",
      "trust-fund distribution-proceedings": "",
      "select-language": "English",
   });

   function validateTrustDeedData(formData) {
      const labels = {
         "place-of-agreement": "Place of Agreement",
         "agreement-day": "Agreement Day",
         "agreement-year": "Agreement Year",
         "trustors-name": "Trustor's Name",
         "trustors-fathers-name": "Trustor's Father's Name",
         "trustors-address": "Trustor's Address",
         "trust-fund-amount": "Trust Fund Amount",
         "trust-fund-amount-in-words": "Trust Fund Amount (in words)",
         "advance-payment-amount": "Advance Payment Amount",
         "trust-address": "Trust Address",
         "trust-authorities-names": "Trust Authorities' Names",
         "trust-objectives": "Trust Objectives",
         "trust-functions": "Trust Functions",
         "trust-occupations": "Trust Occupations",
         "conditions-of-trustee-removal": "Conditions of Trustee Removal",
         "appointment-of-new-trustees": "Appointment of New Trustees",
         "trust-administration-details": "Trust Administration Details",
         "trust-meeting-schedule": "Trust Meeting Schedule",
         "trust-resolutions-decision-making":
            "Trust Resolutions & Decision‑Making",
         "trust-legal-rights": "Trust Legal Rights",
         "trust-bank-account-details": "Trust Bank Account Details",
         "trust-indemnity-conditions": "Trust Indemnity Conditions",
         "trust-activities-operations": "Trust Activities & Operations",
         "trust-dissolution-procedure": "Trust Dissolution Procedure",
         "trust-fund distribution-proceedings":
            "Trust Fund Distribution & Proceedings",
         "select-language": "Language",
      };

      const errors = {};

      Object.entries(formData).forEach(([key, raw]) => {
         const val = raw.trim();

         // 1) Required check
         if (!val) {
            errors[key] = `${labels[key]} is required`;
            return;
         }

         // 2) Field‑specific validations
         switch (key) {

            case "trust-fund-amount":
            case "advance-payment-amount":
               if (!/\d/.test(val)) {
                  errors[key] = `${labels[key]} must include a number`;
               }
               break;

            case "trust-fund-amount-in-words":
            case "causal-leave-in-words": // if reused patterns later
               // could add word‑only check if needed
               break;

            default:
               // all other fields: no extra checks
               break;
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

      const { isValid, errors } = validateTrustDeedData(formData);

      if (!isValid) {
         // show first error message
         toast.error(Object.values(errors)[0]);
         return;
      }

      setIsSubmitting(true);
      try {
         console.log("entered submit function");
         const response = await axios.post(
            "http://localhost:3000/api/documents/generate",
            {
               documentType: "trust",
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
               documentType: "trust-deed",
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
               <h2>Enter The Details for Trust Deed</h2>
               <form className="agreement-form" onSubmit={handleSubmit}>
                  <div className="form-inputs">
                     <div>
                        <label htmlFor="agreement-day">
                           Enter Agreement Day:
                        </label>
                        <input
                           placeholder="eg.25th May"
                           type="date"
                           name="agreement-day"
                           value={formData["agreement-day"]}
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
                        <label htmlFor="place-of-agreement">
                           Enter Place Of Agreement:
                        </label>
                        <input
                           placeholder="eg. Chennai, Tamil Nadu"
                           type="text"
                           name="place-of-agreement"
                           value={formData["place-of-agreement"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trustors-name">
                           Enter Trustor's Name:
                        </label>
                        <input
                           placeholder="eg. Ramesh Kumar"
                           type="text"
                           name="trustors-name"
                           value={formData["trustors-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trustors-fathers-name">
                           Enter Trustor's Fathers Name:
                        </label>
                        <input
                           placeholder="eg. Suresh Kumar"
                           type="text"
                           name="trustors-fathers-name"
                           value={formData["trustors-fathers-name"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trustors-address">
                           Enter Trustor's Address:
                        </label>
                        <input
                           placeholder="eg. 12, Gandhi Street, Chennai, Tamil Nadu, India"
                           type="text"
                           name="trustors-address"
                           value={formData["trustors-address"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-fund-amount">
                           Enter Trust Fund Amount:
                        </label>
                        <input
                           placeholder="eg. ₹10,00,000/-"
                           type="text"
                           name="trust-fund-amount"
                           value={formData["trust-fund-amount"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-fund-amount-in-words">
                           Enter Trust Fund Amount in Words:
                        </label>
                        <input
                           placeholder="eg. Ten Lakh Rupees Only"
                           type="text"
                           name="trust-fund-amount-in-words"
                           value={formData["trust-fund-amount-in-words"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="advance-payment-amount">
                           Enter Advance Payment Amount:
                        </label>
                        <input
                           placeholder="eg. ₹10,00,000/-"
                           type="text"
                           name="advance-payment-amount"
                           value={formData["advance-payment-amount"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-address">
                           Enter Trust Address:
                        </label>
                        <input
                           placeholder="eg. 45, MG Road, Bangalore, Karnataka, India"
                           type="text"
                           name="trust-address"
                           value={formData["trust-address"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-authorities-names">
                           Enter Trust Authoritie's Names:
                        </label>
                        <input
                           placeholder="eg. 1. Anuj Sharma (Chairman), 2. Vinod Sharma (Secretary)"
                           type="text"
                           name="trust-authorities-names"
                           value={formData["trust-authorities-names"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-objectives">
                           Enter Trust Objectives:
                        </label>
                        <input
                           placeholder="eg. Providing free education & healthcare services"
                           type="text"
                           name="trust-objectives"
                           value={formData["trust-objectives"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-functions">
                           Enter Trust Functions:
                        </label>
                        <input
                           placeholder="eg. Fundraising, Administration, Welfare Programs"
                           type="text"
                           name="trust-functions"
                           value={formData["trust-functions"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-occupations">
                           Enter Trust Occupations:
                        </label>
                        <input
                           placeholder="eg. Lawyer, Chartered Accountant, Social Worker"
                           type="text"
                           name="trust-occupations"
                           value={formData["trust-occupations"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="conditions-of-trustee-removal">
                           Enter Conditions of Trustee Removal:
                        </label>
                        <input
                           placeholder="eg. Ethical misconduct, fraud, or non-participation"
                           type="text"
                           name="conditions-of-trustee-removal"
                           value={formData["conditions-of-trustee-removal"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="appointment-of-new-trustees">
                           Enter Appointment of New Trustees:
                        </label>
                        <input
                           placeholder="eg. Elected by majority vote of existing trustees"
                           type="text"
                           name="appointment-of-new-trustees"
                           value={formData["appointment-of-new-trustees"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-administration-details">
                           Enter Trust Administration Details:
                        </label>
                        <input
                           placeholder="eg. Governing rules, legal compliance"
                           type="text"
                           name="trust-administration-details"
                           value={formData["trust-administration-details"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-meeting-schedule">
                           Enter Trust Meeting Schedule:
                        </label>
                        <input
                           placeholder="eg. Quarterly meetings every 3 months"
                           type="text"
                           name="trust-meeting-schedule"
                           value={formData["trust-meeting-schedule"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-resolutions-decision-making">
                           Enter Trust Resolutions & Decision-Making:
                        </label>
                        <input
                           placeholder="eg. Unanimous approval for policy changes"
                           type="text"
                           name="trust-resolutions-decision-making"
                           value={formData["trust-resolutions-decision-making"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-legal-rights">
                           Enter Trust Legal Rights (Lawsuits, Claims):
                        </label>
                        <input
                           placeholder="eg. Can file & defend cases related to trust affairs"
                           type="text"
                           name="trust-legal-rights"
                           value={formData["trust-legal-rights"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-bank-account-details">
                           Enter Trust Bank Account Details:
                        </label>
                        <input
                           placeholder="eg. SBI Trust Account No: 123456789"
                           type="text"
                           name="trust-bank-account-details"
                           value={formData["trust-bank-account-details"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-indemnity-conditions">
                           Enter Trust Indemnity Conditions:
                        </label>
                        <input
                           placeholder="eg. Liability protection for trustees"
                           type="text"
                           name="trust-indemnity-conditions"
                           value={formData["trust-indemnity-conditions"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-activities-operations">
                           Enter Trust Activities & Operations:
                        </label>
                        <input
                           placeholder="eg. Organizing charity events & free medical camps"
                           type="text"
                           name="trust-activities-operations"
                           value={formData["trust-activities-operations"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-dissolution-procedure">
                           Enter Trust Dissolution Procedure:
                        </label>
                        <input
                           placeholder="eg. Requires 75% trustee approval, assets to charity"
                           type="text"
                           name="trust-dissolution-procedure"
                           value={formData["trust-dissolution-procedure"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="trust-fund distribution-proceedings">
                           Enter Trust Fund Distribution & Proceedings:
                        </label>
                        <input
                           placeholder="eg. Assets to be allocated as per dissolution terms"
                           type="text"
                           name="trust-fund distribution-proceedings"
                           value={
                              formData["trust-fund distribution-proceedings"]
                           }
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

export default TrustDeed;
