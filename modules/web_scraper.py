import requests
import pandas as pd
import time
import trafilatura
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import logging

class WebScraper:
    def __init__(self):
        self.session = requests.Session()
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def scrape(self, url, method="Full Page Content", css_selector=None, 
               delay=1, user_agent=None, max_pages=1, timeout=30):
        """
        Scrape data from a website based on the selected method.
        
        Args:
            url (str): The URL to scrape
            method (str): The scraping method to use
            css_selector (str, optional): CSS selector for custom extraction
            delay (int): Delay between requests in seconds
            user_agent (str): Custom user agent
            max_pages (int): Maximum number of pages to scrape (for pagination)
            timeout (int): Request timeout in seconds
            
        Returns:
            Data in appropriate format (DataFrame, list, str) based on method
        """
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
            
        # Validate URL
        try:
            parsed_url = urlparse(url)
            if not parsed_url.netloc:
                raise ValueError("Invalid URL format")
        except Exception as e:
            self.logger.error(f"Invalid URL: {str(e)}")
            raise ValueError(f"Invalid URL: {str(e)}")
        
        # Set headers
        headers = {
            'User-Agent': user_agent or 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
        }
        
        try:
            if method == "Full Page Content":
                return self._scrape_full_content(url, headers, timeout)
            elif method == "Text Only":
                return self._scrape_text_only(url, headers, timeout)
            elif method == "Tables":
                return self._scrape_tables(url, headers, timeout, max_pages, delay)
            elif method == "Links":
                return self._scrape_links(url, headers, timeout, max_pages, delay)
            elif method == "Images":
                return self._scrape_images(url, headers, timeout)
            elif method == "Custom CSS Selector":
                if not css_selector:
                    raise ValueError("CSS selector is required for custom extraction")
                return self._scrape_custom(url, css_selector, headers, timeout)
            else:
                raise ValueError(f"Unknown scraping method: {method}")
                
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Request error: {str(e)}")
            raise RuntimeError(f"Failed to scrape data: {str(e)}")
        except Exception as e:
            self.logger.error(f"Scraping error: {str(e)}")
            raise RuntimeError(f"Failed to scrape data: {str(e)}")
    
    def _scrape_full_content(self, url, headers, timeout):
        """Scrape full HTML content from the URL"""
        response = self.session.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        
        return response.text
    
    def _scrape_text_only(self, url, headers, timeout):
        """Scrape and extract only text content from the URL using trafilatura"""
        # First attempt with trafilatura for better text extraction
        downloaded = trafilatura.fetch_url(url)
        if downloaded:
            text = trafilatura.extract(downloaded)
            if text:
                return text
        
        # Fallback to BeautifulSoup
        response = self.session.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        # Remove script and style elements
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()
            
        # Get text
        text = soup.get_text(separator='\n')
        # Remove excessive newlines
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = '\n'.join(chunk for chunk in chunks if chunk)
        
        return text
    
    def _scrape_tables(self, url, headers, timeout, max_pages=1, delay=1):
        """Scrape tables from the URL and return as DataFrame"""
        all_tables = []
        current_url = url
        
        for page in range(max_pages):
            response = self.session.get(current_url, headers=headers, timeout=timeout)
            response.raise_for_status()
            
            # Parse the page
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all tables
            tables = soup.find_all('table')
            
            if not tables:
                if page == 0:
                    self.logger.warning(f"No tables found on {url}")
                break
            
            # Extract each table
            for i, table in enumerate(tables):
                try:
                    # Use pandas to extract table
                    dfs = pd.read_html(str(table))
                    for df in dfs:
                        all_tables.append(df)
                except Exception as e:
                    self.logger.warning(f"Failed to extract table {i}: {str(e)}")
            
            # Check for pagination
            if page < max_pages - 1:
                # Look for a next page link
                next_link = soup.find('a', string='Next') or \
                            soup.find('a', string='next') or \
                            soup.find('a', class_='next') or \
                            soup.find('a', rel='next')
                            
                if next_link and next_link.get('href'):
                    next_url = next_link['href']
                    # Handle relative URLs
                    current_url = urljoin(url, next_url)
                    time.sleep(delay)  # Be respectful with delay
                else:
                    break  # No more pages
            
        if not all_tables:
            raise ValueError("No tables found on the page")
        
        # Combine all tables if multiple were found
        if len(all_tables) == 1:
            return all_tables[0]
        else:
            # Create a multi-level dataframe with table numbers
            result = pd.concat(all_tables, keys=range(len(all_tables)))
            result = result.reset_index(level=0).rename(columns={'level_0': 'table_num'})
            return result
    
    def _scrape_links(self, url, headers, timeout, max_pages=1, delay=1):
        """Scrape all links from the URL and return as DataFrame"""
        all_links = []
        visited_urls = set()
        urls_to_visit = [url]
        
        for _ in range(min(max_pages, len(urls_to_visit))):
            current_url = urls_to_visit.pop(0)
            if current_url in visited_urls:
                continue
                
            visited_urls.add(current_url)
            
            try:
                response = self.session.get(current_url, headers=headers, timeout=timeout)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract all links
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    text = link.get_text(strip=True)
                    
                    # Handle relative URLs
                    full_url = urljoin(current_url, href)
                    
                    # Only add URLs from the same domain
                    if urlparse(full_url).netloc == urlparse(url).netloc:
                        all_links.append({
                            'url': full_url,
                            'text': text if text else None,
                            'source_page': current_url
                        })
                        
                        # Add to URLs to visit if within max_pages
                        if len(urls_to_visit) < max_pages:
                            urls_to_visit.append(full_url)
                
                time.sleep(delay)  # Be respectful with delay
                
            except Exception as e:
                self.logger.warning(f"Failed to scrape links from {current_url}: {str(e)}")
        
        if not all_links:
            raise ValueError("No links found on the page")
            
        return pd.DataFrame(all_links)
    
    def _scrape_images(self, url, headers, timeout):
        """Scrape image info from the URL and return as DataFrame"""
        response = self.session.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        images = []
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if src:
                # Handle relative URLs
                full_url = urljoin(url, src)
                
                alt = img.get('alt', '')
                width = img.get('width', 'Unknown')
                height = img.get('height', 'Unknown')
                
                images.append({
                    'url': full_url,
                    'alt_text': alt,
                    'width': width,
                    'height': height
                })
        
        if not images:
            raise ValueError("No images found on the page")
            
        return pd.DataFrame(images)
    
    def _scrape_custom(self, url, css_selector, headers, timeout):
        """Scrape content using custom CSS selector"""
        response = self.session.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        elements = soup.select(css_selector)
        
        if not elements:
            raise ValueError(f"No elements found matching selector: {css_selector}")
        
        # If all elements have the same structure, try to create a DataFrame
        if all(elements[0].name == element.name for element in elements):
            # Check if elements have children with text
            if all(len(element.find_all()) > 0 for element in elements):
                # Try to extract structured data
                data = []
                for element in elements:
                    item = {}
                    for child in element.find_all():
                        key = child.name
                        value = child.get_text(strip=True)
                        if key in item:
                            # Handle duplicate keys
                            if isinstance(item[key], list):
                                item[key].append(value)
                            else:
                                item[key] = [item[key], value]
                        else:
                            item[key] = value
                    data.append(item)
                
                if data:
                    return pd.DataFrame(data)
        
        # Default: return text content of each element
        results = [elem.get_text(strip=True) for elem in elements]
        
        if len(results) == 1:
            return results[0]
        else:
            return pd.DataFrame({'content': results})
