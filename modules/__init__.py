# This file marks the directory as a Python package
# Import key classes to make them directly accessible from the package
from .web_scraper import WebScraper
from .social_scraper import SocialMediaScraper
from .ai_assistant import AIAssistant
from .data_processor import DataProcessor
from .visualizer import Visualizer

__all__ = [
    'WebScraper',
    'SocialMediaScraper',
    'AIAssistant',
    'DataProcessor',
    'Visualizer'
]
