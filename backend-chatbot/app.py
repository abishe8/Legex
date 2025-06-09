import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import tempfile
import PyPDF2
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# Set your OpenAI API key as an environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Allowed file extensions
ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text

@app.route('/api/ask', methods=['POST'])
def ask_pdf():
    print("Received request")
    if 'pdf' not in request.files or 'question' not in request.form:
        print("Missing PDF or question")
        return jsonify({"error": "Missing PDF or question"}), 400

    file = request.files['pdf']
    question = request.form['question']

    if not file or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file"}), 400

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf"    ) as tmp:
        file_path = tmp.name  # Save path to use after `with` bl    ock

    file.save(file_path)
    pdf_text = extract_text_from_pdf(file_path)

    try:
        os.unlink(file_path)  # Delete only after it's been used
    except PermissionError:
        print(f"Warning: Could not delete temporary file {file_path}")


    # Use LLM to answer the question
    prompt_template = """
    You are an assistant. Answer the question based only on the following PDF content.
    PDF Content:
    {context}

    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(prompt_template)
    model = ChatOpenAI(
        temperature=0.2,
        model="gpt-4o",
        openai_api_key=OPENAI_API_KEY
    )
    chain = (
        {"context": lambda x: x["context"], "question": lambda x: x["question"]}
        | prompt
        | model
        | StrOutputParser()
    )
    answer = chain.invoke({"context": pdf_text, "question": question})

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)