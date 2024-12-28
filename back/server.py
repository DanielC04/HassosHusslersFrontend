from flask import Flask, request, jsonify
import tempfile
import os
import predict_walls
from time import sleep
import base64
from flask_cors import CORS
import sys


app = Flask(__name__)
CORS(app)

@app.route('/health')
def health():
    return 'OK'

@app.route('/svgToPng', methods=['POST'])
def svgToPng():
    # Check if a file was provided
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    # Check if the file is an SVG
    if file.filename == '' or not file.filename.endswith('.svg'):
        return jsonify({"error": "File must be an SVG"}), 400

    # Save the file temporarily
    path = tempfile.gettempdir()
    filepath = os.path.join(path, file.filename)
    file.save(filepath)
    

    print(file)
    print(type(file))
    print(filepath)
    # Convert SVG to PNG using rsvg-convert
    png_filepath = os.path.join(path, file.filename + '.png')
    command = f'rsvg-convert -o {png_filepath} {filepath} -w 1000 --background-color=white'
    os.system(command)

    # Check if the PNG file was created
    if not os.path.exists(png_filepath):
        response = jsonify({"message": "Failed to convert SVG to PNG", "walls": None})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
    
    with open(png_filepath, "rb") as image_file:
        encoded_string = 'data:image/png;base64, ' + base64.b64encode(image_file.read()).decode('utf-8')


    response = jsonify({ "message": "Success", "image": encoded_string})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response, 202

@app.route('/predict_walls', methods=['POST'])
def predict_walls_path():
    try:
        data = request.get_json()
        print(data, file=sys.stdout)
        
        if 'image' not in data:
            result = jsonify({"error": "Missing image data"})
            result.headers.add("Access-Control-Allow-Origin", "*")
            return result, 400

        image_data = data['image']

        path = tempfile.gettempdir()
        png_filepath = os.path.join(path, 'temp_file.png')
        print("png_file_path: ", png_filepath, file=sys.stdout)

        if not image_data.startswith('data:image/png;base64,'):
            result = jsonify({"error": "Invalid image data"})
            result.headers.add("Access-Control-Allow-Origin", "*")
            return result, 500

        image_data = image_data.replace('data:image/png;base64,', '')
        image_bytes = base64.b64decode(image_data)

        path = tempfile.gettempdir()
        png_filepath = os.path.join(path, 'uploaded_image.png')
        with open(png_filepath, 'wb') as f:
            f.write(image_bytes)

        # Use svgpathtools to load paths and attributes
        walls = predict_walls.predict_walls(png_filepath)
        
        with open(png_filepath, "rb") as image_file:
            encoded_string = 'data:image/png;base64, ' + base64.b64encode(image_file.read()).decode('utf-8')

        # Return a response with some information about the SVG
        response = jsonify({
            "message": "SVG processed successfully",
            "walls": walls,
        })
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 202
    except Exception as e: 
        print(e, file=sys.stdout)
        response = jsonify({
            "message": "Error processing SVG :/",
            "walls": None,
        })
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
    finally:
        # Clean up the saved file
        try:
            os.remove(filepath)
        except:
            pass
