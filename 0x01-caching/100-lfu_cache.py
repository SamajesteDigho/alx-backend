#!/usr/bin/env python3
"""
Here the documentation of the module file
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache Cacheclass inheriting from BaseCaching """

    def __init__(self):
        """ Initializing the object """
        super().__init__()
        self._frequency = {}

    def put(self, key, item):
        """ Putting function definition """
        if key is not None and item is not None:
            keys = list(self.cache_data.keys())
            if key in keys:
                del self.cache_data[key]
            elif len(self.cache_data) >= self.MAX_ITEMS:
                max = self._frequency[keys[0]]
                max_key = keys[0]
                for x in self._frequency.keys():
                    if self._frequency[x] < max:
                        max = self._frequency[x]
                        max_key = x
                print("DISCARD: {}".format(max_key))
                del self.cache_data[max_key]
                del self._frequency[max_key]
            self.cache_data[key] = item
            self._frequency[key] = self._frequency.get(key, 0) + 1

    def get(self, key):
        """ Setting function definition """
        try:
            data = self.cache_data[key]
            del self.cache_data[key]
            self.cache_data[key] = data
            self._frequency[key] = self._frequency.get(key, 0) + 1
            return data
        except Exception:
            return None
