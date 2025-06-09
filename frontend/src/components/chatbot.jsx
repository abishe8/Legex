import React, { useState } from "react";
import '../css/Chatbot.css'; // Import your CSS file for styling
function Chatbot({ pdfUrl }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Download the PDF and send as file to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    // Fetch the PDF as a blob
    const pdfBlob = await fetch(pdfUrl).then((res) => res.blob());
    const formData = new FormData();
    formData.append("pdf", pdfBlob, "document.pdf");
    formData.append("question", question);

    // Change the URL to your Flask backend
    const res = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setAnswer(data.answer || data.error);
    setLoading(false);
  };

  return (
    <div className="chatbot-container" style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #eee", borderRadius: "8px" }}>
      <h3>Ask Questions about this Document</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={loading || !question}>
          Ask
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {answer && (
        <div className="answer-box">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default Chatbot;