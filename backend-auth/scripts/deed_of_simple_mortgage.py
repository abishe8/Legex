import docx
import os
import sys
import json

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

if __name__ == "__main__":
    # Read JSON input from stdin
    input_data = json.loads(sys.stdin.read())

    # Map input data to the placeholders in the template
    data = {
        'DATE': {'text': input_data.get("agreement-day", ""), 'font_size': 12, 'bold': True},
        'MONTH': {'text': input_data.get("agreement-month", ""), 'font_size': 12, 'bold': True},
        'YEAR': {'text': input_data.get("agreement-year", ""), 'font_size': 12, 'bold': True},
        'BORROWER': {'text': input_data.get("borrowers-name", ""), 'font_size': 12, 'bold': True},
        'LOCATIONB': {'text': input_data.get("borrowers-location", ""), 'font_size': 12, 'bold': True},
        'LENDER': {'text': input_data.get("lenders-name", ""), 'font_size': 12, 'bold': True},
        'ADDRESSL': {'text': input_data.get("lenders-address", ""), 'font_size': 12, 'bold': True},
        'LENDAMT': {'text': input_data.get("loan-amount", ""), 'font_size': 12, 'bold': True},
        'DA': {'text': input_data.get("loan-agreement-day", ""), 'font_size': 12, 'bold': True},
        'MON': {'text': input_data.get("loan-agreement-month", ""), 'font_size': 12, 'bold': True},
        'YR': {'text': input_data.get("loan-agreement-year", ""), 'font_size': 12, 'bold': True},
        'INTERESTRATE': {'text': input_data.get("interest-rate", ""), 'font_size': 12, 'bold': True},
        'FIXEDDAY': {'text': input_data.get("fixed-repayment-day", ""), 'font_size': 12, 'bold': True},
    }

    # Specify the path to your template file
    template_file_path = r"D:\Legex\Legex\backend-auth\templates\Deed of Simple Mortgage.docx"

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
    output_file_path = r"D:\Legex\Legex\backend-auth\filled_documents\Filled_deed_of_simple_mortgage.docx"
    doc.save(output_file_path)

    # Return the output file path
    print(json.dumps({"filePath": output_file_path}))