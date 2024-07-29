from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate-essay', methods=['POST'])
def generate_essay_endpoint():
    readings = request.json['readings']
    thesis = request.json['thesis']
    topic_sentences = request.json['topicSentences']
    evidence = request.json['evidence']
    analysis = request.json['analysis']
    prompt = request.json['prompt']

    print("Readings:", readings)
    print("Thesis:", thesis)
    print("Topic Sentences:", topic_sentences)
    print("Evidence:", evidence)
    print("Analysis:", analysis)
    print("Prompt:", prompt)

    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
