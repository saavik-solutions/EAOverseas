import scrapy

class UniversityItem(scrapy.Item):
    university_id = scrapy.Field()
    name = scrapy.Field()
    website = scrapy.Field()
    country = scrapy.Field()
    city = scrapy.Field()
    courses = scrapy.Field()
    fees = scrapy.Field()
    scholarships = scrapy.Field()
    ranking = scrapy.Field()
    facilities = scrapy.Field()
    language = scrapy.Field()
    admissionRequirements = scrapy.Field()
    placementStatistics = scrapy.Field()
    logoUrl = scrapy.Field()
    scraped_at = scrapy.Field()
