import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      address: "",
      "tenant-name": "",
      "tenant-age": "",
      "tenant-occupation": "",
      amount: "",
      interest: "",
      "from-to-date": "",
      "notice-period": "",
      "select-language": "English",
   });

   function validateRentalFormData(formData) {
      const labels = {
         "agreement-day": "Agreement Day",
         "agreement-month": "Agreement Month",
         "agreement-year": "Agreement Year",
         "owner-name": "Owner Name",
         "owners-father": "Owner’s Father’s Name",
         "owner-age": "Owner Age",
         "owner-occupation": "Owner Occupation",
         address: "Owner Address",
         "tenant-name": "Tenant Name",
         "tenant-age": "Tenant Age",
         "tenant-occupation": "Tenant Occupation",
         amount: "Rental Amount",
         interest: "Security Deposit",
         "from-to-date": "Rental Period",
         "notice-period": "Notice Period",
         "select-language": "Language",
      };

      const errors = {};

      Object.entries(formData).forEach(([key, raw]) => {
         const val = raw.trim();

         // 1) Required
         if (!val) {
            errors[key] = `${labels[key]} is required`;
            return;
         }

         // 2) Field-specific rules
         switch (key) {
            case "agreement-day":
               if (!/^\d+$/.test(val) || +val < 1 || +val > 31) {
                  errors[key] = "Enter a valid day (1–31)";
               }
               break;

            case "agreement-month":
               if (!/^\d+$/.test(val) || +val < 1 || +val > 12) {
                  errors[key] = "Enter a valid month (1–12)";
               }
               break;

            case "agreement-year":
               if (!/^\d{4}$/.test(val) || +val < 1900) {
                  errors[key] = "Enter a valid 4-digit year";
               }
               break;

            case "owner-age":
            case "tenant-age":
               if (!/^\d+$/.test(val) || +val <= 0) {
                  errors[key] = `${labels[key]} is not valid`;
               }
               break;

            case "amount":
            case "interest":
               if (!/\d/.test(val)) {
                  errors[key] = `${labels[key]} must include a number`;
               }
               break;

            case "from-to-date":
               // pattern: DD/MM/YYYY - DD/MM/YYYY
               {
                  const m = val.match(
                     /^(\d{2})\/(\d{2})\/(\d{4})\s*-\s*(\d{2})\/(\d{2})\/(\d{4})$/
                  );
                  if (!m) {
                     errors[key] = "Use format DD/MM/YYYY - DD/MM/YYYY";
                     break;
                  }
                  const [, sd, sm, sy, ed, em, ey] = m.map(Number);
                  const start = new Date(sy, sm - 1, sd);
                  const end = new Date(ey, em - 1, ed);
                  if (Number.isNaN(start) || Number.isNaN(end)) {
                     errors[key] = "Dates must be valid calendar dates";
                  } else if (start >= end) {
                     errors[key] = "Start date must be before end date";
                  }
               }
               break;

            // no further checks
            default:
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

      const { isValid, errors } = validateRentalFormData(formData);
      if (!isValid) {
         // show first error in toast
         toast.error(Object.values(errors)[0]);
         return;
      }

      setIsSubmitting(true);
      try {
         console.log("entered submit function");
         const response = await axios.post(
            "http://localhost:3000/api/documents/generate",
            {
               documentType: "rental",
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
                        <label htmlFor="agreement-day">
                           Enter Agreement Day:
                        </label>
                        <input
                           placeholder="eg. 30"
                           type="text"
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
                           placeholder="eg. 11"
                           type="text"
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
                           placeholder="eg. 2025"
                           type="text"
                           name="agreement-year"
                           value={formData["agreement-year"]}
                           onChange={handleChange}
                        />
                     </div>
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
                        <label htmlFor="owners-father">
                           Owner's Father's Name:
                        </label>
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
                        <label htmlFor="owner-occupation">
                           Enter Owner Occupation:
                        </label>
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
                        <label htmlFor="tenant-occupation">
                           Enter Tenant Occupation:
                        </label>
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
                        <label htmlFor="interest">
                           Enter Security Deposit:
                        </label>
                        <input
                           placeholder="eg. ₹1,00,000/-"
                           type="text"
                           name="interest"
                           value={formData.interest}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="from-to-date">
                           Enter Rental Period Start & End Date:
                        </label>
                        <input
                           placeholder="eg. 01/04/2024 - 31/03/2025"
                           type="text"
                           name="from-to-date"
                           value={formData["from-to-date"]}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="notice-period">
                           Enter Notice Period Duration:
                        </label>
                        <input
                           placeholder="eg. 2 months prior notice required"
                           type="text"
                           name="notice-period"
                           value={formData["notice-period"]}
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

export default RentalAgreement;
