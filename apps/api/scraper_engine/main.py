import argparse
import json
import logging
import sys
import hashlib
import time
from pymongo import MongoClient
import requests

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(levelname)s] %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

def generate_university_id(name, domain):
    data = f"{domain.lower().strip()}{name.lower().strip()}"
    return f"uni_{hashlib.md5(data.encode()).hexdigest()[:12]}"

def scrape_hipolabs(db, config):
    logger.info("Accessing Hipolabs Universities API...")
    try:
        response = requests.get("http://universities.hipolabs.com/search?country=India")
        data = response.json()
        
        limit = config.get('maxPages', 50)
        count = 0
        
        for item in data[:limit]:
            name = item.get('name')
            web_pages = item.get('web_pages', [])
            domain = web_pages[0] if web_pages else "unknown.edu"
            country = item.get('country')
            
            uni_id = generate_university_id(name, domain)
            
            university_data = {
                "university_id": uni_id,
                "name": name,
                "website": domain,
                "country": country,
                "city": "",
                "courses": [],
                "fees": {"tuition": "Not specified", "hostel": "Not specified"},
                "scholarships": [],
                "scraped_at": time.strftime('%Y-%m-%dT%H:%M:%SZ')
            }
            
            # Duplicate detection & Upsert
            db.universities.update_one(
                {"university_id": uni_id},
                {"$set": university_data},
                upsert=True
            )
            count += 1
            if count % 10 == 0:
                logger.info(f"Scraped and stored {count} institutions...")
                
        logger.info(f"Successfully processed {count} records from Hipolabs.")
        
    except Exception as e:
        logger.error(f"Error scraping Hipolabs: {str(e)}")

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import os

def main():
    parser = argparse.ArgumentParser(description='University Scraper Engine')
    parser.add_argument('--source', required=True, help='Data source to scrape')
    parser.add_argument('--jobId', required=True, help='Unique Job ID')
    parser.add_argument('--config', help='JSON configuration string')
    
    args = parser.parse_args()
    
    config = {}
    if args.config:
        try:
            config = json.loads(args.config)
        except:
            logger.error("Failed to parse config JSON")

    logger.info(f"Engine started for job: {args.jobId}")
    
    # Change directory to ensure scrapy finds settings
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    process = CrawlerProcess(get_project_settings())

    # Map frontend source IDs to Scrapy spider names
    spider_map = {
        'hipolabs': 'hipolabs',
        'ugc': 'ugc',
        # Add more mappings as spiders are built
    }

    spider_name = spider_map.get(args.source)
    
    if spider_name:
        logger.info(f"Launching Scrapy spider: {spider_name}")
        process.crawl(spider_name)
        process.start() # The script will block here until the crawling is finished
        logger.info(f"Spider {spider_name} completed.")
    else:
        logger.error(f"No spider found for source: {args.source}")
        sys.exit(1)

    logger.info("Engine shutting down.")

if __name__ == "__main__":
    main()

if __name__ == "__main__":
    main()
