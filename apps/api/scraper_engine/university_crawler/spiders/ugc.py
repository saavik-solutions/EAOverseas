import scrapy
from scrapy_playwright.page import PageMethod
from university_crawler.items import UniversityItem

class UgcSpider(scrapy.Spider):
    name = "ugc"
    allowed_domains = ["ugc.gov.in"]
    start_urls = ["https://www.ugc.gov.in/centraluniversity.aspx"]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        PageMethod("wait_for_selector", "table.table-striped"),
                    ],
                },
            )

    def parse(self, response):
        rows = response.css("table.table-striped tr")[1:] # Skip header
        for row in rows:
            name = row.css("td:nth-child(2) a::text").get()
            website = row.css("td:nth-child(2) a::attr(href)").get()
            
            if name:
                yield UniversityItem(
                    name=name.strip(),
                    website=website.strip() if website else "",
                    country="India",
                    city="",
                    courses=[],
                    fees={"tuition": "Consult website", "hostel": "Consult website"},
                    scholarships=[],
                    ranking="UGC Recognized"
                )
