from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

log_reg = joblib.load(BASE_DIR / "log_reg.joblib")
dtree = joblib.load(BASE_DIR / "dtree.joblib")

feature_file = BASE_DIR / "feature_columns.csv"
with open(feature_file) as f:
    feature_columns = [line.strip() for line in f.readlines()]

app = FastAPI(title="Diabetes Prediction Model")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000", "http://localhost:3001"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    data: list

@app.post("/predict")
def predict(input_data: InputData, model: str = Query("log_reg", enum=["log_reg", "dtree"])):
    X = pd.DataFrame([input_data.data], columns=feature_columns)
    prediction = log_reg.predict(X)[0] if model == "log_reg" else dtree.predict(X)[0]
    return {"prediction": int(prediction)}