#!/usr/bin/env python3
"""
Here the documentation of the module file
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ BasicCache class inheriting from BaseCaching """

    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """ Putting data into cash """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """ Getting data with associated to given key """
        try:
            return self.cache_data[key]
        except Exception:
            return None
