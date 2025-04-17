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
        'PRINCIPALNAME': {'text': input_data.get("principal-name", ""), 'font_size': 12, 'bold': True},
        'PRINCIPALAGE': {'text': input_data.get("principal-age", ""), 'font_size': 12, 'bold': True},
        'PRINCIPALADDRESS': {'text': input_data.get("principal-address", ""), 'font_size': 12, 'bold': True},
        'NOMINEENAME': {'text': input_data.get("nominee-name", ""), 'font_size': 12, 'bold': True},
        'NOMINEEFATHER': {'text': input_data.get("nominee-fathers-name", ""), 'font_size': 12, 'bold': True},
        'NOMINEEAGE': {'text': input_data.get("nominee-age", ""), 'font_size': 12, 'bold': True},
        'NOMINEEADDRESS': {'text': input_data.get("nominee-address", ""), 'font_size': 12, 'bold': True},
        'BANKNAME': {'text': input_data.get("bank-name", ""), 'font_size': 12, 'bold': True},
        'DAY': {'text': input_data.get("day-of-agreement", ""), 'font_size': 12, 'bold': True},
        'YEAR': {'text': input_data.get("year-of-agreement", ""), 'font_size': 12, 'bold': True},
        'PLACE': {'text': input_data.get("place-of-agreement", ""), 'font_size': 12, 'bold': True},
    }

    # Specify the path to your template file
    template_file_path = r"D:\Legex\Legex\backend-auth\templates\Power of attorney.docx"

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
    output_file_path = r"D:\Legex\Legex\backend-auth\filled_documents\Filled_document_power_of_attorney.docx"
    doc.save(output_file_path)

    # Return the output file path
    print(json.dumps({"filePath": output_file_path}))