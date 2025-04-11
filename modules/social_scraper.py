import os
import logging
import pandas as pd
import requests
import time
import re
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from urllib.parse import quote_plus

class SocialMediaScraper:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        self.session = requests.Session()
        
        # Set default headers
        self.default_headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
        }
        
    def scrape(self, platform, query_type=None, query="", limit=100, 
               date_range="Last week", include_metadata=True, include_replies=True):
        """
        Scrape data from social media platforms.
        
        Args:
            platform (str): The social media platform to scrape
            query_type (str, optional): Type of query (Username, Hashtag, etc.)
            query (str): The search term
            limit (int): Maximum number of items to retrieve
            date_range (str): Time period for data
            include_metadata (bool): Whether to include additional metadata
            include_replies (bool): Whether to include replies/comments
            
        Returns:
            DataFrame: Scraped social media data
        """
        # Convert date range to datetime objects
        date_from = self._parse_date_range(date_range)
        
        try:
            if platform == "Twitter/X":
                return self._scrape_twitter(query_type, query, limit, date_from, include_metadata, include_replies)
            elif platform == "Reddit":
                return self._scrape_reddit(query_type, query, limit, date_from, include_metadata, include_replies)
            elif platform == "YouTube Comments":
                return self._scrape_youtube_comments(query, limit, date_from, include_metadata)
            elif platform == "Instagram (Public)":
                return self._scrape_instagram(query_type, query, limit, date_from, include_metadata)
            elif platform == "HackerNews":
                return self._scrape_hackernews(query_type, query, limit, date_from, include_metadata)
            else:
                raise ValueError(f"Unsupported platform: {platform}")
        
        except Exception as e:
            self.logger.error(f"Error scraping {platform}: {str(e)}")
            raise RuntimeError(f"Failed to scrape data from {platform}: {str(e)}")
    
    def _parse_date_range(self, date_range):
        """Convert date range string to datetime object"""
        now = datetime.now()
        
        if date_range == "Last 24 hours":
            return now - timedelta(days=1)
        elif date_range == "Last week":
            return now - timedelta(weeks=1)
        elif date_range == "Last month":
            return now - timedelta(days=30)
        else:  # "All time"
            return now - timedelta(days=3650)  # ~10 years
    
    def _scrape_twitter(self, query_type, query, limit, date_from, include_metadata, include_replies):
        """
        Extract data from Twitter/X using the search functionality on Nitter.
        This is a limited implementation as Twitter's official API requires authentication.
        
        Note: This method may stop working if Twitter changes their site structure.
        """
        self.logger.info(f"Scraping Twitter for {query_type}: {query}")
        
        # Due to Twitter API restrictions, we use a simplified approach with Nitter
        # Nitter is an alternative Twitter front-end that's more scraper-friendly
        nitter_instances = [
            "https://nitter.net/",
            "https://nitter.unixfox.eu/", 
            "https://nitter.kavin.rocks/",
            "https://nitter.1d4.us/",
        ]
        
        tweets = []
        working_instance = None
        
        # Try to find a working Nitter instance
        for instance in nitter_instances:
            try:
                response = self.session.get(instance, headers=self.default_headers, timeout=10)
                if response.status_code == 200:
                    working_instance = instance
                    break
            except:
                continue
        
        if not working_instance:
            self.logger.error("No working Nitter instance found")
            # Fallback to basic search results scraping
            return self._twitter_search_fallback(query, limit)
        
        # Construct the appropriate URL based on query_type
        if query_type == "Username":
            url = f"{working_instance}{query.strip('@')}"
        elif query_type == "Hashtag":
            url = f"{working_instance}search?f=tweets&q=%23{query.strip('#')}"
        elif query_type == "Keyword":
            url = f"{working_instance}search?f=tweets&q={quote_plus(query)}"
        else:
            raise ValueError(f"Unsupported Twitter query type: {query_type}")
        
        try:
            response = self.session.get(url, headers=self.default_headers, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract tweets
            tweet_elements = soup.select('.timeline-item')
            
            for tweet in tweet_elements[:limit]:
                try:
                    # Extract tweet content
                    content_elem = tweet.select_one('.tweet-content')
                    content = content_elem.get_text(strip=True) if content_elem else ""
                    
                    # Extract username and full name
                    username_elem = tweet.select_one('.username')
                    username = username_elem.get_text(strip=True) if username_elem else ""
                    
                    fullname_elem = tweet.select_one('.fullname')
                    fullname = fullname_elem.get_text(strip=True) if fullname_elem else ""
                    
                    # Extract timestamp
                    time_elem = tweet.select_one('.tweet-date a')
                    timestamp = time_elem['title'] if time_elem and 'title' in time_elem.attrs else ""
                    
                    # Try to parse the timestamp
                    date_posted = None
                    if timestamp:
                        try:
                            date_posted = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S')
                        except:
                            pass
                    
                    # Skip tweets older than date_from
                    if date_posted and date_posted < date_from:
                        continue
                    
                    # Extract stats
                    stats = {}
                    if include_metadata:
                        stats_container = tweet.select('.tweet-stats .icon-container')
                        for stat in stats_container:
                            stat_text = stat.get_text(strip=True)
                            if 'reply' in stat_text.lower():
                                stats['replies'] = self._extract_number(stat_text)
                            elif 'retweet' in stat_text.lower():
                                stats['retweets'] = self._extract_number(stat_text)
                            elif 'like' in stat_text.lower():
                                stats['likes'] = self._extract_number(stat_text)
                    
                    # Extract link to the tweet
                    link = ""
                    link_elem = tweet.select_one('.tweet-link')
                    if link_elem:
                        link = "https://twitter.com" + link_elem['href']
                    
                    tweet_data = {
                        'username': username,
                        'fullname': fullname,
                        'content': content,
                        'timestamp': timestamp,
                        'link': link,
                    }
                    
                    # Add metadata if requested
                    if include_metadata:
                        tweet_data.update(stats)
                    
                    tweets.append(tweet_data)
                    
                    # Break if we've reached the limit
                    if len(tweets) >= limit:
                        break
                        
                except Exception as e:
                    self.logger.warning(f"Error parsing tweet: {str(e)}")
            
            if not tweets:
                self.logger.warning("No tweets found")
                return pd.DataFrame([{"message": "No tweets found for the given criteria"}])
            
            return pd.DataFrame(tweets)
            
        except Exception as e:
            self.logger.error(f"Error scraping Twitter: {str(e)}")
            # Fall back to alternative approach
            return self._twitter_search_fallback(query, limit)
    
    def _twitter_search_fallback(self, query, limit):
        """Fallback method that returns a template with search instructions"""
        self.logger.info("Using Twitter fallback method")
        
        # Create a dataframe with instructions on how to use the Twitter API
        instructions = [{
            'message': "Twitter data could not be retrieved due to API limitations.",
            'solution': "To scrape Twitter data, you need to:",
            'step1': "1. Sign up for Twitter API access",
            'step2': "2. Get API credentials and add them to your environment",
            'step3': f"3. Use Tweepy to search for: {query}",
            'code_example': "import tweepy\n\nauth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret, access_token, access_token_secret)\napi = tweepy.API(auth)\n\ntweets = api.search_tweets(q='query', count=100)",
            'note': "Due to Twitter's API changes, you may need a paid plan to access their API."
        }]
        
        return pd.DataFrame(instructions)
    
    def _extract_number(self, text):
        """Extract a number from text like '10 replies' -> 10"""
        if not text:
            return 0
            
        matches = re.findall(r'\d+', text)
        if matches:
            return int(matches[0])
        return 0
    
    def _scrape_reddit(self, query_type, query, limit, date_from, include_metadata, include_replies):
        """
        Extract data from Reddit using their JSON API.
        This doesn't require authentication for basic browsing.
        """
        self.logger.info(f"Scraping Reddit for {query_type}: {query}")
        
        posts = []
        
        try:
            # Construct the appropriate URL based on query_type
            if query_type == "Subreddit":
                url = f"https://www.reddit.com/r/{query.strip('r/').strip('/')}.json?limit={min(limit, 100)}"
            elif query_type == "User":
                url = f"https://www.reddit.com/user/{query.strip('u/').strip('/')}/submitted.json?limit={min(limit, 100)}"
            elif query_type == "Search Term":
                url = f"https://www.reddit.com/search.json?q={quote_plus(query)}&limit={min(limit, 100)}"
            else:
                raise ValueError(f"Unsupported Reddit query type: {query_type}")
            
            # Use old.reddit.com as it's more scraper-friendly
            headers = self.default_headers.copy()
            headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            
            response = self.session.get(url, headers=headers, timeout=15)
            response.raise_for_status()
            
            data = response.json()
            
            # Extract posts
            if 'data' in data and 'children' in data['data']:
                for post in data['data']['children'][:limit]:
                    post_data = post['data']
                    
                    # Skip if post is older than date_from
                    created_utc = post_data.get('created_utc', 0)
                    post_date = datetime.fromtimestamp(created_utc)
                    if post_date < date_from:
                        continue
                    
                    # Basic post data
                    post_info = {
                        'title': post_data.get('title', ''),
                        'author': post_data.get('author', ''),
                        'subreddit': post_data.get('subreddit', ''),
                        'selftext': post_data.get('selftext', ''),
                        'url': post_data.get('url', ''),
                        'permalink': f"https://www.reddit.com{post_data.get('permalink', '')}",
                        'created_utc': post_date.strftime('%Y-%m-%d %H:%M:%S'),
                    }
                    
                    # Add metadata if requested
                    if include_metadata:
                        post_info.update({
                            'score': post_data.get('score', 0),
                            'upvote_ratio': post_data.get('upvote_ratio', 0),
                            'num_comments': post_data.get('num_comments', 0),
                            'is_video': post_data.get('is_video', False),
                            'is_original_content': post_data.get('is_original_content', False),
                            'is_self': post_data.get('is_self', False),
                        })
                    
                    # Fetch comments if requested
                    if include_replies and post_data.get('num_comments', 0) > 0:
                        try:
                            comments_url = f"https://www.reddit.com{post_data.get('permalink', '')}.json"
                            comments_response = self.session.get(comments_url, headers=headers, timeout=15)
                            comments_data = comments_response.json()
                            
                            if len(comments_data) > 1 and 'data' in comments_data[1] and 'children' in comments_data[1]['data']:
                                # Get top 5 comments
                                top_comments = []
                                for comment in comments_data[1]['data']['children'][:5]:
                                    if comment['kind'] == 't1':  # Comment type
                                        comment_data = comment['data']
                                        top_comments.append({
                                            'author': comment_data.get('author', ''),
                                            'body': comment_data.get('body', ''),
                                            'score': comment_data.get('score', 0),
                                            'created_utc': datetime.fromtimestamp(
                                                comment_data.get('created_utc', 0)
                                            ).strftime('%Y-%m-%d %H:%M:%S'),
                                        })
                                
                                post_info['top_comments'] = top_comments
                            
                            # Be respectful with API rate limits
                            time.sleep(1)
                            
                        except Exception as e:
                            self.logger.warning(f"Error fetching comments: {str(e)}")
                    
                    posts.append(post_info)
            
            if not posts:
                self.logger.warning("No Reddit posts found")
                return pd.DataFrame([{"message": "No Reddit posts found for the given criteria"}])
            
            return pd.DataFrame(posts)
            
        except Exception as e:
            self.logger.error(f"Error scraping Reddit: {str(e)}")
            # Return a template with instructions
            instructions = [{
                'message': f"Reddit data could not be retrieved: {str(e)}",
                'solution': "To scrape Reddit data, you can:",
                'step1': "1. Use PRAW (Python Reddit API Wrapper)",
                'step2': "2. Set up Reddit API credentials",
                'code_example': "import praw\n\nreddit = praw.Reddit(client_id='YOUR_CLIENT_ID', client_secret='YOUR_CLIENT_SECRET', user_agent='YOUR_USER_AGENT')\n\nsubreddit = reddit.subreddit('python')\nfor post in subreddit.hot(limit=10):\n    print(post.title)",
            }]
            
            return pd.DataFrame(instructions)
    
    def _scrape_youtube_comments(self, video_url, limit, date_from, include_metadata):
        """
        Extract comments from a YouTube video.
        Note: This method uses a limited approach as YouTube's API requires authentication.
        """
        self.logger.info(f"Scraping YouTube comments for: {video_url}")
        
        # Extract video ID from URL
        video_id = None
        if "youtube.com/watch" in video_url:
            video_id = video_url.split("v=")[1].split("&")[0]
        elif "youtu.be/" in video_url:
            video_id = video_url.split("youtu.be/")[1].split("?")[0]
        
        if not video_id:
            raise ValueError("Invalid YouTube URL. Please provide a valid YouTube video URL.")
        
        comments = []
        
        try:
            # Use the Invidious API, which is a YouTube front-end that's more scraper-friendly
            invidious_instances = [
                "https://invidious.snopyta.org",
                "https://invidious.kavin.rocks",
                "https://invidio.us",
            ]
            
            working_instance = None
            
            # Find a working Invidious instance
            for instance in invidious_instances:
                try:
                    response = self.session.get(f"{instance}/api/v1/videos/{video_id}", 
                                                headers=self.default_headers, timeout=10)
                    if response.status_code == 200:
                        working_instance = instance
                        break
                except:
                    continue
            
            if not working_instance:
                # Fallback to youtube-comment-downloader
                return self._youtube_comments_fallback(video_url, limit)
            
            # Get video details
            video_response = self.session.get(f"{working_instance}/api/v1/videos/{video_id}", 
                                             headers=self.default_headers, timeout=15)
            video_response.raise_for_status()
            video_data = video_response.json()
            
            # Get comments
            comments_response = self.session.get(f"{working_instance}/api/v1/comments/{video_id}", 
                                                headers=self.default_headers, timeout=15)
            comments_response.raise_for_status()
            comments_data = comments_response.json()
            
            if 'comments' in comments_data:
                for comment in comments_data['comments'][:limit]:
                    comment_info = {
                        'author': comment.get('author', ''),
                        'text': comment.get('content', ''),
                        'published': comment.get('published', ''),
                    }
                    
                    # Add metadata if requested
                    if include_metadata:
                        comment_info.update({
                            'likes': comment.get('likeCount', 0),
                            'is_owner': comment.get('authorIsChannelOwner', False),
                            'replies': len(comment.get('replies', [])),
                        })
                    
                    comments.append(comment_info)
            
            # Add video details as the first row
            video_info = {
                'video_title': video_data.get('title', ''),
                'video_author': video_data.get('author', ''),
                'video_published': video_data.get('published', ''),
                'description': video_data.get('description', ''),
            }
            
            # Add metadata if requested
            if include_metadata:
                video_info.update({
                    'view_count': video_data.get('viewCount', 0),
                    'like_count': video_data.get('likeCount', 0),
                    'dislike_count': video_data.get('dislikeCount', 0),
                    'subscriber_count': video_data.get('subCount', 0),
                    'length_seconds': video_data.get('lengthSeconds', 0),
                    'video_type': 'video_info'
                })
            
            comments.insert(0, video_info)
            
            if len(comments) <= 1:
                self.logger.warning("No comments found")
                comments.append({"text": "No comments found for this video"})
            
            return pd.DataFrame(comments)
            
        except Exception as e:
            self.logger.error(f"Error scraping YouTube comments: {str(e)}")
            return self._youtube_comments_fallback(video_url, limit)
    
    def _youtube_comments_fallback(self, video_url, limit):
        """Fallback method that returns a template with instructions for YouTube comments"""
        self.logger.info("Using YouTube comments fallback method")
        
        # Extract video ID from URL
        video_id = None
        if "youtube.com/watch" in video_url:
            video_id = video_url.split("v=")[1].split("&")[0]
        elif "youtu.be/" in video_url:
            video_id = video_url.split("youtu.be/")[1].split("?")[0]
        
        # Create a dataframe with instructions
        instructions = [{
            'message': "YouTube comments could not be retrieved due to API limitations.",
            'solution': "To scrape YouTube comments, you need to:",
            'step1': "1. Sign up for YouTube Data API access",
            'step2': "2. Get API credentials and add them to your environment",
            'step3': f"3. Use the YouTube API to fetch comments for video: {video_id}",
            'code_example': "from googleapiclient.discovery import build\n\nyoutube = build('youtube', 'v3', developerKey='YOUR_API_KEY')\n\nresponse = youtube.commentThreads().list(part='snippet', videoId='VIDEO_ID', maxResults=100).execute()",
            'alternative': "Alternatively, you can use the youtube-comment-downloader package",
            'alternative_code': "pip install youtube-comment-downloader\n\nfrom youtube_comment_downloader import YoutubeCommentDownloader\n\ndownloader = YoutubeCommentDownloader()\ncomments = downloader.get_comments_from_url('https://www.youtube.com/watch?v=VIDEO_ID')",
        }]
        
        return pd.DataFrame(instructions)
    
    def _scrape_instagram(self, query_type, query, limit, date_from, include_metadata):
        """
        Extract public data from Instagram profiles or hashtags.
        Note: This method has limited functionality as Instagram restricts scraping.
        """
        self.logger.info(f"Scraping Instagram for {query_type}: {query}")
        
        # Instagram heavily restricts scraping, so we'll provide a template
        instructions = [{
            'message': "Instagram data could not be retrieved due to platform restrictions.",
            'limitation': "Instagram actively prevents web scraping and requires authentication.",
            'solution': "To scrape Instagram data, you need to:",
            'step1': "1. Use the Instagram Graph API (requires a Facebook Developer account)",
            'step2': "2. Set up a Facebook App and get Instagram API credentials",
            'step3': f"3. Use the API to fetch data for: {query}",
            'code_example': "from instagram_private_api import Client\n\napi = Client(username, password)\n\nif query_type == 'Username':\n    user_info = api.username_info(query)\n    user_feed = api.user_feed(user_info['user']['pk'])\nelif query_type == 'Hashtag':\n    hashtag_info = api.feed_tag(query)",
            'alternative': "For legal Instagram data collection, consider:",
            'option1': "- Using the official Instagram API with proper authentication",
            'option2': "- Using a third-party service that provides Instagram data legally",
            'option3': "- Manually collecting data with permission from content owners",
        }]
        
        return pd.DataFrame(instructions)
    
    def _scrape_hackernews(self, query_type, query, limit, date_from, include_metadata):
        """
        Extract data from Hacker News using their API.
        This method doesn't require authentication.
        """
        self.logger.info(f"Scraping HackerNews for {query_type}: {query}")
        
        stories = []
        
        try:
            # Base API URL
            api_base = "https://hacker-news.firebaseio.com/v0"
            
            # Determine which stories to fetch based on query_type
            if query_type == "Top Stories":
                stories_url = f"{api_base}/topstories.json"
            elif query_type == "New Stories":
                stories_url = f"{api_base}/newstories.json"
            elif query_type == "Ask HN":
                stories_url = f"{api_base}/askstories.json"
            elif query_type == "Show HN":
                stories_url = f"{api_base}/showstories.json"
            else:
                raise ValueError(f"Unsupported HackerNews query type: {query_type}")
            
            # Get list of story IDs
            response = self.session.get(stories_url, headers=self.default_headers, timeout=15)
            response.raise_for_status()
            story_ids = response.json()
            
            # Process each story up to the limit
            for story_id in story_ids[:limit]:
                # Get story details
                story_url = f"{api_base}/item/{story_id}.json"
                story_response = self.session.get(story_url, headers=self.default_headers, timeout=15)
                story_response.raise_for_status()
                story_data = story_response.json()
                
                # Skip if no data or if it's older than date_from
                if not story_data or 'time' not in story_data:
                    continue
                    
                story_date = datetime.fromtimestamp(story_data.get('time', 0))
                if story_date < date_from:
                    continue
                
                # Check if the story matches the query (if provided)
                if query and not self._matches_query(story_data, query):
                    continue
                
                # Basic story data
                story_info = {
                    'title': story_data.get('title', ''),
                    'by': story_data.get('by', ''),
                    'time': story_date.strftime('%Y-%m-%d %H:%M:%S'),
                    'url': story_data.get('url', ''),
                    'text': story_data.get('text', ''),
                    'type': story_data.get('type', ''),
                }
                
                # Add HN link
                story_info['hn_link'] = f"https://news.ycombinator.com/item?id={story_id}"
                
                # Add metadata if requested
                if include_metadata:
                    story_info.update({
                        'score': story_data.get('score', 0),
                        'descendants': story_data.get('descendants', 0),  # Comment count
                    })
                
                # Fetch top-level comments if requested and if there are any
                if include_replies and story_data.get('kids', []):
                    top_comments = []
                    
                    # Get up to 5 top-level comments
                    for kid_id in story_data.get('kids', [])[:5]:
                        try:
                            comment_url = f"{api_base}/item/{kid_id}.json"
                            comment_response = self.session.get(comment_url, headers=self.default_headers, timeout=15)
                            comment_data = comment_response.json()
                            
                            if comment_data and comment_data.get('type') == 'comment':
                                comment_info = {
                                    'by': comment_data.get('by', ''),
                                    'text': comment_data.get('text', ''),
                                    'time': datetime.fromtimestamp(
                                        comment_data.get('time', 0)
                                    ).strftime('%Y-%m-%d %H:%M:%S'),
                                }
                                
                                if include_metadata:
                                    comment_info['reply_count'] = len(comment_data.get('kids', []))
                                
                                top_comments.append(comment_info)
                            
                            # Be respectful with rate limits
                            time.sleep(0.1)
                            
                        except Exception as e:
                            self.logger.warning(f"Error fetching comment {kid_id}: {str(e)}")
                    
                    story_info['top_comments'] = top_comments
                
                stories.append(story_info)
            
            if not stories:
                self.logger.warning("No HackerNews stories found")
                return pd.DataFrame([{"message": "No HackerNews stories found for the given criteria"}])
            
            return pd.DataFrame(stories)
            
        except Exception as e:
            self.logger.error(f"Error scraping HackerNews: {str(e)}")
            
            # Return a template with instructions
            instructions = [{
                'message': f"HackerNews data could not be retrieved: {str(e)}",
                'solution': "To scrape HackerNews data, you can use the official API:",
                'api_docs': "https://github.com/HackerNews/API",
                'code_example': "import requests\n\n# Get top stories\ntop_stories = requests.get('https://hacker-news.firebaseio.com/v0/topstories.json').json()\n\n# Get story details\nfor story_id in top_stories[:10]:\n    story = requests.get(f'https://hacker-news.firebaseio.com/v0/item/{story_id}.json').json()\n    print(story['title'])",
            }]
            
            return pd.DataFrame(instructions)
    
    def _matches_query(self, data, query):
        """Check if the data matches the query string"""
        if not query:
            return True
            
        query = query.lower()
        
        # Check title
        if 'title' in data and query in data['title'].lower():
            return True
            
        # Check text
        if 'text' in data and data['text'] and query in data['text'].lower():
            return True
            
        # Check URL
        if 'url' in data and data['url'] and query in data['url'].lower():
            return True
            
        # Check author
        if 'by' in data and query in data['by'].lower():
            return True
            
        return False
