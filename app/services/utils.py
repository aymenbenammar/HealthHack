import fitz
from PIL import Image
import os
from io import BytesIO
from typing import List


def split_pdf_to_images(pdf_bytes: bytes, pdf_filename: str, dpi: int = 200, image_format: str = 'PNG') -> List[str]:
    """
    Converts a PDF in bytes format to images and saves each page as an image file.

    Parameters:
    - pdf_bytes (bytes): The PDF file content in bytes.
    - pdf_filename (str): The unique identifier for the PDF file.
    - dpi (int): The resolution in dots per inch for the output images. Default is 200.
    - image_format (str): The format to save the images ('PNG', 'JPEG', etc.). Default is 'PNG'.

    Returns:
    - List[str]: List of paths to the saved image files.
    """
    # Open the PDF from bytes
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    os.makedirs("resources", exist_ok=True)
    output_folder = os.path.join("resources", pdf_filename)
    os.makedirs(output_folder, exist_ok=True)

    image_paths = []  # List to store the paths of saved images

    # Iterate through each page
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        # Render page to a pixmap with the specified DPI
        mat = fitz.Matrix(dpi / 72, dpi / 72)  # DPI scaling
        pix = page.get_pixmap(matrix=mat)
        # Convert pixmap to PIL Image
        img = Image.open(BytesIO(pix.tobytes()))
        # Define the output file path
        output_path = os.path.join(output_folder, f"page_{page_num + 1}.{image_format.lower()}")
        # Save the image
        img.save(output_path, format=image_format)
        # Add the path to our list
        image_paths.append(output_path)

    # Close the PDF document
    doc.close()

    return image_paths