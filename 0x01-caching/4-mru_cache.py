#!/usr/bin/env python3
"""
Here the documentation of the module file
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache Cacheclass inheriting from BaseCaching """

    def __init__(self):
        """ Initializing the object """
        super().__init__()

    def put(self, key, item):
        """ Putting function definition """
        if key is not None and item is not None:
            keys = list(self.cache_data.keys())
            if key in keys:
                del self.cache_data[key]
            elif len(self.cache_data) >= self.MAX_ITEMS:
                print("DISCARD: {}".format(keys[-1]))
                del self.cache_data[keys[-1]]
            self.cache_data[key] = item

    def get(self, key):
        """ Setting function definition """
        try:
            data = self.cache_data[key]
            del self.cache_data[key]
            self.cache_data[key] = data
            return data
        except Exception:
            return None
