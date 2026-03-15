import scrapy
from university_crawler.items import UniversityItem

class HipolabsSpider(scrapy.Spider):
    name = "hipolabs"
    allowed_domains = ["universities.hipolabs.com"]
    start_urls = ["http://universities.hipolabs.com/search?country=India"]

    def parse(self, response):
        data = response.json()
        for item in data:
            yield UniversityItem(
                name=item.get('name'),
                website=item.get('web_pages', [''])[0],
                country=item.get('country'),
                city="",
                courses=[],
                fees={"tuition": "Not specified", "hostel": "Not specified"},
                scholarships=[],
                ranking="N/A"
            )
