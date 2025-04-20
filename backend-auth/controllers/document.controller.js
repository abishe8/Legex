// import { exec } from "child_process";
import { spawn } from "child_process";
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

        const python = spawn("python", [scriptPath]);

        let output = "";
        let errorOutput = "";

        // Collect stdout
        python.stdout.on("data", (dataChunk) => {
            output += dataChunk.toString();
            console.log("Python stdout:", dataChunk.toString());  
        });

        // Collect stderr
        python.stderr.on("data", (dataChunk) => {
            errorOutput += dataChunk.toString();
            console.error("Python stderr:", dataChunk.toString());  
        });

// Handle process exit
python.on("close", (code) => {
    // if (code !== 0) {
    //     console.log("erorrrrrrrrr");
    //     console.log(code);
    //     console.error(`Python script error: ${errorOutput}`);
    //     return res.status(500).json({ error: "Error in document generation script" });
    // }

    try {
        const result = JSON.parse(output);
        console.log("result:",result);
        res.status(200).json({
            message: "Document generated successfully",
            wordFilePath: result.wordFilePath,
            summaryFilePath: result.summaryFilePath,
            pdfFilePath: result.pdfFilePath || null,
            roadmapFolderPath: result.roadmapFolderPath,
            translatedSummaryFilePath: result.translatedSummaryFilePath,
        });
    } catch (err) {
        console.error("Failed to parse JSON:", err);
        res.status(500).json({ error: "Invalid response from Python script" });
    }
});

// Send data via stdin
python.stdin.write(JSON.stringify(data));
python.stdin.end();

    } catch (error) {
        console.error("Error generating document:", error);
        res.status(500).json({ error: "Failed to generate document" });
    }
};
