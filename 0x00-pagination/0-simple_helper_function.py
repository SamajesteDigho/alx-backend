#!/usr/bin/env python3
"""
    Lets have a small description of the project
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ Return page indexed points """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
