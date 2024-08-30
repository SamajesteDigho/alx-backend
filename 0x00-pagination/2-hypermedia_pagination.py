#!/usr/bin/env python3
"""
    Lets have a small description of the project
"""
import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ Return page indexed points """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Get a page items with the page size """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        start, end = index_range(page=page, page_size=page_size)
        dataset = self.dataset()
        data = []
        if end < len(dataset):
            data = dataset[start:end]
        return data

    def get_hyper(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Getting the hyper function taggles """
        dataset = self.dataset()
        data = self.get_page(page=page, page_size=page_size)
        total_pages = math.ceil(len(dataset) / page_size)
        if page >= total_pages:
            next_page = None
        else:
            next_page = page + 1
        if page <= 1:
            prev_page = None
        else:
            prev_page = page - 1
        result = {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }
        return result
