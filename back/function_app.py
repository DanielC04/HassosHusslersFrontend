import azure.functions as func
import json
import logging
from cairosvg import svg2png
import base64
from predict_walls import predict_walls
import os
import numpy as np
import cv2

app = func.FunctionApp()


@app.function_name(name="HelloWorld")
@app.route(route="hello")
def hello_world(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Hello world function processed a request.')

    return func.HttpResponse(
        "Hello, World!",
        status_code=200
    )


@app.route(route="svgToPng", methods=["POST"])
def svgToPng(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("called svgToPng")

    if 'file' not in req.files:
        logging.error("no file object was passed :/")
        return func.HttpResponse(
            json.dumps({"error": "no file found"}),
            status_code=400,
            mimetype="application/json"
        )


    file = req.files['file']
    # Check if the file is an SVG
    if file.filename == '' or not file.filename.endswith('.svg'):
        logging.error("file is not an svg")
        return func.HttpResponse(
            json.dumps({"error": "File must be an SVG"}),
            status_code=400,
            mimetype="application/json"
        )
    
    logging.info("file: ")
    logging.info(str(file))
    png_bytes = svg2png(bytestring=file.read(), background_color='white', output_width=1000)
    
    # Encode the PNG bytes to base64
    base64_str = 'data:image/png;base64, ' + base64.b64encode(png_bytes).decode('utf-8')

    return func.HttpResponse(
        json.dumps({"message": "Success", "image": base64_str}),
        status_code=200,
        mimetype="application/json"
    )


@app.route(route="predict_walls", methods=["POST"])
def predict_walls_route(req: func.HttpRequest) -> func.HttpResponse:
    try:
        # Parse the request JSON
        data = req.get_json()
        # logging.info(f"Received data: {data}")
        
        if 'image' not in data:
            return func.HttpResponse(
                json.dumps({"error": "Missing image data"}),
                status_code=400,
                mimetype="application/json"
            )
        
        image_data = data['image']

        # Validate and decode the base64 image data
        if not image_data.startswith('data:image/png;base64,'):
            return func.HttpResponse(
                json.dumps({"error": "Invalid image data"}),
                status_code=500,
                mimetype="application/json"
            )

        image_data = image_data.replace('data:image/png;base64,', '')
        image_bytes = base64.b64decode(image_data)

        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
       
        # Call the predict_walls function with the image path
        walls = predict_walls(image)
        
        # Return a successful response
        response_data = {
            "message": "SVG processed successfully",
            "walls": walls,
        }
        return func.HttpResponse(
            json.dumps(response_data),
            status_code=202,
            mimetype="application/json"
        )
    except Exception as e:
        logging.error(f"Error processing request: {e}")
        response_data = {
            "message": "Error processing SVG :/",
            "walls": None,
        }
        return func.HttpResponse(
            json.dumps(response_data),
            status_code=500,
            mimetype="application/json"
        )