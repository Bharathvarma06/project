#!/bin/bash

cd user-service && nohup uvicorn app:app --host 0.0.0.0 --port 8001 &
cd order-service && nohup uvicorn app:app --host 0.0.0.0 --port 8002 &
cd api-gateway && nohup uvicorn app:app --host 0.0.0.0 --port 8000 &
