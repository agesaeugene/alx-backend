#!/usr/bin/env python3
"""
The function index_range takes two integer arguments, page and page_size, 
and returns a tuple of size two with start and end indexes for specific 
pagination parameters.
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Returns a tuple containing the pagination start and end indexes.
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
