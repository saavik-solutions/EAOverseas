import os
from dotenv import load_dotenv

load_dotenv()

BOT_NAME = "university_crawler"

SPIDER_MODULES = ["university_crawler.spiders"]
NEWSPIDER_MODULE = "university_crawler.spiders"

# Playwright Settings
DOWNLOAD_HANDLERS = {
    "http": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
    "https": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
}

TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"

ROBOTSTXT_OBEY = True

CONCURRENT_REQUESTS = 16
DOWNLOAD_DELAY = 1

COOKIES_ENABLED = False

DEFAULT_REQUEST_HEADERS = {
   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
   'Accept-Language': 'en',
   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
}

ITEM_PIPELINES = {
    "university_crawler.pipelines.MongoPipeline": 300,
}

# MongoDB Config
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://antigravityy8_db:364133@cluster0.hkot0yl.mongodb.net/?appName=Cluster0")
MONGO_DATABASE = "antigravityy8_db"

PLAYWRIGHT_BROWSER_TYPE = "chromium"
PLAYWRIGHT_LAUNCH_OPTIONS = {
    "headless": True,
}
