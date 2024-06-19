from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = 'your_openai_api_key'

@app.route('/generate-essay', methods=['POST'])
def generate_essay():
    data = request.json
    thesis = data.get('thesis')
    supporting_arguments = data.get('supportingArguments')
    evidence = data.get('evidence')
    analysis = data.get('analysis')
    
    # Construct the prompt for ChatGPT
    prompt = f"""
    Write an essay with the following structure:
    
    Thesis: {thesis}
    
    Supporting Arguments: {supporting_arguments}
    
    Evidence: {evidence}
    
    Analysis: {analysis}
    """
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1500
    )
    
    essay = response.choices[0].text.strip()
    
    return jsonify({'essay': essay})

if __name__ == '__main__':
    app.run(debug=True)
