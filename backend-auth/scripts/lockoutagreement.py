import docx
import os
import sys
import json
from docx2pdf import convert

# Function to replace placeholders with data and apply formatting
def replace_text_and_format(run, text, font_size=12, bold=False, italic=False):
    run.text = text  # Replace the text
    run.font.size = docx.shared.Pt(font_size)  # Set font size
    run.bold = bold  # Set bold
    run.italic = italic  # Set italic

# Function to replace placeholders in a paragraph
def replace_placeholders(paragraph, data):
    for key, value_info in data.items():
        if key in paragraph.text:
            for run in paragraph.runs:
                if key in run.text:
                    replace_text_and_format(
                        run,
                        value_info['text'],
                        font_size=value_info['font_size'],
                        bold=value_info['bold'],
                    )
def replace_placeholders_in_text(text, data):
    for key, value_info in data.items():
        text = text.replace(key, value_info['text'])  # Replace the placeholder with its value
    return text

# Function to convert Word document to PDF
def convert_to_pdf(word_file_path, pdf_file_path):
    convert(word_file_path, pdf_file_path)

if __name__ == "__main__":
    # Read JSON input from stdin
    input_data = json.loads(sys.stdin.read())

    # Map input data to the placeholders in the template
    data = {
        'DAY': {'text': input_data.get("agreement-day", ""), 'font_size': 12, 'bold': True},
        'YEAR': {'text': input_data.get("agreement-year", ""), 'font_size': 12, 'bold': True},
        'PLACE': {'text': input_data.get("agreement-location", ""), 'font_size': 12, 'bold': True},
        'VENDORNAME': {'text': input_data.get("vendors-name", ""), 'font_size': 12, 'bold': True},
        'VENDORFATHER': {'text': input_data.get("vendors-fathers-name", ""), 'font_size': 12, 'bold': True},
        'VENDORAGE': {'text': input_data.get("vendors-age", ""), 'font_size': 12, 'bold': True},
        'VENDORJOB': {'text': input_data.get("vendors-occupation", ""), 'font_size': 12, 'bold': True},
        'VENDORADDRESS': {'text': input_data.get("vendors-address", ""), 'font_size': 12, 'bold': True},
        'VENDEENAME': {'text': input_data.get("vendee-name", ""), 'font_size': 12, 'bold': True},
        'VENDEEFATHER': {'text': input_data.get("vendees-fathers-name", ""), 'font_size': 12, 'bold': True},
        'VENDEEAGE': {'text': input_data.get("vendees-age", ""), 'font_size': 12, 'bold': True},
        'VENDEEJOB': {'text': input_data.get("vendees-occupation", ""), 'font_size': 12, 'bold': True},
        'VENDEEADDRESS': {'text': input_data.get("vendees-address", ""), 'font_size': 12, 'bold': True},
        'PLOTNUMBER': {'text': input_data.get("plot-number", ""), 'font_size': 12, 'bold': True},
        'PLOTYARDS': {'text': input_data.get("plot-area-yards", ""), 'font_size': 12, 'bold': True},
        'PLOTSQMETRES': {'text': input_data.get("plot-area-meters", ""), 'font_size': 12, 'bold': True},
        'SURVEYNOSTART': {'text': input_data.get("survey-number-start", ""), 'font_size': 12, 'bold': True},
        'SURVEYNOEND': {'text': input_data.get("survey-number-end", ""), 'font_size': 12, 'bold': True},
        'PLOTADDRESS': {'text': input_data.get("plot-address", ""), 'font_size': 12, 'bold': True},
        'EARLIEROWNER': {'text': input_data.get("previous-owner-name", ""), 'font_size': 12, 'bold': True},
        'SALEDEEDDOCNO': {'text': input_data.get("sale-deed-document-no", ""), 'font_size': 12, 'bold': True},
        'SALEDEEDDATE': {'text': input_data.get("sale-deed-date", ""), 'font_size': 12, 'bold': True},
        'SALEAMOUNT': {'text': input_data.get("sale-amount", ""), 'font_size': 12, 'bold': True},
        'SALEWORDS': {'text': input_data.get("sale-amount-in-words", ""), 'font_size': 12, 'bold': True},
        'ADVANCEAMOUNT': {'text': input_data.get("advance-amount-paid", ""), 'font_size': 12, 'bold': True},
        'ADVANCEWORDS': {'text': input_data.get("advance-amount-paid-in-words", ""), 'font_size': 12, 'bold': True},
        'BALANCEAMOUNT': {'text': input_data.get("remaining-balance-amount", ""), 'font_size': 12, 'bold': True},
        'BALANCEWORDS': {'text': input_data.get("remaining-balance-amount-in-words", ""), 'font_size': 12, 'bold': True},
        'BALANCEDAYS': {'text': input_data.get("balance-payment-due-days", ""), 'font_size': 12, 'bold': True},
        'PLOTMANDAL': {'text': input_data.get("plot-mandal", ""), 'font_size': 12, 'bold': True},
        'PLOTJURISDICTION': {'text': input_data.get("plot-jurisdiction", ""), 'font_size': 12, 'bold': True},
        'NORTHBOUND': {'text': input_data.get("north-boundary-details", ""), 'font_size': 12, 'bold': True},
        'SOUTHBOUND': {'text': input_data.get("south-boundary-details", ""), 'font_size': 12, 'bold': True},
        'EASTBOUND': {'text': input_data.get("East-boundary-details", ""), 'font_size': 12, 'bold': True},
        'WESTBOUND': {'text': input_data.get("west-boundary-details", ""), 'font_size': 12, 'bold': True},
    }

    # Specify the path to your template file
    template_file_path = r"D:\Legex\Legex\backend-auth\templates\Lockout agreement.docx"
    summary_template_file_path = r"D:\Legex\Legex\backend-auth\summary\Lockout agreement.txt"
    # Check if the summary template file exists
    if not os.path.exists(summary_template_file_path):
        print(json.dumps({"error": f"Summary template file '{summary_template_file_path}' not found."}))
        sys.exit(1)

    # Check if the template file exists
    if not os.path.exists(template_file_path):
        print(json.dumps({"error": f"Template file '{template_file_path}' not found."}))
        sys.exit(1)

    # Load the Word document template
    doc = docx.Document(template_file_path)

    # Replace placeholders in the document
    for paragraph in doc.paragraphs:
        replace_placeholders(paragraph)

    # Save the filled-in document
    output_file_path = r"D:\Legex\Legex\backend-auth\filled_documents\Filled_document_Lockout_Agreement.docx"
    doc.save(output_file_path)

    # Load the summary template file
    summary = open(summary_template_file_path, 'r').read()
    filled_summary = replace_placeholders_in_text(summary, data)

    # Save the summary to a text file
    summary_output_file_path = r"D:\Legex\Legex\backend-auth\filled_summary\Filled_document_Lockout_Agreement.txt"
    with open(summary_output_file_path, 'w') as summary_file:
        summary_file.write(filled_summary)
        
    # Convert the Word document to PDF
    pdf_output_file_path = r"D:\Legex\Legex\backend-auth\filled_documents\Filled_document_Lockout_Agreement.pdf"
    convert_to_pdf(output_file_path, pdf_output_file_path)
    
    #roadmap folder path
    roadmap_folder_path = r"D:\Legex\Legex\backend-auth\Roadmap\lockout agreement"
    # Return the output file path
    print(json.dumps({
            "wordFilePath": output_file_path,
            "summaryFilePath": summary_output_file_path,
            "pdfFilePath":pdf_output_file_path,
            "roadmapFolderPath": roadmap_folder_path,
        }))