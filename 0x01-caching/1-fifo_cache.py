#!/usr/bin/env python3
"""
Create a class called FIFO chaching module that inherits 
from BaseCaching and is a caching system.
"""
from collections import OrderedDict

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """This object supports saving and retrieving entries 
    from a dictionary using a FIFO removal technique when
    the limit is reached.
    """
    def __init__(self):
        """
        Initializes the instance of the chache memory
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        Adds a key value pair in the cache.
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key, _ = self.cache_data.popitem(False)
            print("DISCARD:", first_key)

    def get(self, key):
        """Retrieves an item by the key value pair.
        """
        return self.cache_data.get(key, None)
