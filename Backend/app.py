from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_amazon
from database import save_csv, save_to_sqlite, get_analytics
from fastapi.responses import FileResponse
import os

# Create FastAPI app FIRST
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global storage
extracted_products = []
# Global in-memory storage for simple demonstration
extracted_products = []

@app.post("/scrape")
def scrape(payload: dict):
    global extracted_products
    url = payload.get("url")
    fields = payload.get("fields", [])
    limit = payload.get("limit", 100)
    max_pages = payload.get("max_pages", 10)

    extracted_products = scrape_amazon(
        url,
        fields_to_extract=fields if fields else None,
        max_items=limit,
        max_pages=max_pages
    )
    
    save_csv(extracted_products)
    save_to_sqlite(extracted_products)
    
    return {
        "success": True,
        "records": len(extracted_products),
        "data": extracted_products
    }

@app.get("/products")
def get_products():
    return {"data": extracted_products}

@app.get("/analytics")
def get_analytics_route():
    return {"data": get_analytics(extracted_products)}

@app.get("/download-csv")
def download_csv():
    file_path = "amazon_products.csv"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="text/csv", filename="amazon_products.csv")
    return {"error": "File not found"}
