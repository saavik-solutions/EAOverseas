import hashlib
import pymongo
from itemadapter import ItemAdapter

class MongoPipeline:
    collection_name = "universities"

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get("MONGO_URI"),
            mongo_db=crawler.settings.get("MONGO_DATABASE"),
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def generate_university_id(self, item):
        name = item.get('name', '').lower().strip()
        website = item.get('website', '').lower().strip()
        data = f"{website}{name}"
        return f"uni_{hashlib.md5(data.encode()).hexdigest()[:12]}"

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        # Generate unique ID if not present
        if not adapter.get('university_id'):
            adapter['university_id'] = self.generate_university_id(adapter)
        
        # Ensure compulsory fields
        if not adapter.get('name'):
            return item
            
        # Clean data
        university_data = adapter.asdict()
        university_data['scraped_at'] = pymongo.datetime.datetime.now()
        
        # Upsert into MongoDB
        self.db[self.collection_name].update_one(
            {"university_id": university_data["university_id"]},
            {"$set": university_data},
            upsert=True
        )
        
        spider.logger.info(f"Stored {university_data['name']} in MongoDB")
        return item
