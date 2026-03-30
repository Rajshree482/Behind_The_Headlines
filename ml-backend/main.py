from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib

# Initialize the app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load BOTH the vectorizer and the trained model
try:
    vectorizer = joblib.load("vectorizer.pkl")
    model = joblib.load("model.pkl")
    print("✅ Vectorizer and Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading ML files: {e}")
    vectorizer = None
    model = None

# Define what data the API expects from React for analysis
class NewsInput(BaseModel):
    text: str

# 🕵️‍♂️ NEW: Define what data the API expects for a discrepancy report
class DiscrepancyReport(BaseModel):
    prediction: str
    confidence: float
    flagged_as_wrong: bool

@app.get("/")
def read_root():
    return {"status": "Behind The Headlines API is running"}

@app.post("/predict")
async def predict_news(news: NewsInput):
    if not model or not vectorizer:
        raise HTTPException(status_code=500, detail="ML files not found or corrupted.")
    
    if not news.text.strip():
        raise HTTPException(status_code=400, detail="No text provided.")

    try:
        # STEP 1: Translate the English text into a mathematical array
        transformed_text = vectorizer.transform([news.text])
        
        # STEP 2: Pass the translated text to the model to get the prediction
        prediction_result = model.predict(transformed_text)[0]
        
        # STEP 3: Get the confidence score
        try:
            probabilities = model.predict_proba(transformed_text)[0]
            confidence = max(probabilities)
        except Exception as proba_error:
            print(f"Notice: predict_proba failed ({proba_error}), using fallback confidence.")
            confidence = 0.85 
            
        # Standardize the output for your React ResultCard component
        is_real = False
        if prediction_result in [1, "1", "REAL", "Real", "true", "True"]:
            is_real = True

        return {
            "prediction": "Real" if is_real else "Fake",
            "confidence": float(confidence)
        }
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Model execution error: {str(e)}")

# 🚨 NEW: The route to catch the Discrepancy Reports
@app.post("/report")
async def receive_report(report: DiscrepancyReport):
    # For the hackathon, printing it to the terminal proves the wire is working!
    print("\n" + "="*40)
    print("🚨 NEW DISCREPANCY REPORT FILED 🚨")
    print(f"Original Prediction: {report.prediction}")
    print(f"Confidence Level: {report.confidence}")
    print(f"Flagged as Wrong: {report.flagged_as_wrong}")
    print("="*40 + "\n")
    
    return {"status": "Report received successfully by headquarters"}