from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import PlainTextResponse
import google.generativeai as genai
from config import GEMINI_API_KEY
import logging
import traceback
import PyPDF2



genai.configure(api_key=GEMINI_API_KEY)

logging.basicConfig(level=logging.INFO)

if GEMINI_API_KEY is None:
    logging.error("GEMINI_API_KEY is not set")
    raise HTTPException(status_code=500, detail="API key not found")


app = FastAPI()

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the generative model
try:
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    logging.info("Model initialized successfully")
except Exception as e:
    logging.error(f"Failed to initialize the generative model: {str(e)}")
    raise HTTPException(status_code=500, detail="Model initialization failed")


def read_pdf(file_path):
    with open(file_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

data = read_pdf("scientists.pdf")


class Query(BaseModel):
    user_input: str

@app.post("/generate")
async def generate_response(query: Query):
    try:
        prompt = (
            f"You are the LazzyKoalaa Rate My Professor. Your primary role is to help users find professors from the information you have.Use the provided context to identify professors that meet the user's criteria. If you don't find any relevant professors, respond with NO PROFESSOR.Make sure to communicate in a friendly and approachable tone. Avoid overly formal or technical language, and strive to be clear and concise in your responses.Important: If no professors are found or not enough information is found, always end your response with NO PROFESSOR found. \n\n"
            f"Data: {data}\nUser query: {query.user_input}"
        )
        
        response = model.generate_content(prompt) 
        logging.info(f"Response type: {type(response)}")
        logging.info(f"Response content: {response}")

        if response and hasattr(response, 'candidates') and len(response.candidates) > 0:
            candidate = response.candidates[0]
            if candidate and hasattr(candidate, 'content') and hasattr(candidate.content, 'parts') and len(candidate.content.parts) > 0:
                response_text = candidate.content.parts[0].text
            else:
                response_text = "No content parts available"
        else:
            response_text = "No candidates available"
        
        # logging.info(f"Processed response: {response_text}")
        
        return PlainTextResponse(content=response_text)
    
    except Exception as e:
        logging.error(f"Text generation error: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Failed to generate response")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
