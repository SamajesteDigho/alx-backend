#!/usr/bin/env python3
"""
Here the documentation of the module file
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache class inheriting from BaseCaching """
    def __init__(self):
        """ Initializng the object """
        super().__init__()

    def put(self, key, item):
        """ Putting in place the put function """
        if key is not None and item is not None:
            keys = list(self.cache_data.keys())
            keys.sort()
            if key in keys:
                self.cache_data[key] = item
            elif len(self.cache_data) >= self.MAX_ITEMS:
                print("DISCARD: {}".format(keys[0]))
                del self.cache_data[keys[0]]
                self.cache_data[key] = item
            else:
                self.cache_data[key] = item

    def get(self, key):
        """ Putting in place the get function """
        try:
            return self.cache_data[key]
        except Exception:
            return None
