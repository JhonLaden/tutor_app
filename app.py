from flask import Flask, request, jsonify
import spacy
from flask_cors import CORS


app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")
CORS(app)



@app.route('/', methods=['GET'])
def index():
    return 'test'

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'this is from flask'})


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    sentence = data.get("sentence", "")
    doc = nlp(sentence)
    
    result = []
    for token in doc:
        result.append({
            "entokent text": token.text,
            "token label_": token.lemma_,
        })

    return jsonify(result)

if __name__ == '__main__':
   app.run(debug=True, port=5001)
