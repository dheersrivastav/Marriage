import os
import json
import time
import logging
import pandas as pd
from openai import OpenAI

class AIAssistant:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Initialize OpenAI client
        self.openai_api_key = os.environ.get("OPENAI_API_KEY")
        if self.openai_api_key:
            self.client = OpenAI(api_key=self.openai_api_key)
            self.is_ai_available = True
        else:
            self.logger.warning("OpenAI API key not found. AI features will be limited.")
            self.is_ai_available = False
    
    def get_processing_suggestions(self, data):
        """
        Get AI suggestions for data processing based on the scraped data.
        
        Args:
            data: The scraped data (DataFrame or text)
            
        Returns:
            dict: Suggestions for data processing
        """
        if not self.is_ai_available:
            return self._get_fallback_processing_suggestions(data)
        
        try:
            # Prepare the data sample
            data_sample = self._prepare_data_sample(data)
            
            # Create the prompt
            prompt = f"""You are a data science expert helping with web scraping and data extraction.
            
            Analyze this data sample and provide specific suggestions for cleaning and processing it:
            
            {data_sample}
            
            Provide recommendations for:
            1. Data cleaning (handling missing values, duplicates, etc.)
            2. Data transformation (type conversions, normalization, etc.)
            3. Feature extraction (what insights could be derived)
            4. Potential issues to watch out for
            
            Format your response as:
            - Overview: [Brief assessment of the data quality and structure]
            - Cleaning Recommendations: [Bullet points]
            - Transformation Recommendations: [Bullet points]
            - Feature Extraction Ideas: [Bullet points]
            - Potential Issues: [Bullet points]
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000,
                temperature=0.2
            )
            
            suggestions = response.choices[0].message.content
            return suggestions
            
        except Exception as e:
            self.logger.error(f"Error getting AI processing suggestions: {str(e)}")
            return self._get_fallback_processing_suggestions(data)
    
    def _get_fallback_processing_suggestions(self, data):
        """Generate fallback suggestions when AI is unavailable"""
        if isinstance(data, pd.DataFrame):
            columns = data.columns.tolist()
            
            suggestions = f"""
            # Data Processing Suggestions
            
            ## Overview
            The data appears to be in tabular format with {len(data)} rows and {len(columns)} columns.
            
            ## Cleaning Recommendations
            - Check for and remove duplicate rows
            - Handle missing values in the dataset
            - Standardize text fields (lowercase, remove special characters)
            
            ## Transformation Recommendations
            - Convert date/time columns to proper datetime format
            - Extract numerical values from text where applicable
            - Normalize numerical columns if needed
            
            ## Feature Extraction Ideas
            - Calculate text length for content columns
            - Extract entities or keywords from text fields
            - Create categorical variables from text data
            
            ## Potential Issues
            - Data might contain inconsistent formatting
            - Text fields may require special handling for analysis
            - Watch for outliers in numerical columns
            """
        else:
            # Text data
            text_sample = str(data)[:500] + "..." if len(str(data)) > 500 else str(data)
            
            suggestions = f"""
            # Text Processing Suggestions
            
            ## Overview
            The data appears to be in text format with approximately {len(str(data))} characters.
            
            ## Cleaning Recommendations
            - Remove HTML/XML tags if present
            - Remove extra whitespace and special characters
            - Fix encoding issues if any are detected
            
            ## Transformation Recommendations
            - Convert to lowercase for consistency
            - Remove stopwords for better analysis
            - Consider stemming or lemmatization for text analysis
            
            ## Feature Extraction Ideas
            - Extract key phrases or entities
            - Perform sentiment analysis
            - Extract dates, numbers, or other structured data
            
            ## Potential Issues
            - Text may contain mixed content or formats
            - Special characters might need custom handling
            - Long text might need chunking for processing
            """
        
        return suggestions
    
    def get_social_analysis_suggestions(self, platform, data):
        """
        Get AI suggestions for social media data analysis.
        
        Args:
            platform: The social media platform
            data: The scraped data
            
        Returns:
            str: Suggestions for social data analysis
        """
        if not self.is_ai_available:
            return self._get_fallback_social_suggestions(platform, data)
        
        try:
            # Prepare the data sample
            data_sample = self._prepare_data_sample(data)
            
            # Create the prompt
            prompt = f"""You are a social media analytics expert.
            
            Analyze this {platform} data sample and provide specific suggestions for analyzing it:
            
            {data_sample}
            
            Provide recommendations for:
            1. Content analysis (themes, topics, sentiment)
            2. Engagement analysis (what drives interaction)
            3. User behavior insights
            4. Visualization ideas
            
            Format your response as:
            - Overview: [Brief assessment of the data]
            - Content Analysis Ideas: [Bullet points]
            - Engagement Analysis Ideas: [Bullet points]
            - User Behavior Insights: [Bullet points]
            - Recommended Visualizations: [Bullet points]
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000,
                temperature=0.2
            )
            
            suggestions = response.choices[0].message.content
            return suggestions
            
        except Exception as e:
            self.logger.error(f"Error getting AI social analysis suggestions: {str(e)}")
            return self._get_fallback_social_suggestions(platform, data)
    
    def _get_fallback_social_suggestions(self, platform, data):
        """Generate fallback social suggestions when AI is unavailable"""
        columns = []
        if isinstance(data, pd.DataFrame):
            columns = data.columns.tolist()
        
        suggestions = f"""
        # {platform} Analysis Suggestions
        
        ## Overview
        The data contains information from {platform} with {len(data)} entries.
        
        ## Content Analysis Ideas
        - Analyze frequently used words or hashtags
        - Detect overall sentiment (positive/negative/neutral)
        - Identify common themes or topics
        
        ## Engagement Analysis Ideas
        - Compare engagement metrics (likes, shares, comments)
        - Identify factors that correlate with higher engagement
        - Analyze time patterns in engagement
        
        ## User Behavior Insights
        - Identify most active users or contributors
        - Analyze posting frequency and patterns
        - Look for conversation threads or interactions
        
        ## Recommended Visualizations
        - Word cloud of most common terms
        - Bar chart of engagement metrics
        - Time series of posting activity
        - Network graph of user interactions (if applicable)
        """
        
        return suggestions
    
    def suggest_data_cleaning(self, data):
        """
        Get AI suggestions for specific data cleaning operations.
        
        Args:
            data: DataFrame to analyze
            
        Returns:
            str: Detailed cleaning suggestions
        """
        if not self.is_ai_available:
            return self._get_fallback_cleaning_suggestions(data)
        
        try:
            # Prepare the data sample and stats
            data_sample = self._prepare_data_sample(data)
            
            # Add basic statistics
            data_stats = ""
            if isinstance(data, pd.DataFrame):
                # Get data types and missing values count
                dtypes = data.dtypes.to_dict()
                na_counts = data.isna().sum().to_dict()
                
                data_stats = "Data Types:\n"
                for col, dtype in dtypes.items():
                    data_stats += f"- {col}: {dtype}, Missing: {na_counts[col]}\n"
                
                # Check for duplicates
                dup_count = data.duplicated().sum()
                data_stats += f"\nDuplicate Rows: {dup_count}\n"
            
            # Create the prompt
            prompt = f"""You are a data cleaning expert.
            
            Analyze this dataset and provide specific cleaning operations needed:
            
            Data Statistics:
            {data_stats}
            
            Data Sample:
            {data_sample}
            
            Provide specific cleaning operations needed, including:
            1. Which columns need null value handling and how (removal, imputation, etc.)
            2. Which columns need type conversion and to what types
            3. Which columns need text cleaning and how
            4. Any row filtering recommendations
            5. Any outlier handling needed
            
            Format your response as JSON with these fields:
            - "overview": Brief assessment of overall data quality
            - "operations": Array of cleaning operations needed with these fields:
              - "column": Column name (or "all" for row operations)
              - "issue": Description of the issue
              - "recommendation": Specific recommended action
              - "priority": High/Medium/Low
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=1500,
                temperature=0.2
            )
            
            suggestions = json.loads(response.choices[0].message.content)
            return suggestions
            
        except Exception as e:
            self.logger.error(f"Error getting AI cleaning suggestions: {str(e)}")
            return self._get_fallback_cleaning_suggestions(data)
    
    def _get_fallback_cleaning_suggestions(self, data):
        """Generate fallback cleaning suggestions when AI is unavailable"""
        if not isinstance(data, pd.DataFrame):
            return {
                "overview": "The data is not in tabular format. Consider converting to structured format.",
                "operations": [
                    {
                        "column": "all",
                        "issue": "Unstructured text data",
                        "recommendation": "Apply text cleaning (remove HTML, extra whitespace, etc.)",
                        "priority": "High"
                    }
                ]
            }
        
        # Generate basic cleaning suggestions for DataFrame
        operations = []
        
        # Check for missing values
        na_cols = data.isna().sum()
        na_cols = na_cols[na_cols > 0]
        for col, count in na_cols.items():
            operations.append({
                "column": col,
                "issue": f"Missing values ({count})",
                "recommendation": "Fill missing values or drop rows with missing values",
                "priority": "High" if count/len(data) > 0.1 else "Medium"
            })
        
        # Check for duplicates
        if data.duplicated().sum() > 0:
            operations.append({
                "column": "all",
                "issue": f"Duplicate rows ({data.duplicated().sum()})",
                "recommendation": "Remove duplicate rows",
                "priority": "High"
            })
        
        # Suggest type conversions
        for col, dtype in data.dtypes.items():
            if dtype == 'object':
                sample_val = data[col].dropna().iloc[0] if not data[col].dropna().empty else ""
                if isinstance(sample_val, str):
                    if sample_val.isdigit():
                        operations.append({
                            "column": col,
                            "issue": "Text column with numeric values",
                            "recommendation": "Convert to numeric type",
                            "priority": "Medium"
                        })
                    elif any(x in sample_val.lower() for x in ['date', 'time', 'day', 'month', 'year']):
                        operations.append({
                            "column": col,
                            "issue": "Potential datetime column",
                            "recommendation": "Convert to datetime type",
                            "priority": "Medium"
                        })
        
        # Text cleaning for string columns
        for col in data.select_dtypes(include=['object']).columns:
            operations.append({
                "column": col,
                "issue": "Text data may need cleaning",
                "recommendation": "Clean text (lowercase, remove special chars, etc.)",
                "priority": "Medium"
            })
        
        return {
            "overview": f"The dataset has {len(data)} rows and {len(data.columns)} columns with some quality issues to address.",
            "operations": operations
        }
    
    def apply_cleaning_suggestions(self, data, suggestions):
        """
        Apply AI-suggested cleaning operations to the data.
        
        Args:
            data: DataFrame to clean
            suggestions: Cleaning suggestions from AI
            
        Returns:
            DataFrame: Cleaned data
        """
        if not isinstance(data, pd.DataFrame):
            return data
            
        cleaned_data = data.copy()
        
        try:
            # Apply each recommended operation
            for operation in suggestions.get("operations", []):
                column = operation.get("column")
                recommendation = operation.get("recommendation", "").lower()
                
                # Skip "all" operations for now - handle specially
                if column == "all":
                    if "duplicate" in recommendation:
                        cleaned_data = cleaned_data.drop_duplicates()
                    continue
                
                # Skip if column doesn't exist
                if column not in cleaned_data.columns:
                    continue
                
                # Apply column-specific operations
                if "missing" in recommendation or "null" in recommendation:
                    if "drop" in recommendation:
                        cleaned_data = cleaned_data.dropna(subset=[column])
                    elif "mean" in recommendation:
                        if pd.api.types.is_numeric_dtype(cleaned_data[column]):
                            cleaned_data[column] = cleaned_data[column].fillna(cleaned_data[column].mean())
                    elif "median" in recommendation:
                        if pd.api.types.is_numeric_dtype(cleaned_data[column]):
                            cleaned_data[column] = cleaned_data[column].fillna(cleaned_data[column].median())
                    elif "mode" in recommendation:
                        cleaned_data[column] = cleaned_data[column].fillna(cleaned_data[column].mode()[0])
                    elif "forward" in recommendation:
                        cleaned_data[column] = cleaned_data[column].ffill()
                    elif "backward" in recommendation:
                        cleaned_data[column] = cleaned_data[column].bfill()
                    else:
                        # Default to empty string for object columns, 0 for numeric
                        if pd.api.types.is_numeric_dtype(cleaned_data[column]):
                            cleaned_data[column] = cleaned_data[column].fillna(0)
                        else:
                            cleaned_data[column] = cleaned_data[column].fillna("")
                
                elif "convert" in recommendation and "numeric" in recommendation:
                    try:
                        cleaned_data[column] = pd.to_numeric(cleaned_data[column], errors='coerce')
                    except:
                        pass
                
                elif "convert" in recommendation and "datetime" in recommendation:
                    try:
                        cleaned_data[column] = pd.to_datetime(cleaned_data[column], errors='coerce')
                    except:
                        pass
                
                elif "clean text" in recommendation or "text cleaning" in recommendation:
                    if pd.api.types.is_string_dtype(cleaned_data[column]):
                        # Apply basic text cleaning
                        cleaned_data[column] = cleaned_data[column].str.lower()
                        cleaned_data[column] = cleaned_data[column].str.replace(r'[^\w\s]', '', regex=True)
                        cleaned_data[column] = cleaned_data[column].str.strip()
            
            return cleaned_data
            
        except Exception as e:
            self.logger.error(f"Error applying cleaning suggestions: {str(e)}")
            return data
    
    def suggest_visualizations(self, data):
        """
        Get AI suggestions for data visualizations.
        
        Args:
            data: DataFrame to visualize
            
        Returns:
            str: Visualization suggestions
        """
        if not self.is_ai_available:
            return self._get_fallback_visualization_suggestions(data)
        
        try:
            # Prepare the data sample and stats
            data_sample = self._prepare_data_sample(data)
            
            data_stats = ""
            if isinstance(data, pd.DataFrame):
                # Get data types and basic stats
                dtypes = data.dtypes.to_dict()
                dtypes_str = "\n".join([f"- {col}: {dtype}" for col, dtype in dtypes.items()])
                
                # Get numeric columns stats
                numeric_cols = data.select_dtypes(include=['number']).columns.tolist()
                if numeric_cols:
                    numeric_stats = data[numeric_cols].describe().to_string()
                    data_stats += f"\nNumeric column stats:\n{numeric_stats}\n\n"
                
                # Get categorical columns and counts
                categorical_cols = data.select_dtypes(include=['object', 'category']).columns.tolist()
                if categorical_cols and len(categorical_cols) < 10:  # Limit to avoid huge prompts
                    for col in categorical_cols[:3]:  # Limit to first 3 categorical columns
                        try:
                            value_counts = data[col].value_counts().head(5).to_string()
                            data_stats += f"\nTop values for {col}:\n{value_counts}\n\n"
                        except:
                            pass
            
            # Create the prompt
            prompt = f"""You are a data visualization expert.
            
            Analyze this dataset and suggest the most insightful visualizations:
            
            Data Statistics:
            {data_stats}
            
            Data Sample:
            {data_sample}
            
            Provide specific visualization recommendations, including:
            1. What type of chart/plot would be most informative
            2. Which columns to use for each visualization
            3. What insights might be revealed by each visualization
            
            Focus on the most meaningful visualizations that would reveal patterns, trends, or insights in the data.
            
            Format your response with these sections:
            - Overview: Brief assessment of the dataset visualization potential
            - Recommended Visualizations: List of recommended visualizations with details
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000,
                temperature=0.2
            )
            
            suggestions = response.choices[0].message.content
            return suggestions
            
        except Exception as e:
            self.logger.error(f"Error getting AI visualization suggestions: {str(e)}")
            return self._get_fallback_visualization_suggestions(data)
    
    def _get_fallback_visualization_suggestions(self, data):
        """Generate fallback visualization suggestions when AI is unavailable"""
        if not isinstance(data, pd.DataFrame):
            return """
            # Visualization Suggestions
            
            ## Overview
            The data is in text format, which limits visualization options. Consider converting to structured data first.
            
            ## Recommended Visualizations
            1. **Word Cloud**
               - Visualize the most frequent words in the text
               - Helps identify key themes and topics
            
            2. **Text Length Distribution**
               - Histogram of sentence or paragraph lengths
               - Helps understand text structure
            """
        
        # Basic visualization suggestions for DataFrame
        numeric_cols = data.select_dtypes(include=['number']).columns.tolist()
        categorical_cols = data.select_dtypes(include=['object', 'category']).columns.tolist()
        datetime_cols = [col for col in data.columns if pd.api.types.is_datetime64_dtype(data[col])]
        
        suggestions = """
        # Visualization Suggestions
        
        ## Overview
        """
        
        if len(data.columns) < 2:
            suggestions += "The dataset has limited columns for rich visualizations."
        else:
            suggestions += f"The dataset has {len(numeric_cols)} numeric columns, {len(categorical_cols)} categorical columns, and {len(datetime_cols)} datetime columns that can be visualized in different ways."
        
        suggestions += "\n\n## Recommended Visualizations\n"
        
        # Suggest based on column types
        if categorical_cols:
            cat_col = categorical_cols[0]
            suggestions += f"""
            1. **Bar Chart**
               - Columns: {cat_col}
               - Shows distribution of categories
               - Helps identify most frequent categories
            """
        
        if numeric_cols:
            num_col = numeric_cols[0]
            suggestions += f"""
            2. **Histogram**
               - Column: {num_col}
               - Shows distribution of values
               - Helps identify outliers and patterns
            """
        
        if len(numeric_cols) >= 2:
            suggestions += f"""
            3. **Scatter Plot**
               - Columns: {numeric_cols[0]} vs {numeric_cols[1]}
               - Shows relationship between two numeric variables
               - Helps identify correlations and clusters
            """
        
        if categorical_cols and numeric_cols:
            suggestions += f"""
            4. **Box Plot**
               - Columns: {categorical_cols[0]} (x-axis), {numeric_cols[0]} (y-axis)
               - Shows distribution of numeric values across categories
               - Helps compare distributions between groups
            """
        
        if datetime_cols and numeric_cols:
            suggestions += f"""
            5. **Line Chart**
               - Columns: {datetime_cols[0]} (x-axis), {numeric_cols[0]} (y-axis)
               - Shows trends over time
               - Helps identify seasonal patterns and trends
            """
        
        if len(numeric_cols) > 2:
            suggestions += f"""
            6. **Heatmap**
               - Columns: Multiple numeric columns
               - Shows correlations between variables
               - Helps identify relationships in the data
            """
        
        if categorical_cols:
            suggestions += f"""
            7. **Pie Chart**
               - Column: {categorical_cols[0]}
               - Shows proportion of categories
               - Best when there are few distinct categories
            """
        
        return suggestions
    
    def get_extraction_advice(self, website_url, extraction_goal):
        """
        Get AI advice for data extraction based on a website and goal.
        
        Args:
            website_url: URL of the website to analyze (optional)
            extraction_goal: Description of the extraction goal
            
        Returns:
            dict: Extraction advice
        """
        if not self.is_ai_available:
            return {
                "explanation": "AI assistance is not available. Make sure you have set the OPENAI_API_KEY environment variable.",
                "code_sample": "# Sample web scraping code\nimport requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_website(url):\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    \n    # Extract data using CSS selectors\n    # Example: titles = soup.select('h2.title')\n    \n    return data"
            }
        
        try:
            # Create the prompt
            prompt = f"""You are a web scraping and data extraction expert.
            
            Extraction Goal: {extraction_goal}
            
            """
            
            if website_url:
                prompt += f"Website URL: {website_url}\n\n"
                prompt += "Provide detailed advice for efficiently extracting the requested data from this website. Include:\n"
            else:
                prompt += "Provide detailed advice for efficiently extracting this type of data. Include:\n"
            
            prompt += """
            1. A general approach to extract the data
            2. Specific techniques or libraries to use
            3. Common challenges and how to overcome them
            4. A Python code sample demonstrating the extraction
            5. If a website URL was provided, suggest CSS selectors that might work for this website
            
            Format your response as JSON with these fields:
            - "explanation": Detailed explanation of the extraction approach
            - "code_sample": A Python code sample for the extraction
            - "css_selectors": (If applicable) An object mapping data items to likely CSS selectors
            - "challenges": An array of potential challenges and solutions
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=1500,
                temperature=0.2
            )
            
            advice = json.loads(response.choices[0].message.content)
            return advice
            
        except Exception as e:
            self.logger.error(f"Error getting AI extraction advice: {str(e)}")
            return {
                "explanation": f"Unable to generate AI advice due to an error: {str(e)}. Please try again.",
                "code_sample": "# Basic web scraping template\nimport requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_website(url):\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    \n    # Extract data using CSS selectors\n    # Example: titles = soup.select('h2.title')\n    \n    return data"
            }
    
    def get_analysis_ideas(self, data, analysis_goal):
        """
        Get AI ideas for data analysis based on the data and goal.
        
        Args:
            data: The data to analyze
            analysis_goal: Description of the analysis goal
            
        Returns:
            dict: Analysis ideas
        """
        if not self.is_ai_available:
            return {
                "explanation": "AI assistance is not available. Make sure you have set the OPENAI_API_KEY environment variable.",
                "suggested_analyses": [
                    {
                        "title": "Basic Statistical Analysis",
                        "description": "Calculate descriptive statistics like mean, median, and standard deviation for numerical columns.",
                        "code_sample": "# Basic statistical analysis\ndf.describe()"
                    },
                    {
                        "title": "Correlation Analysis",
                        "description": "Examine relationships between numerical variables.",
                        "code_sample": "# Correlation analysis\ndf.corr()"
                    }
                ]
            }
        
        try:
            # Prepare the data sample
            data_sample = self._prepare_data_sample(data)
            
            # Create the prompt
            prompt = f"""You are a data analysis expert.
            
            Analyze this data sample and suggest analysis approaches based on this goal:
            
            Analysis Goal: {analysis_goal}
            
            Data Sample:
            {data_sample}
            
            Provide specific analysis ideas, including:
            1. What analyses would be most valuable for this goal
            2. What techniques and methods to use
            3. How to interpret the results
            4. Code samples for implementing the analyses
            
            Format your response as JSON with these fields:
            - "explanation": Overview of the analysis approach
            - "suggested_analyses": Array of specific analyses, each with:
              - "title": Brief title
              - "description": Detailed explanation
              - "code_sample": Python code to implement the analysis
              - "interpretation_guide": How to interpret the results
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=2000,
                temperature=0.2
            )
            
            ideas = json.loads(response.choices[0].message.content)
            return ideas
            
        except Exception as e:
            self.logger.error(f"Error getting AI analysis ideas: {str(e)}")
            return {
                "explanation": f"Unable to generate AI analysis ideas due to an error: {str(e)}. Please try again.",
                "suggested_analyses": [
                    {
                        "title": "Basic Data Exploration",
                        "description": "Explore the basic statistics and structure of the data.",
                        "code_sample": "# Basic data exploration\nprint(df.info())\nprint(df.describe())\nprint(df.isna().sum())"
                    }
                ]
            }
    
    def generate_code(self, task_description):
        """
        Generate Python code for a given data extraction or processing task.
        
        Args:
            task_description: Description of the task
            
        Returns:
            dict: Generated code and explanation
        """
        if not self.is_ai_available:
            return {
                "code": "# Code generation requires OpenAI API access\n# Please set the OPENAI_API_KEY environment variable\n\n# Here's a basic template:\nimport requests\nfrom bs4 import BeautifulSoup\nimport pandas as pd\n\ndef scrape_data(url):\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    # Extract data based on your requirements\n    return data\n\n# Process and save the data\ndef process_and_save(data, output_file):\n    df = pd.DataFrame(data)\n    df.to_csv(output_file, index=False)\n    return df",
                "explanation": "AI code generation is not available. The template above provides a starting point for web scraping tasks."
            }
        
        try:
            # Create the prompt
            prompt = f"""You are an expert Python programmer specializing in web scraping, data extraction, and data processing.
            
            Generate well-structured, production-ready Python code for this task:
            
            Task: {task_description}
            
            Requirements:
            - The code should be well-commented and follow best practices
            - Handle errors gracefully
            - Include appropriate imports
            - Be efficient and performant
            - Follow ethical scraping practices (respect robots.txt, rate limiting, etc.)
            
            Format your response as JSON with these fields:
            - "code": The complete, executable Python code
            - "explanation": A clear explanation of how the code works
            - "setup": Any additional setup or requirements
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=2000,
                temperature=0.2
            )
            
            generated_code = json.loads(response.choices[0].message.content)
            return generated_code
            
        except Exception as e:
            self.logger.error(f"Error generating code: {str(e)}")
            return {
                "code": f"# Error generating code: {str(e)}\n\n# Basic template\nimport requests\nfrom bs4 import BeautifulSoup\nimport pandas as pd\n\ndef scrape_data(url):\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    # Extract data based on your requirements\n    return data",
                "explanation": f"Unable to generate code due to an error: {str(e)}. A basic template is provided instead."
            }
    
    def find_patterns(self, data, specific_request=""):
        """
        Find patterns in tabular data.
        
        Args:
            data: DataFrame to analyze
            specific_request: Specific patterns to look for
            
        Returns:
            dict: Discovered patterns
        """
        if not self.is_ai_available or not isinstance(data, pd.DataFrame):
            return {
                "summary": "AI pattern recognition is not available or data is not in the right format.",
                "patterns": [
                    {
                        "name": "Manual Analysis Required",
                        "description": "To find patterns in this data, consider using statistical methods or data visualization techniques."
                    }
                ]
            }
        
        try:
            # Prepare the data sample and basic stats
            data_sample = self._prepare_data_sample(data)
            
            # Add correlation information if numeric columns exist
            data_stats = ""
            numeric_cols = data.select_dtypes(include=['number']).columns.tolist()
            if len(numeric_cols) >= 2:
                try:
                    corr = data[numeric_cols].corr().round(2)
                    corr_str = corr.to_string()
                    data_stats += f"Correlation matrix:\n{corr_str}\n\n"
                except:
                    pass
            
            # Get value counts for categorical columns
            cat_cols = data.select_dtypes(include=['object', 'category']).columns.tolist()
            if cat_cols and len(cat_cols) < 5:  # Limit to avoid huge prompts
                for col in cat_cols[:2]:  # Limit to first 2 categorical columns
                    try:
                        value_counts = data[col].value_counts(normalize=True).head(5).round(2).to_string()
                        data_stats += f"Top values for {col} (proportion):\n{value_counts}\n\n"
                    except:
                        pass
            
            # Create the prompt
            prompt = f"""You are a data scientist specializing in pattern recognition and data analysis.
            
            Analyze this dataset and identify meaningful patterns, trends, and insights:
            
            Data Statistics:
            {data_stats}
            
            Data Sample:
            {data_sample}
            
            """
            
            if specific_request:
                prompt += f"Specifically, look for: {specific_request}\n\n"
            
            prompt += """
            Identify patterns such as:
            1. Correlations between variables
            2. Clusters or groupings in the data
            3. Temporal patterns or trends (if time data exists)
            4. Outliers or anomalies
            5. Frequent combinations or associations
            
            Format your response as JSON with these fields:
            - "summary": Brief overview of the main patterns
            - "patterns": Array of detected patterns, each with:
              - "name": Brief name/title for the pattern
              - "description": Detailed explanation
              - "evidence": Supporting data or statistics
              - "confidence": High/Medium/Low assessment of confidence
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=1500,
                temperature=0.2
            )
            
            patterns = json.loads(response.choices[0].message.content)
            return patterns
            
        except Exception as e:
            self.logger.error(f"Error finding patterns: {str(e)}")
            return {
                "summary": f"Unable to analyze patterns due to an error: {str(e)}.",
                "patterns": [
                    {
                        "name": "Error in Pattern Analysis",
                        "description": "The AI pattern recognition encountered an error. Consider using standard statistical methods instead.",
                        "confidence": "Low"
                    }
                ]
            }
    
    def find_text_patterns(self, text, specific_request=""):
        """
        Find patterns in text data.
        
        Args:
            text: Text to analyze
            specific_request: Specific patterns to look for
            
        Returns:
            dict: Discovered patterns
        """
        if not self.is_ai_available:
            return {
                "summary": "AI pattern recognition is not available.",
                "patterns": [
                    {
                        "name": "Manual Analysis Required",
                        "description": "To find patterns in this text, consider using text analysis techniques."
                    }
                ]
            }
        
        try:
            # Limit text size to avoid huge prompts
            text_sample = text[:5000] + "..." if len(text) > 5000 else text
            
            # Create the prompt
            prompt = f"""You are a text analysis expert specializing in pattern recognition.
            
            Analyze this text and identify meaningful patterns, themes, and insights:
            
            Text Sample:
            ```
            {text_sample}
            ```
            
            """
            
            if specific_request:
                prompt += f"Specifically, look for: {specific_request}\n\n"
            
            prompt += """
            Identify patterns such as:
            1. Recurring themes or topics
            2. Sentiment patterns
            3. Linguistic styles or structures
            4. Named entities and their relationships
            5. Key phrases or terminology
            
            Format your response as JSON with these fields:
            - "summary": Brief overview of the main patterns
            - "patterns": Array of detected patterns, each with:
              - "name": Brief name/title for the pattern
              - "description": Detailed explanation
              - "examples": Array of short examples from the text
              - "confidence": High/Medium/Low assessment of confidence
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=1500,
                temperature=0.2
            )
            
            patterns = json.loads(response.choices[0].message.content)
            return patterns
            
        except Exception as e:
            self.logger.error(f"Error finding text patterns: {str(e)}")
            return {
                "summary": f"Unable to analyze text patterns due to an error: {str(e)}.",
                "patterns": [
                    {
                        "name": "Error in Pattern Analysis",
                        "description": "The AI pattern recognition encountered an error. Consider using standard text analysis methods instead.",
                        "confidence": "Low"
                    }
                ]
            }
    
    def summarize_data(self, data, focus_area=""):
        """
        Generate a comprehensive summary of the data.
        
        Args:
            data: Data to summarize
            focus_area: Specific focus for the summary
            
        Returns:
            dict: Data summary
        """
        if not self.is_ai_available:
            return {
                "overview": "AI summarization is not available. Please check your OpenAI API key.",
                "key_points": [
                    "Set the OPENAI_API_KEY environment variable to enable AI features",
                    "Use the data preview and visualization tools to explore your data"
                ]
            }
        
        try:
            # Prepare the data sample and stats
            data_sample = self._prepare_data_sample(data)
            
            # Add basic statistics for DataFrame
            data_stats = ""
            if isinstance(data, pd.DataFrame):
                # Get shape and basic info
                rows, cols = data.shape
                data_stats += f"Dataset dimensions: {rows} rows × {cols} columns\n\n"
                
                # Get data types count
                type_counts = data.dtypes.value_counts().to_dict()
                type_str = ", ".join([f"{count} {dtype}" for dtype, count in type_counts.items()])
                data_stats += f"Column types: {type_str}\n\n"
                
                # Get missing values info
                missing = data.isna().sum().sum()
                missing_pct = (missing / (rows * cols)) * 100
                data_stats += f"Missing values: {missing} ({missing_pct:.2f}%)\n\n"
                
                # Get basic stats for numeric columns
                numeric_cols = data.select_dtypes(include=['number']).columns.tolist()
                if numeric_cols:
                    try:
                        stats = data[numeric_cols].describe().to_string()
                        data_stats += f"Numeric column statistics:\n{stats}\n\n"
                    except:
                        pass
            
            # Create the prompt
            prompt = f"""You are a data analysis expert.
            
            Create a comprehensive summary of this dataset:
            
            Data Statistics:
            {data_stats}
            
            Data Sample:
            {data_sample}
            
            """
            
            if focus_area:
                prompt += f"Focus especially on: {focus_area}\n\n"
            
            prompt += """
            Provide a detailed summary including:
            1. Overall characterization of the data
            2. Key findings and insights
            3. Potential business or analytical value
            4. Data quality assessment
            5. Recommendations for further analysis
            
            Format your response as JSON with these fields:
            - "overview": Comprehensive summary of the data
            - "key_points": Array of important insights
            - "data_quality": Assessment of data quality
            - "recommendations": Array of recommended next steps
            """
            
            # Call the OpenAI API
            # The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
            # do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=1500,
                temperature=0.2
            )
            
            summary = json.loads(response.choices[0].message.content)
            return summary
            
        except Exception as e:
            self.logger.error(f"Error summarizing data: {str(e)}")
            return {
                "overview": f"Unable to generate summary due to an error: {str(e)}.",
                "key_points": [
                    "Error occurred during AI summarization",
                    "Try with a smaller data sample or check your connection"
                ]
            }
    
    def _prepare_data_sample(self, data):
        """Prepare a sample of the data for AI analysis"""
        # For DataFrames: convert to string representation of the first few rows
        if isinstance(data, pd.DataFrame):
            # Get a data sample (first few rows)
            if len(data) > 10:
                sample = data.head(10).to_string()
            else:
                sample = data.to_string()
                
            # Limit sample size
            if len(sample) > 4000:
                sample = sample[:4000] + "...\n[truncated]"
                
            return f"DataFrame Sample:\n{sample}"
        
        # For text data: truncate if needed
        elif isinstance(data, str):
            if len(data) > 4000:
                return data[:4000] + "...\n[truncated]"
            return data
        
        # For other types: convert to string
        else:
            data_str = str(data)
            if len(data_str) > 4000:
                return data_str[:4000] + "...\n[truncated]"
            return data_str
