import azure.functions as func
import datetime
import json
import logging

app = func.FunctionApp()


@app.function_name(name="HelloWorld")
@app.route(route="hello")
def hello_world(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Hello world function processed a request.')

    return func.HttpResponse(
        "Hello, World!",
        status_code=200
    )