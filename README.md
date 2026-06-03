# Amazon Product Analytics Dashboard

A full-stack data analytics platform that extracts product information from Amazon search results, stores the data in CSV and SQLite formats, and presents actionable insights through an interactive dashboard.

Built with **React**, **FastAPI**, **BeautifulSoup**, **Pandas**, and **SQLite**.

---

## Overview

The Amazon Product Analytics Dashboard enables users to:

* Extract product information directly from Amazon search URLs.
* Select specific product attributes for extraction.
* Store extracted datasets in CSV and SQLite.
* Analyze pricing, ratings, discounts, and brand performance.
* Visualize data through interactive charts and KPI cards.
* Download processed datasets for further analysis.

This project demonstrates end-to-end capabilities in:

* Web Scraping
* Data Engineering
* Data Analysis
* REST API Development
* Database Management
* Frontend Development
* Data Visualization

---

## Features

### Smart URL Validation

Validate Amazon search URLs before extraction.

Supported example:

```text
https://www.amazon.in/s?k=mobile+phones
```

---

### Dynamic Field Selection

Choose exactly what data to extract.

Available fields:

* Product ID (ASIN)
* Product Name
* Brand
* Model
* Current Price
* Original Price 
* Rating
* Review Count
* Product URL

---

### Automated Data Extraction

Extract product information using:

* Requests
* BeautifulSoup
* Custom parsing logic

Includes:

* Pagination support
* Duplicate removal
* Price cleaning
* Rating extraction
* Discount calculation

---

### Interactive Analytics Dashboard

Generate insights instantly through:

#### KPI Cards

* Total Products
* Average Price
* Average Rating
* Highest Discount
* Top Brand

#### Visualizations

* Brand Distribution
* Price Distribution
* Rating Distribution
* Top Rated Products
* Most Expensive Products
* Discount Analysis

Built using Recharts.

---

### Data Preview Table

Features:

* Search
* Sort
* Pagination
* Direct Amazon Product Links

---

### CSV Export

Download extracted datasets with a single click.

Example:

```text
amazon_products.csv
```

---

### SQLite Storage

Automatically save extracted products into a local SQLite database.

Database:

```text
amazon_products.db
```

Table:

```sql
products
```

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Recharts

### Backend

* FastAPI
* BeautifulSoup4
* Requests
* Pandas
* SQLite

### Development Tools

* Git
* GitHub
* VS Code

---

## System Architecture

```text
User
 │
 ▼
React Dashboard
 │
 ▼
FastAPI API
 │
 ▼
Amazon Scraper
 │
 ├── Data Cleaning
 │
 ├── CSV Export
 │
 └── SQLite Storage
 │
 ▼
Analytics Engine
 │
 ▼
Interactive Dashboard
```

---

## Project Structure

```text
project/
│
├── Backend/
│   │
│   ├── app.py
│   ├── scraper.py
│   ├── database.py
│   ├── amazon_products.csv
│   └── amazon_products.db
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/amazon-product-analytics-dashboard.git
```

```bash
cd amazon-product-analytics-dashboard
```

---

## Backend Setup

Navigate to backend:

```bash
cd Backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI server:

```bash
uvicorn app:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd Frontend
```

Install packages:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Usage

### Step 1

Paste an Amazon search URL.

Example:

```text
https://www.amazon.in/s?k=mobile+phones
```

### Step 2

Validate the URL.

### Step 3

Select the fields you want to extract.

### Step 4

Click:

```text
Start Extraction
```

### Step 5

View:

* Extracted products
* KPI metrics
* Interactive charts
* Product table

### Step 6

Download the dataset as CSV.

---

## Example Analytics

The dashboard can answer questions such as:

* Which brand offers the most products?
* What is the average price by brand?
* Which products have the highest ratings?
* What products offer the largest discounts?
* How are ratings distributed across products?
* What is the average price range for a category?

---

## Future Enhancements

* Multi-category support
* Historical price tracking
* PostgreSQL integration
* User authentication
* Scheduled scraping
* Price-drop alerts
* Multi-platform support (Flipkart, Croma, Reliance Digital)
* PDF report generation
* Advanced filtering

---

## Learning Outcomes

This project demonstrates practical experience with:

* Web Scraping
* REST APIs
* FastAPI Development
* React Development
* Data Cleaning
* Data Analysis
* Dashboard Design
* Database Management
* Full-Stack Development

---

## Disclaimer

This project is intended for educational and portfolio purposes. Website structures and anti-bot mechanisms may change over time. Users should ensure compliance with applicable website terms of service and legal requirements when collecting data.

---

## Author

Kishor Madane

Aspiring Data Analyst | Python Developer | Full-Stack Developer

GitHub: https://github.com/kishor047
LinkedIn:  https://www.linkedin.com/in/kishor-madane-248139260/