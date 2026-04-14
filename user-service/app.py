from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# 🐬 DATABASE CONFIG
DATABASE_URL = "mysql+pymysql://micro:password@localhost/microservices"

engine = create_engine(DATABASE_URL, echo=True)  # echo=True = SQL logs
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

app = FastAPI()

# 📦 DB MODEL
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)

# 🧱 CREATE TABLE
Base.metadata.create_all(bind=engine)

# 📥 REQUEST MODEL (IMPORTANT FIX)
class UserRequest(BaseModel):
    username: str
    password: str

# 🔐 SIGNUP API
@app.post("/signup")
def signup(user: UserRequest):
    db = SessionLocal()

    # Check if user exists
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Create new user
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }

# 🔑 LOGIN API
@app.post("/login")
def login(user: UserRequest):
    db = SessionLocal()

    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "username": db_user.username
    }

# ❤️ HEALTH CHECK (optional but useful)
@app.get("/")
def health():
    return {"status": "User Service Running"}
