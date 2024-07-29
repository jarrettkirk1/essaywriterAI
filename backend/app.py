from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import openai

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['essay_writer_ai']
essays_collection = db['essays']

# OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'

def generate_essay(user_input):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Generate an essay based on the following input: {user_input}",
        max_tokens=1000
    )
    return response.choices[0].text

@app.route('/generate-essay', methods=['POST'])
def generate_essay_endpoint():
    data = request.json
    user_input = f"Readings: {data['readings']}\nThesis: {data['thesis']}\nTopic Sentences: {data['topicSentences']}\nEvidence: {data['evidence']}\nAnalysis: {data['analysis']}"
    generated_essay = generate_essay(user_input)
    essays_collection.insert_one({
        "user_input": user_input,
        "generated_essay": generated_essay
    })
    return jsonify({"essay": generated_essay})

if __name__ == '__main__':
    app.run(debug=True)
