import { exec } from "child_process";
import path from "path";

export const generateDocument = async (req, res) => {
    try {
        const { documentType, data } = req.body; // Get document type and form data from the frontend

        // Map document types to their corresponding Python scripts
        const scriptMap = {
            rental: "rental.py",
            sale: "sale_agreement.py",
            trust: "trustdeed.py",
            vehicle: "vehicle_sale_agreement.py",
            grantcs:"Agreement_to_grant_copyright_in_computer_software.py",
            mortage:"deed_of_simple_mortgage.py",
            employment:"Employment_agreement.py",
            lockout:"lockoutagreement.py",
            powerofattorney:"power_of_attorney.py",
            release:"release_deed.py",
            // Add other mappings here
        };

        const scriptName = scriptMap[documentType.toLowerCase()];
        if (!scriptName) {
            return res.status(400).json({ error: "Invalid document type" });
        }

        // Path to the Python script
        const scriptPath = path.resolve("scripts", scriptName);

        // Execute the Python script and pass the form data as JSON
        const command = `python "${scriptPath}" '${JSON.stringify(data)}'`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return res.status(500).json({ error: "Failed to generate document" });
            }
            if (stderr) {
                console.error(`Script error: ${stderr}`);
                return res.status(500).json({ error: "Error in document generation script" });
            }

            // Parse the output from the Python script
            const output = JSON.parse(stdout);
            res.status(200).json({
                message: "Document generated successfully",
                wordFilePath: output.filePath,
                summaryFilePath: output.summaryFilePath,
                pdfFilePath: output.pdfFilePath || null, // Optional if PDF is generated
                roadmapFolderPath: output.roadmapFolderPath,
            });
        });
    } catch (error) {
        console.error("Error generating document:", error);
        res.status(500).json({ error: "Failed to generate document" });
    }
};

// export const getDocx = (req, res) => {
//     const docxPath = path.resolve("filled_documents", "Filled_document_agreement_copyright.docx");
//     if (!fs.existsSync(docxPath)) {
//         return res.status(404).json({ error: "Word document not found" });
//     }
//     res.sendFile(docxPath);
// };

// // Serve the generated PDF document
// export const getPdf = (req, res) => {
//     const pdfPath = path.resolve("filled_documents", "Filled_document_agreement_copyright.pdf");
//     if (!fs.existsSync(pdfPath)) {
//         return res.status(404).json({ error: "PDF document not found" });
//     }
//     res.sendFile(pdfPath);
// };

// // Serve the generated summary
// export const getSummary = (req, res) => {
//     const summaryPath = path.resolve("filled_summary", "Filled_document_agreement_copyright.txt");
//     if (!fs.existsSync(summaryPath)) {
//         return res.status(404).json({ error: "Summary not found" });
//     }
//     const summaryContent = fs.readFileSync(summaryPath, "utf-8");
//     res.json({ summary: summaryContent });
// };

