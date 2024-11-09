from flask import Flask, request, jsonify
import tempfile
import os
import predict_walls
from time import sleep


app = Flask(__name__)


@app.route('/predict_walls', methods=['POST'])
def predict_walls_route():
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
    sleep(2)
    

    print(file)
    print(type(file))
    print(filepath)
    # Convert SVG to PNG using rsvg-convert
    png_filepath = os.path.join(path, file.filename + '.png')
    command = f'rsvg-convert -o {png_filepath} {filepath} -w 1000 --background-color=white'
    os.system(command)
    sleep(0.5)

    # Check if the PNG file was created
    if not os.path.exists(png_filepath):
        response = jsonify({"message": "Failed to convert SVG to PNG", "walls": None})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500

    # Process the SVG file
    try:
        # Use svgpathtools to load paths and attributes
        walls = predict_walls.predict_walls(png_filepath)
        
        
        # Return a response with some information about the SVG
        response = jsonify({
            "message": "SVG processed successfully",
            "walls": walls
        })
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 202
    except Exception as e: 
        print(e)
        response = jsonify({
            "message": "Error processing SVG :/",
            "walls": None
        })
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
    finally:
        # Clean up the saved file
        try:
            os.remove(filepath)
        except:
            pass