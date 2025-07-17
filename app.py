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
    sentence = request.get_json().get("sentence", "")
    analyzed = analyze_sentence(sentence)
    return jsonify([analyzed])

def analyze_sentence(sentence):
    doc = clean(sentence)
    parts = extract_main_parts(doc)
    return {
        **parts,
        "sentence": sentence,
        "question": generate_question(parts),
        "answer": parts.get("noun")
    }
    
def extract_main_parts(doc):
    result = {}
    for chunk in doc.noun_chunks:
        if 'noun' not in result and chunk.root.dep_ == 'nsubj':
            result["noun"] = chunk.text
            result["verb"] = chunk.root.head.text
        if 'object' not in result and chunk.root.dep_ == 'dobj':
            result["object"] = chunk.text
    for token in doc:
        if token.dep_ == "dobj":
            object_phrase = token.text
            
    result['object'] +=" "+object_phrase
    return result

def clean(sentence):
    return nlp(sentence)

def generate_question(main_words):
    return 'who ' + main_words['verb'] +" "+ main_words['object'] +'?'

if __name__ == '__main__':
   app.run(debug=True, port=5001)
