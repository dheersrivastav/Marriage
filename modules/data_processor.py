import pandas as pd
import numpy as np
import re
import json
import io
import datetime
import logging
from bs4 import BeautifulSoup
from io import StringIO, BytesIO
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

class DataProcessor:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Initialize NLTK resources
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt', quiet=True)
        
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords', quiet=True)
    
    def remove_duplicates(self, data):
        """
        Remove duplicate rows from DataFrame.
        
        Args:
            data (pd.DataFrame): Input DataFrame
            
        Returns:
            pd.DataFrame: DataFrame with duplicates removed
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, cannot remove duplicates")
            return data
            
        original_len = len(data)
        data = data.drop_duplicates()
        removed = original_len - len(data)
        
        self.logger.info(f"Removed {removed} duplicate rows")
        return data
    
    def remove_empty_rows(self, data):
        """
        Remove rows where all values are missing.
        
        Args:
            data (pd.DataFrame): Input DataFrame
            
        Returns:
            pd.DataFrame: DataFrame with empty rows removed
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, cannot remove empty rows")
            return data
            
        original_len = len(data)
        data = data.dropna(how='all')
        removed = original_len - len(data)
        
        self.logger.info(f"Removed {removed} empty rows")
        return data
    
    def fill_missing_values(self, data, method="Mean", fill_value=None):
        """
        Fill missing values in DataFrame.
        
        Args:
            data (pd.DataFrame): Input DataFrame
            method (str): Method to use for filling missing values
            fill_value: Custom value to use for filling
            
        Returns:
            pd.DataFrame: DataFrame with missing values filled
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, cannot fill missing values")
            return data
            
        # Create a copy to avoid modifying the original
        df = data.copy()
        
        # Apply the appropriate fill method
        if method == "Mean":
            # Only apply mean to numeric columns
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            for col in numeric_cols:
                df[col] = df[col].fillna(df[col].mean())
                
        elif method == "Median":
            # Only apply median to numeric columns
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            for col in numeric_cols:
                df[col] = df[col].fillna(df[col].median())
                
        elif method == "Mode":
            # Apply mode to all columns
            for col in df.columns:
                if not df[col].empty:
                    mode_val = df[col].mode()
                    if not mode_val.empty:
                        df[col] = df[col].fillna(mode_val[0])
                
        elif method == "Forward Fill":
            df = df.ffill()
                
        elif method == "Backward Fill":
            df = df.bfill()
                
        elif method == "Custom Value":
            # Try to convert fill_value to appropriate types
            if fill_value is not None:
                # For numeric columns, try to convert to float
                numeric_cols = df.select_dtypes(include=[np.number]).columns
                for col in numeric_cols:
                    try:
                        val = float(fill_value)
                        df[col] = df[col].fillna(val)
                    except (ValueError, TypeError):
                        df[col] = df[col].fillna(fill_value)
                
                # For other columns, use as is
                non_numeric_cols = df.select_dtypes(exclude=[np.number]).columns
                for col in non_numeric_cols:
                    df[col] = df[col].fillna(fill_value)
        
        self.logger.info(f"Filled missing values using method: {method}")
        return df
    
    def convert_data_type(self, data, column, target_type):
        """
        Convert a column to a specified data type.
        
        Args:
            data (pd.DataFrame): Input DataFrame
            column (str): Column name to convert
            target_type (str): Target data type
            
        Returns:
            pd.DataFrame: DataFrame with converted column
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, cannot convert data type")
            return data
            
        if column not in data.columns:
            self.logger.warning(f"Column '{column}' not found in data")
            return data
            
        # Create a copy to avoid modifying the original
        df = data.copy()
        
        try:
            if target_type == "String":
                df[column] = df[column].astype(str)
                
            elif target_type == "Integer":
                # First convert to float to handle NaN values, then to int
                df[column] = pd.to_numeric(df[column], errors='coerce')
                df[column] = df[column].fillna(0).astype(int)
                
            elif target_type == "Float":
                df[column] = pd.to_numeric(df[column], errors='coerce')
                
            elif target_type == "Boolean":
                # Convert various string representations to boolean
                if df[column].dtype == 'object':
                    # Map common true/false strings
                    true_values = ['true', 'yes', 'y', '1', 'on', 't']
                    false_values = ['false', 'no', 'n', '0', 'off', 'f']
                    
                    def to_bool(val):
                        if pd.isna(val):
                            return np.nan
                        if isinstance(val, str):
                            val_lower = val.lower()
                            if val_lower in true_values:
                                return True
                            elif val_lower in false_values:
                                return False
                        return bool(val)
                    
                    df[column] = df[column].apply(to_bool)
                else:
                    df[column] = df[column].astype(bool)
                
            elif target_type == "DateTime":
                df[column] = pd.to_datetime(df[column], errors='coerce')
                
            self.logger.info(f"Converted column '{column}' to {target_type}")
            
        except Exception as e:
            self.logger.error(f"Error converting column '{column}' to {target_type}: {str(e)}")
            
        return df
    
    def filter_data(self, data, column, filter_type, filter_value):
        """
        Filter DataFrame based on condition.
        
        Args:
            data (pd.DataFrame): Input DataFrame
            column (str): Column to filter on
            filter_type (str): Type of filter
            filter_value (str): Value to filter by
            
        Returns:
            pd.DataFrame: Filtered DataFrame
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, cannot filter")
            return data
            
        if column not in data.columns:
            self.logger.warning(f"Column '{column}' not found in data")
            return data
            
        # Create a copy to avoid modifying the original
        df = data.copy()
        
        try:
            if filter_type == "Contains":
                mask = df[column].astype(str).str.contains(filter_value, case=False, na=False)
                df = df[mask]
                
            elif filter_type == "Equals":
                # Try to match type with column
                if pd.api.types.is_numeric_dtype(df[column]):
                    try:
                        value = float(filter_value)
                        df = df[df[column] == value]
                    except (ValueError, TypeError):
                        df = df[df[column].astype(str) == filter_value]
                else:
                    df = df[df[column].astype(str) == filter_value]
                
            elif filter_type == "Greater Than":
                # Only works for numeric columns
                if pd.api.types.is_numeric_dtype(df[column]):
                    try:
                        value = float(filter_value)
                        df = df[df[column] > value]
                    except (ValueError, TypeError):
                        self.logger.warning(f"Cannot compare non-numeric value '{filter_value}' with 'Greater Than'")
                else:
                    # Try to convert column to numeric
                    numeric_col = pd.to_numeric(df[column], errors='coerce')
                    try:
                        value = float(filter_value)
                        df = df[numeric_col > value]
                    except (ValueError, TypeError):
                        self.logger.warning(f"Column '{column}' contains non-numeric data, cannot use 'Greater Than'")
                
            elif filter_type == "Less Than":
                # Only works for numeric columns
                if pd.api.types.is_numeric_dtype(df[column]):
                    try:
                        value = float(filter_value)
                        df = df[df[column] < value]
                    except (ValueError, TypeError):
                        self.logger.warning(f"Cannot compare non-numeric value '{filter_value}' with 'Less Than'")
                else:
                    # Try to convert column to numeric
                    numeric_col = pd.to_numeric(df[column], errors='coerce')
                    try:
                        value = float(filter_value)
                        df = df[numeric_col < value]
                    except (ValueError, TypeError):
                        self.logger.warning(f"Column '{column}' contains non-numeric data, cannot use 'Less Than'")
            
            self.logger.info(f"Filtered data on column '{column}' using {filter_type}: {filter_value}")
            self.logger.info(f"Filtered from {len(data)} to {len(df)} rows")
            
        except Exception as e:
            self.logger.error(f"Error filtering data: {str(e)}")
            
        return df
    
    def clean_text(self, data, column, clean_options):
        """
        Clean text in specified column.
        
        Args:
            data (pd.DataFrame): Input DataFrame
            column (str): Column to clean
            clean_options (list): Text cleaning options
            
        Returns:
            pd.DataFrame: DataFrame with cleaned text
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, cannot clean text")
            return data
            
        if column not in data.columns:
            self.logger.warning(f"Column '{column}' not found in data")
            return data
            
        # Create a copy to avoid modifying the original
        df = data.copy()
        
        try:
            # Convert column to string if it's not already
            df[column] = df[column].astype(str)
            
            # Apply selected cleaning options
            for option in clean_options:
                if option == "Remove HTML":
                    df[column] = df[column].apply(lambda x: BeautifulSoup(x, "html.parser").get_text())
                    
                elif option == "Remove URLs":
                    url_pattern = r'https?://\S+|www\.\S+'
                    df[column] = df[column].apply(lambda x: re.sub(url_pattern, '', x))
                    
                elif option == "Remove Special Characters":
                    df[column] = df[column].apply(lambda x: re.sub(r'[^\w\s]', '', x))
                    
                elif option == "Lowercase":
                    df[column] = df[column].str.lower()
                    
                elif option == "Remove Extra Spaces":
                    df[column] = df[column].apply(lambda x: re.sub(r'\s+', ' ', x).strip())
                    
                elif option == "Remove Stopwords":
                    stop_words = set(stopwords.words('english'))
                    
                    def remove_stopwords(text):
                        tokens = word_tokenize(text)
                        filtered_tokens = [word for word in tokens if word.lower() not in stop_words]
                        return ' '.join(filtered_tokens)
                    
                    df[column] = df[column].apply(remove_stopwords)
            
            self.logger.info(f"Cleaned text in column '{column}' with options: {', '.join(clean_options)}")
            
        except Exception as e:
            self.logger.error(f"Error cleaning text: {str(e)}")
            
        return df
    
    def process_text(self, text, clean_options):
        """
        Process and clean raw text.
        
        Args:
            text (str): Input text
            clean_options (list): Text cleaning options
            
        Returns:
            str: Cleaned text
        """
        if not isinstance(text, str):
            text = str(text)
            
        processed_text = text
        
        try:
            # Apply selected cleaning options
            for option in clean_options:
                if option == "Remove HTML":
                    processed_text = BeautifulSoup(processed_text, "html.parser").get_text()
                    
                elif option == "Remove URLs":
                    url_pattern = r'https?://\S+|www\.\S+'
                    processed_text = re.sub(url_pattern, '', processed_text)
                    
                elif option == "Remove Special Characters":
                    processed_text = re.sub(r'[^\w\s]', '', processed_text)
                    
                elif option == "Lowercase":
                    processed_text = processed_text.lower()
                    
                elif option == "Remove Extra Spaces":
                    processed_text = re.sub(r'\s+', ' ', processed_text).strip()
                    
                elif option == "Remove Stopwords":
                    stop_words = set(stopwords.words('english'))
                    tokens = word_tokenize(processed_text)
                    filtered_tokens = [word for word in tokens if word.lower() not in stop_words]
                    processed_text = ' '.join(filtered_tokens)
            
            self.logger.info(f"Processed text with options: {', '.join(clean_options)}")
            
        except Exception as e:
            self.logger.error(f"Error processing text: {str(e)}")
            
        return processed_text
    
    def export_to_csv(self, data):
        """
        Export DataFrame to CSV.
        
        Args:
            data (pd.DataFrame): DataFrame to export
            
        Returns:
            str: CSV data as string
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, converting to DataFrame for CSV export")
            try:
                data = pd.DataFrame([data])
            except:
                data = pd.DataFrame({'content': [str(data)]})
        
        try:
            csv_buffer = StringIO()
            data.to_csv(csv_buffer, index=False)
            csv_data = csv_buffer.getvalue()
            
            self.logger.info(f"Exported data to CSV, size: {len(csv_data)} bytes")
            return csv_data
            
        except Exception as e:
            self.logger.error(f"Error exporting to CSV: {str(e)}")
            return "Error: Failed to export data to CSV"
    
    def export_to_json(self, data):
        """
        Export DataFrame to JSON.
        
        Args:
            data (pd.DataFrame): DataFrame to export
            
        Returns:
            str: JSON data as string
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, converting for JSON export")
            try:
                data = pd.DataFrame([data])
            except:
                data = pd.DataFrame({'content': [str(data)]})
        
        try:
            # Handle non-serializable objects (like dates)
            def json_serial(obj):
                if isinstance(obj, (datetime.datetime, datetime.date)):
                    return obj.isoformat()
                raise TypeError(f"Type {type(obj)} not serializable")
            
            # Convert to records format and handle NaN values
            records = data.replace({np.nan: None}).to_dict(orient='records')
            json_data = json.dumps(records, default=json_serial, indent=2)
            
            self.logger.info(f"Exported data to JSON, size: {len(json_data)} bytes")
            return json_data
            
        except Exception as e:
            self.logger.error(f"Error exporting to JSON: {str(e)}")
            return json.dumps({"error": f"Failed to export data to JSON: {str(e)}"})
    
    def export_to_excel(self, data):
        """
        Export DataFrame to Excel.
        
        Args:
            data (pd.DataFrame): DataFrame to export
            
        Returns:
            bytes: Excel data as bytes
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, converting for Excel export")
            try:
                data = pd.DataFrame([data])
            except:
                data = pd.DataFrame({'content': [str(data)]})
        
        try:
            excel_buffer = BytesIO()
            with pd.ExcelWriter(excel_buffer, engine='xlsxwriter') as writer:
                data.to_excel(writer, sheet_name='Scraped Data', index=False)
                
                # Auto-adjust columns' width
                worksheet = writer.sheets['Scraped Data']
                for i, col in enumerate(data.columns):
                    max_len = max(
                        data[col].astype(str).map(len).max(),
                        len(str(col))
                    ) + 2
                    worksheet.set_column(i, i, max_len)
            
            excel_data = excel_buffer.getvalue()
            
            self.logger.info(f"Exported data to Excel, size: {len(excel_data)} bytes")
            return excel_data
            
        except Exception as e:
            self.logger.error(f"Error exporting to Excel: {str(e)}")
            return b"Error: Failed to export data to Excel"
    
    def export_to_html(self, data):
        """
        Export DataFrame to HTML.
        
        Args:
            data (pd.DataFrame): DataFrame to export
            
        Returns:
            str: HTML data as string
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, converting for HTML export")
            try:
                data = pd.DataFrame([data])
            except:
                data = pd.DataFrame({'content': [str(data)]})
        
        try:
            html = data.to_html(index=False, escape=True, na_rep='')
            
            # Add basic styling
            styled_html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Exported Data</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }}
                    table {{
                        border-collapse: collapse;
                        width: 100%;
                        margin-bottom: 20px;
                    }}
                    th, td {{
                        text-align: left;
                        padding: 8px;
                        border: 1px solid #ddd;
                    }}
                    th {{
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }}
                    tr:nth-child(even) {{
                        background-color: #f9f9f9;
                    }}
                    .container {{
                        max-width: 1200px;
                        margin: 0 auto;
                    }}
                    h1 {{
                        color: #333;
                    }}
                    .footer {{
                        margin-top: 20px;
                        color: #777;
                        font-size: 0.8em;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Exported Data</h1>
                    <p>Generated on {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    {html}
                    <div class="footer">
                        <p>Created with DataMiner AI</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            self.logger.info(f"Exported data to HTML, size: {len(styled_html)} bytes")
            return styled_html
            
        except Exception as e:
            self.logger.error(f"Error exporting to HTML: {str(e)}")
            return f"<html><body><h1>Error</h1><p>Failed to export data to HTML: {str(e)}</p></body></html>"
    
    def export_to_sql(self, data, table_name):
        """
        Export DataFrame to SQL statement.
        
        Args:
            data (pd.DataFrame): DataFrame to export
            table_name (str): Name of the SQL table
            
        Returns:
            str: SQL statements as string
        """
        if not isinstance(data, pd.DataFrame):
            self.logger.warning("Data is not a DataFrame, converting for SQL export")
            try:
                data = pd.DataFrame([data])
            except:
                data = pd.DataFrame({'content': [str(data)]})
        
        try:
            # Replace invalid characters in table name
            safe_table_name = re.sub(r'[^a-zA-Z0-9_]', '_', table_name)
            
            # Start building SQL statement
            sql = f"-- SQL Export from DataMiner AI\n"
            sql += f"-- Generated on {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
            
            # Create table statement
            sql += f"CREATE TABLE IF NOT EXISTS {safe_table_name} (\n"
            
            # Map pandas dtypes to SQL types
            type_map = {
                'int64': 'INTEGER',
                'float64': 'REAL',
                'bool': 'BOOLEAN',
                'datetime64[ns]': 'TIMESTAMP',
                'object': 'TEXT'
            }
            
            # Add columns with types
            columns = []
            for col, dtype in data.dtypes.items():
                # Replace invalid characters in column names
                safe_col = re.sub(r'[^a-zA-Z0-9_]', '_', col)
                sql_type = type_map.get(str(dtype), 'TEXT')
                columns.append(f"    {safe_col} {sql_type}")
                
            sql += ",\n".join(columns)
            sql += "\n);\n\n"
            
            # Add insert statements
            sql += f"-- Insert data into {safe_table_name}\n"
            
            # Get column names
            col_names = [re.sub(r'[^a-zA-Z0-9_]', '_', col) for col in data.columns]
            
            # Process each row
            for _, row in data.iterrows():
                values = []
                for val in row:
                    if pd.isna(val):
                        values.append("NULL")
                    elif isinstance(val, (int, float)):
                        values.append(str(val))
                    elif isinstance(val, bool):
                        values.append("1" if val else "0")
                    elif isinstance(val, (datetime.datetime, datetime.date)):
                        values.append(f"'{val.isoformat()}'")
                    else:
                        # Escape single quotes for SQL strings
                        val_str = str(val).replace("'", "''")
                        values.append(f"'{val_str}'")
                
                sql += f"INSERT INTO {safe_table_name} ({', '.join(col_names)}) VALUES ({', '.join(values)});\n"
            
            self.logger.info(f"Exported data to SQL, size: {len(sql)} bytes")
            return sql
            
        except Exception as e:
            self.logger.error(f"Error exporting to SQL: {str(e)}")
            return f"-- Error: Failed to export data to SQL: {str(e)}"
