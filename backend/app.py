	
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json
from functions.processing_artigle import processing_data

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
 
@app.route('/processing/artigle', methods=['GET', 'POST'])
@cross_origin()
def processingArtigle():
    if request.method == "POST":
        textRequest = json.loads(request.data)['text']
        #request.form['text']
        if textRequest :
            return jsonify(processed=processing_data(textRequest))
        else:
            return jsonify(processed='404')
        
 
if __name__ == '__main__':
    app.run(debug=True)