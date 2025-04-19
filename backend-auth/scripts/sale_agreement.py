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
            'DATE': {'text': input_data.get("agreement-day", ""), 'font_size': 12, 'bold': True},
            'MONTH': {'text': input_data.get("agreement-month", ""), 'font_size': 12, 'bold': True},
            'YEAR': {'text': input_data.get("agreement-year", ""), 'font_size': 12, 'bold': True},
            'PLACE': {'text': input_data.get("place-of-agreement", ""), 'font_size': 12, 'bold': True},
            'SELLERNAME': {'text': input_data.get("sellers-name", ""), 'font_size': 12, 'bold': True},
            'SELLERFATHER': {'text': input_data.get("sellers-fathers-name", ""), 'font_size': 12, 'bold': True},
            'SELLERADDRESS': {'text': input_data.get("sellers-address", ""), 'font_size': 12, 'bold': True},
            'PURCHASERNAME': {'text': input_data.get("purchasers-name", ""), 'font_size': 12, 'bold': True},
            'PURCHASERFATHER': {'text': input_data.get("purchasers-fathers-name", ""), 'font_size': 12, 'bold': True},
            'PURCHASERADDRESS': {'text': input_data.get("purchasers-address", ""), 'font_size': 12, 'bold': True},
            'PAYMENT': {'text': input_data.get("total-sale-price", ""), 'font_size': 12, 'bold': True},
            'WORDSPAY': {'text': input_data.get("total-sale-price-in-words", ""), 'font_size': 12, 'bold': True},
            'AREA': {'text': input_data.get("property-area", ""), 'font_size': 12, 'bold': True},
            'ADVANCEPAYMENT': {'text': input_data.get("advance-payment-amount", ""), 'font_size': 12, 'bold': True},
            'SALEWORDS': {'text': input_data.get("advance-payment-amount-in-words", ""), 'font_size': 12, 'bold': True},
            'CHEQUENO': {'text': input_data.get("cheque-number", ""), 'font_size': 12, 'bold': True},
            'CHEQUEDATE': {'text': input_data.get("cheque-issuance-date", ""), 'font_size': 12, 'bold': True},
            'CHEQUEDRAWNDATE': {'text': input_data.get("cheque-drawn-date", ""), 'font_size': 12, 'bold': True},
            'BALANCE': {'text': input_data.get("remaining-balance-amount", ""), 'font_size': 12, 'bold': True},
            'KAASU': {'text': input_data.get("remaining-balance-amount-in-words", ""), 'font_size': 12, 'bold': True},
            'COMPENSATIONAMT': {'text': input_data.get("compensation-amount-for-breach", ""), 'font_size': 12, 'bold': True},
            'DAYOFAGREEMENT': {'text': input_data.get("day-of-agreement-execution", ""), 'font_size': 12, 'bold': True},
            'PROPERTYADDRESS': {'text': input_data.get("property-address", ""), 'font_size': 12, 'bold': True},
            'NORTHCOVERAGE': {'text': input_data.get("north-boundary-details", ""), 'font_size': 12, 'bold': True},
            'SOUTHCOVERAGE': {'text': input_data.get("south-boundary-details", ""), 'font_size': 12, 'bold': True},
            'WESTCOVERAGE': {'text': input_data.get("west-boundary-details", ""), 'font_size': 12, 'bold': True},
            'EASTCOVERAGE': {'text': input_data.get("east-boundary-details", ""), 'font_size': 12, 'bold': True},
            'SHOPLETNUMBER': {'text': input_data.get("shop-flat-plot-number", ""), 'font_size': 12, 'bold': True},
        }

    # Specify the path to your template file
    template_file_path = r"D:\Legex\Legex\backend-auth\templates\sale agreement.docx"
    summary_template_file_path = r"D:\Legex\Legex\backend-auth\summary\sale agreement.txt"

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
        replace_placeholders(paragraph, data)

    # Save the filled-in document
    output_file_path = r"D:\Legex\Legex\backend-auth\filled_documents\Filled_document_sale_agreement.docx"
    doc.save(output_file_path)

    # Load the summary template file
    summary = open(summary_template_file_path, 'r').read()
    filled_summary = replace_placeholders_in_text(summary, data)

    # Save the summary to a text file
    summary_output_file_path = r"D:\Legex\Legex\backend-auth\filled_summary\Filled_document_sale_agreement.txt"
    with open(summary_output_file_path, 'w') as summary_file:
        summary_file.write(filled_summary)
    
    # Convert the Word document to PDF
    pdf_output_file_path = r"D:\Legex\Legex\backend-auth\filled_documents\Filled_document_sale_agreement.pdf"
    convert_to_pdf(output_file_path, pdf_output_file_path)
    
    #roadmap folder path
    roadmap_folder_path = r"D:\Legex\Legex\backend-auth\Roadmap\Sale Agreement"

    # Return the output file path
    print(json.dumps({
            "wordFilePath": output_file_path,
            "summaryFilePath": summary_output_file_path,
            "pdfFilePath":pdf_output_file_path,
            "roadmapFolderPath": roadmap_folder_path
        }))