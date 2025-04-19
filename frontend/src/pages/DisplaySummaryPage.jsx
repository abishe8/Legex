import "../css/displaysummarypage.css"
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DisplaySummaryPage() {
   const location = useLocation();
   const { wordFilePath, summaryFilePath, pdfFilePath,roadmapFolderPath } = location.state || {};
   const navigate = useNavigate();
   const handleEdit = () => {
    navigate(`/${documentType}`, { state: { formData } }); // Navigate back to the form page with formData
};
   const [summary, setSummary] = useState("");
   const [roadmapHtml, setRoadmapHtml] = useState("");

   useEffect(() => {
      // Fetch the summary content
      const fetchSummary = async () => {
          try {
              const response = await axios.get(summaryFilePath);
              setSummary(response.data);
          } catch (error) {
              console.error("Error fetching summary:", error);
          }
      };

      if (summaryFilePath) {
          fetchSummary();
      }
  }, [summaryFilePath]);

  useEffect(() => {
   // Fetch the roadmap HTML
   const fetchRoadmap = async () => {
       try {
           const response = await axios.get(`${roadmapFolderPath}/rd.html`);
           setRoadmapHtml(response.data); // Set the HTML content
       } catch (error) {
           console.error("Error fetching roadmap:", error);
       }
   };

   if (roadmapFolderPath) {
       fetchRoadmap();
   }
}, [roadmapFolderPath]);

   return (
      <div className="display-summary-page">
         <div className="container">
            <div className="display-summary-wrapper">
               <h2>Generated Document</h2>
               <div className="display-document">
               {pdfFilePath ? (
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                                <Viewer fileUrl={pdfFilePath} />
                            </Worker>
                        ) : (
                            <p>PDF preview not available</p>
                        )}
               </div>
               <button className="download-btn">
                        <a href={wordFilePath} download="GeneratedDocument.docx">
                            Download Word Document
                        </a>
               </button>
               <button className="download-btn">
                        <a href={pdfFilePath} download="GeneratedDocument.pdf">
                          Download PDF
                        </a>
               </button>
               <button className="edit-btn" onClick={handleEdit}>
                        Edit
                    </button>
               <div className="summary-english">
                  <h3>Summary in English</h3>
                  <p>{summary || "Loading summary..."}</p>
               </div>
               <div className="summary-hindi">
                  <h3>Summary in Hindi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni magnam natus in expedita quis quaerat illo tenetur porro vero id! Veritatis doloremque nostrum tempora qui. Id quidem praesentium eum, vero dolore voluptatem omnis dolor reiciendis minima quas inventore doloribus temporibus, odit mollitia optio, tenetur alias nobis culpa veritatis. Facilis porro doloribus modi iste odit ipsa recusandae nam mollitia eligendi inventore.</p>
               </div>

               <div className="procedure">
                  <h3>Rental Agreement Procedure</h3>
                  <div dangerouslySetInnerHTML={{ __html: roadmapHtml }} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default DisplaySummaryPage;
