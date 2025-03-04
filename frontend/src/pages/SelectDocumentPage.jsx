import { Link } from "react-router-dom";
import { useState } from "react";

import "../css/selectdocumentpage.css";

function SelectDocumentPage() {

   const [selectedDoc, setSelectedDoc] = useState("");

   const handleSelection = (event) => {
      setSelectedDoc(event.target.id);
   };

   return (
      <div className="doc-type-page">
         <div className="container">
            <div className="doc-type-page-wrapper">
               <h2>Select the type of legal document you want to generate</h2>
               <div className="doc-types">
                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="motor-vehicle-sale-agreement"
                        value="motor vehicle sale agreement"
                        onChange={handleSelection}
                     />
                     <label htmlFor="motor-vehicle-sale-agreement">
                        Motor Vehicle Sale Agreement
                     </label>
                  </div>


                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="rental-agreement"
                        value="rental-agreement"
                        onChange={handleSelection}
                     />
                     <label htmlFor="rental-agreement">Rental Agreement</label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="release-deed"
                        value="release-deed"
                        onChange={handleSelection}
                     />
                     <label htmlFor="release-deed">Release Deed</label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="agreement-to-grant-copyright-in-computer-software"
                        value="agreement-to-grant-copyright-in-computer-software"
                        onChange={handleSelection}
                     />
                     <label htmlFor="agreement-to-grant-copyright-in-computer-software">
                        Agreement To Grant Copyright in Computer Software
                     </label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="lockout-agreement"
                        value="lockout agreement"
                        onChange={handleSelection}
                     />
                     <label htmlFor="lockout-agreement">Lockout Agreement</label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="power-of-attorney"
                        value="power of attorney"
                        onChange={handleSelection}
                     />
                     <label htmlFor="power-of-attorney">Power of Attorney</label>
                  </div>


                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="employment-agreement"
                        value="employment agreement"
                        onChange={handleSelection}
                     />
                     <label htmlFor="employment-agreement">
                        Employment Agreement
                     </label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="trust-deed"
                        value="trust deed"
                        onChange={handleSelection}
                     />
                     <label htmlFor="trust-deed">Trust Deed</label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="sale-agreement"
                        value="sale agreement"
                        onChange={handleSelection}
                     />
                     <label htmlFor="sale-agreement">Sale Agreement</label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        name="doc-type"
                        id="mortgage-agreement"
                        value="mortgage agreement"
                        onChange={handleSelection}
                     />
                     <label htmlFor="mortgage-agreement">Mortgage Agreement</label>
                  </div>

               </div>
               <Link to={selectedDoc ? `/${selectedDoc}` : "#"} className="continue-btn">
                  Continue
               </Link>
            </div>
         </div>
      </div>
   );
}

export default SelectDocumentPage;
