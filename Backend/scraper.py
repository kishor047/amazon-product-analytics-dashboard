# scraper.py

from datetime import datetime
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

import requests
from bs4 import BeautifulSoup

def _build_page_url(url, page):
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    query["page"] = [str(page)]
    return urlunparse(parsed._replace(query=urlencode(query, doseq=True)))


def _has_next_page(soup):
    next_link = soup.select_one(".s-pagination-next")
    return bool(next_link) and "disabled" not in next_link.get("class", [])


def scrape_amazon(url, fields_to_extract=None, max_items=100, max_pages=10):
    if fields_to_extract is None:
        fields_to_extract = ["Product_Name", "Current_Price", "Brand", "Rating", "Review_Count"]

    products = []
    seen_keys = set()
    base_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}"

    for page in range(1, max_pages + 1):
        if len(products) >= max_items:
            break

        page_url = _build_page_url(url, page)
        response = requests.get(
            page_url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9"
            },
            timeout=30
        )

        if response.status_code != 200:
            break

        soup = BeautifulSoup(response.text, "lxml")
        cards = soup.select('[data-component-type="s-search-result"]')
        if not cards:
            break

        for card in cards:
            product = {}
            title = card.select_one("h2 span")
            product_name = title.get_text(strip=True) if title else "Unknown"

            if "Product_Name" in fields_to_extract:
                product["Product_Name"] = product_name

            if "Brand" in fields_to_extract:
                product["Brand"] = product_name.split()[0] if product_name != "Unknown" else "Unknown"

            if "Current_Price" in fields_to_extract:
                price_elem = card.select_one(".a-price-whole")
                product["Current_Price"] = price_elem.get_text(strip=True).replace(',', '') if price_elem else None

            if "Rating" in fields_to_extract:
                rating_elem = card.select_one(".a-icon-alt")
                rating_text = rating_elem.get_text(strip=True) if rating_elem else None
                product["Rating"] = float(rating_text.split()[0]) if rating_text else None

            if "Review_Count" in fields_to_extract:
                reviews_elem = card.select_one(".a-size-base.s-underline-text")
                product["Review_Count"] = int(reviews_elem.get_text(strip=True).replace(',', '')) if reviews_elem else None

            if "Product_URL" in fields_to_extract:
                link_elem = card.select_one("h2 a")
                href = link_elem.get('href') if link_elem else None
                product["Product_URL"] = f"{base_url}{href}" if href else None

            if "Scraped_At" in fields_to_extract:
                product["Scraped_At"] = datetime.now().isoformat()

            key = product.get("Product_URL") or product.get("Product_Name")
            if key and key in seen_keys:
                continue
            if key:
                seen_keys.add(key)

            products.append(product)
            if len(products) >= max_items:
                break

        if not _has_next_page(soup):
            break

    return products

if __name__ == "__main__":
    data = scrape_amazon("https://www.amazon.in/s?k=mobile+phones")
    print(data)