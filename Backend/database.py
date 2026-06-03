# database.py

import pandas as pd
import sqlite3

def save_csv(data):
    df = pd.DataFrame(data)
    df.to_csv("amazon_products.csv", index=False)
    return True

def save_to_sqlite(data):
    df = pd.DataFrame(data)
    conn = sqlite3.connect("amazon_products.db")
    df.to_sql("products", conn, if_exists="replace", index=False)
    conn.close()
    return True

def get_analytics(data):
    df = pd.DataFrame(data)
    if df.empty:
        return {}
    
    analytics = {
        "Total Products": len(df),
        "Average Price": df["Current_Price"].dropna().astype(float).mean() if "Current_Price" in df.columns else None,
        "Average Rating": df["Rating"].dropna().astype(float).mean() if "Rating" in df.columns else None,
        "Top Brand": df["Brand"].mode()[0] if "Brand" in df.columns and not df.empty else None
    }
    return analytics