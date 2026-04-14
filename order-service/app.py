from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/orders")
def get_orders():
    users = requests.get("http://localhost:8001/users").json()
    return {
        "orders": [
            {"order_id": 1, "user": users}
        ]
    }
