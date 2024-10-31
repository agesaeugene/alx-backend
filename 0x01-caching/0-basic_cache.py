#!/usr/bin/env python3
"""
Create a class BasicCache that inherits from BaseCaching
and serves as a caching system.
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    Represents an object that can store and retrieve 
    dictionary elements.
    """
    def put(self, key, item):
        """
        Adds a keyvalue pair item in the cache.
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """
        If the key is empty or does not exist in the cache, return None.
        """
        return self.cache_data.get(key, None)
