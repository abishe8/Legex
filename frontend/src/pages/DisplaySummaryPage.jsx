import "../css/displaysummarypage.css"
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Chatbot from "../components/chatbot";

function DisplaySummaryPage() {
   const location = useLocation();
   const { wordFilePath, summaryFilePath, pdfFilePath,roadmapFolderPath,formData,documentType,translatedSummaryFilePath} = location.state || {};
   const navigate = useNavigate();
   const handleEdit = () => {
    navigate(`/${documentType}`, { state: { formData } }); // Navigate back to the form page with formData
};
   const [summary, setSummary] = useState("");
   const [transsummary, settransSummary] = useState("");
   const [roadmapHtml, setRoadmapHtml] = useState("");
   
   // Generate URLs
   let pdfUrl = "";
   if (pdfFilePath?.includes("filled_documents")) {
      const relativePath = pdfFilePath.split("filled_documents")[1].replace(/\\/g, "/");
      pdfUrl = `http://localhost:3000/filled_documents${relativePath}`;
   }

   let wordUrl = "";
   if (wordFilePath?.includes("filled_documents")) {
      const wordRelativePath = wordFilePath.split("filled_documents")[1].replace(/\\/g, "/");
      wordUrl = `http://localhost:3000/filled_documents${wordRelativePath}`;
   }

   let summaryUrl = "";
   if (summaryFilePath?.includes("filled_summary")) {
      const summaryRelativePath = summaryFilePath.split("filled_summary")[1].replace(/\\/g, "/");
      summaryUrl = `http://localhost:3000/filled_summary${summaryRelativePath}`;
   }

   let translatedsummaryUrl = "";
   if (translatedSummaryFilePath?.includes("filled_summary")) {
      const translatedsummaryRelativePath = translatedSummaryFilePath.split("filled_summary")[1].replace(/\\/g, "/");
      translatedsummaryUrl = `http://localhost:3000/filled_summary${translatedsummaryRelativePath}`;
   }

   let roadmapUrl = "";
   if (roadmapFolderPath?.includes("Roadmap")) {
      const roadmapRelativePath = roadmapFolderPath.split("Roadmap")[1].replace(/\\/g, "/");
      roadmapUrl = `http://localhost:3000/Roadmap${roadmapRelativePath}/rd.html`;
   }
   // Fetch summary content
   useEffect(() => {
      const fetchSummary = async () => {
         try {
            console.log("Fetching summary from:", summaryUrl);
            const response = await axios.get(summaryUrl);
            setSummary(response.data);
         } catch (error) {
            console.error("Error fetching summary:", error);
         }
      };

      if (summaryUrl) {
         fetchSummary();
      }
   }, [summaryUrl]);

      // Fetch summary content
      useEffect(() => {
         const fetchtransSummary = async () => {
            try {
               console.log("Fetching summary from:", translatedsummaryUrl);
               const response = await axios.get(translatedsummaryUrl);
               settransSummary(response.data);
            } catch (error) {
               console.error("Error fetching summary:", error);
            }
         };
   
         if (summaryUrl) {
            fetchtransSummary();
         }
      }, [translatedsummaryUrl]);

   // Fetch roadmap HTML
   useEffect(() => {
      const fetchRoadmap = async () => {
         try {
            const response = await axios.get(roadmapUrl);
            setRoadmapHtml(response.data); // Set the HTML content
         } catch (error) {
            console.error("Error fetching roadmap:", error);
         }
      };

      if (roadmapUrl) {
         fetchRoadmap();
      }
   }, [roadmapUrl]);

   return (
      <div className="display-summary-page">
         <div className="container">
            <div className="display-summary-wrapper">
               <h2>Generated Document</h2>
               <div className="display-document">
               {pdfFilePath ? (
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                <Viewer fileUrl={pdfUrl} />
                            </Worker>
                        ) : (
                            <p>PDF preview not available</p>
                        )}
               </div>
               <button className="edit-btn" onClick={handleEdit}>
                    Edit
                </button>
               <div className="button-group">
                <button className="download-btn">
                    <a href={wordUrl} download="GeneratedDocument.docx">Download Word File</a>
                </button>

                <button className="download-btn">
                    <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">Download PDF</a>
                </button>

                </div>
               <div className="summary-english">
                  <h3>Summary</h3>
                  <p>{summary || "Loading summary..."}</p>
                  <br/>
                  <p>{transsummary || "Loading summary..."}</p>
               </div>

               {/* <div className="summary-english">
                  <h3>Summary</h3>
                  <p>{transsummary || "Loading summary..."}</p>
               </div> */}
               {pdfUrl && <Chatbot pdfUrl={pdfUrl} />}
               <div className="procedure">
                  <iframe
                        src={roadmapUrl}
                        title="Roadmap"
                        width="100%"
                        height="500px"
                        style={{ border: "none" }}
                    />
               </div>
            </div>
         </div>
      </div>
   );
}

export default DisplaySummaryPage;
