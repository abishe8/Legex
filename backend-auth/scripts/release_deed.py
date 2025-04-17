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
        'DAY': {'text': input_data.get("agreement-day", ""), 'font_size': 12, 'bold': True},
        'MONTH': {'text': input_data.get("agreement-month", ""), 'font_size': 12, 'bold': True},
        'YEAR': {'text': input_data.get("agreement-year", ""), 'font_size': 12, 'bold': True},
        'RELEASERNAME': {'text': input_data.get("releaser-name", ""), 'font_size': 12, 'bold': True},
        'RELEASERFATHER': {'text': input_data.get("releasers-fathers-name", ""), 'font_size': 12, 'bold': True},
        'RELEASERADDRESS': {'text': input_data.get("releasers-address", ""), 'font_size': 12, 'bold': True},
        'RELEASEENAME': {'text': input_data.get("releasee-name", ""), 'font_size': 12, 'bold': True},
        'RELEASEEFATHER': {'text': input_data.get("releasees-fathers-name", ""), 'font_size': 12, 'bold': True},
        'RELEASEEADDRESS': {'text': input_data.get("releasees-address", ""), 'font_size': 12, 'bold': True},
        'PROPERTYSQFT': {'text': input_data.get("property-size", ""), 'font_size': 12, 'bold': True},
        'DOORNO': {'text': input_data.get("property-door-number", ""), 'font_size': 12, 'bold': True},
        'ROADNAME': {'text': input_data.get("property-location", ""), 'font_size': 12, 'bold': True},
        'SURVEYNO': {'text': input_data.get("survey-number", ""), 'font_size': 12, 'bold': True},
        'TALUKNAME': {'text': input_data.get("taluk-name", ""), 'font_size': 12, 'bold': True},
        'DISTRICTNAME': {'text': input_data.get("district-name", ""), 'font_size': 12, 'bold': True},
        'DOCNO': {'text': input_data.get("document-number", ""), 'font_size': 12, 'bold': True},
        'FILEPAGESTART': {'text': input_data.get("registration-file-page-start", ""), 'font_size': 12, 'bold': True},
        'FILEPAGEEND': {'text': input_data.get("registration-file-page-end", ""), 'font_size': 12, 'bold': True},
        'SUBREGISTRARPLACE': {'text': input_data.get("sub-registrar-office-location", ""), 'font_size': 12, 'bold': True},
        'RIGHTSQUAREFEET': {'text': input_data.get("rights-granted", ""), 'font_size': 12, 'bold': True},
    }

    # Specify the path to your template file
    template_file_path = r"D:\Legex\Legex\backend-auth\templates\Release Deed.docx"

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
    output_file_path = r"D:\Legex\Legex\backend-auth\filled_documents\Filled_document_release_deed.docx"
    doc.save(output_file_path)

    # Return the output file path
    print(json.dumps({"filePath": output_file_path}))