# 🕵️‍♂️ Behind The Headlines
**Confidential Analysis Engine | Verifying the Truth in Real-Time**

Misinformation spreads rapidly online, and identifying fake news manually is impossible at scale. **Behind The Headlines** is a full-stack, machine-learning-powered application designed to analyze text snippets and classify them as Authentic or Fabricated.

## ✨ Key Features
* **🧠 Machine Learning Core:** Powered by a trained classification model to detect linguistic patterns of fake news.
* **🕵️ Vintage Detective UI:** A highly immersive, dual-theme interface. 
    * *Midnight Investigation (Dark Mode):* A shadowy corkboard aesthetic.
    * *Morning Desk (Light Mode):* A classic typewriter and newspaper aesthetic.
* **⚡ Real-Time Processing:** Built with a blazing-fast FastAPI backend and a responsive React frontend.
* **📝 User Feedback Loop:** Users can flag incorrect predictions to help improve the model's future accuracy.

## 🛠️ Tech Stack
* **Frontend:** React, Vite, Tailwind CSS (Custom Vintage/Noir Configuration)
* **Backend:** Python, FastAPI, Uvicorn
* **Machine Learning:** Scikit-Learn (Logistic Regression / TF-IDF Vectorization)

---

## 🚀 How to Run Locally

Because the Machine Learning models are too large to host on GitHub, you will need to download them separately before running the application.

### 1. Retrieve the Classified Intel (ML Models)
1. Download `model.pkl` and `vectorizer.pkl` from the team's secure drive [https://drive.google.com/drive/folders/1dkx6ZIOfHnF9XJficlJmDtShD_FhJDHh?usp=sharing].
2. Place both files directly inside the `ml-backend/` folder.

### 2. Boot up the Analysis Engine (Backend)
Open a terminal and navigate to the backend folder:
```bash
cd ml-backend
# Activate your virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
