from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# ✅ CORS CONFIG (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔐 SIGNUP
@app.post("/signup")
def signup(user: dict):
    response = requests.post(
        "http://user-service:8001/signup",
        json=user
    )
    return response.json()

# 🔐 LOGIN
@app.post("/login")
def login(user: dict):
    response = requests.post(
        "http://user-service:8001/login",
        json=user
    )
    return response.json()

# ❤️ HEALTH
@app.get("/")
def home():
    return {"status": "API Gateway Running"}
