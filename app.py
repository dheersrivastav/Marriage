import streamlit as st
import pandas as pd
import json
import base64
import os
from io import StringIO, BytesIO
from modules.web_scraper import WebScraper
from modules.social_scraper import SocialMediaScraper
from modules.ai_assistant import AIAssistant
from modules.data_processor import DataProcessor
from modules.visualizer import Visualizer

# Set page configuration
st.set_page_config(
    page_title="DataMiner AI",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Initialize session state variables if they don't exist
if 'scraped_data' not in st.session_state:
    st.session_state.scraped_data = None
if 'processed_data' not in st.session_state:
    st.session_state.processed_data = None
if 'source_type' not in st.session_state:
    st.session_state.source_type = None
if 'current_tab' not in st.session_state:
    st.session_state.current_tab = "web"

# Initialize tools
web_scraper = WebScraper()
social_scraper = SocialMediaScraper()
ai_assistant = AIAssistant()
data_processor = DataProcessor()
visualizer = Visualizer()

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    .sub-header {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

# Logo
st.markdown('<div style="text-align: center;">', unsafe_allow_html=True)
st.markdown("""
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="#4F8BF9" opacity="0.2"/>
  <circle cx="50" cy="50" r="30" fill="#4F8BF9" opacity="0.5"/>
  <circle cx="50" cy="50" r="15" fill="#4F8BF9"/>
  <path d="M70 30 L30 70" stroke="white" stroke-width="5"/>
  <path d="M30 30 L70 70" stroke="white" stroke-width="5"/>
</svg>
""", unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)

# Main header
st.markdown('<h1 class="main-header" style="text-align: center;">DataMiner AI</h1>', unsafe_allow_html=True)
st.markdown('<p style="text-align: center;">A developer-focused data scraping tool with AI capabilities</p>', unsafe_allow_html=True)

# Create tabs for different data sources
tabs = st.tabs(["Web Scraping", "Social Media", "Data Processing", "Visualization", "AI Assistant"])

# Web Scraping Tab
with tabs[0]:
    st.session_state.current_tab = "web"
    st.markdown('<h2 class="sub-header">Web Data Extraction</h2>', unsafe_allow_html=True)
    
    col1, col2 = st.columns([3, 1])
    
    with col1:
        url = st.text_input("Website URL", placeholder="https://example.com")
        
    with col2:
        scrape_method = st.selectbox(
            "Scraping Method",
            ["Full Page Content", "Text Only", "Tables", "Links", "Images", "Custom CSS Selector"]
        )
    
    if scrape_method == "Custom CSS Selector":
        css_selector = st.text_input("CSS Selector", placeholder="div.content, table.data, etc.")
    else:
        css_selector = None
    
    advanced_options = st.expander("Advanced Options")
    with advanced_options:
        delay = st.slider("Request Delay (seconds)", 0, 10, 1)
        user_agent = st.text_input(
            "User Agent",
            value="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        )
        max_pages = st.number_input("Max Pages (for pagination)", min_value=1, max_value=100, value=1)
        timeout = st.slider("Request Timeout (seconds)", 5, 60, 30)
    
    if st.button("Scrape Data", key="web_scrape_button"):
        with st.spinner("Scraping data from website..."):
            try:
                scraped_data = web_scraper.scrape(
                    url=url,
                    method=scrape_method,
                    css_selector=css_selector,
                    delay=delay,
                    user_agent=user_agent,
                    max_pages=max_pages,
                    timeout=timeout
                )
                
                st.session_state.scraped_data = scraped_data
                st.session_state.source_type = "web"
                
                if isinstance(scraped_data, pd.DataFrame):
                    st.dataframe(scraped_data.head(10))
                    st.success(f"Successfully scraped {len(scraped_data)} rows of data!")
                else:
                    st.text_area("Scraped Content", value=str(scraped_data)[:1000] + "...", height=300)
                    st.success("Successfully scraped content!")
                
                # AI suggestions
                with st.expander("AI Suggestions for Data Processing"):
                    suggestions = ai_assistant.get_processing_suggestions(scraped_data)
                    st.write(suggestions)
            
            except Exception as e:
                st.error(f"Failed to scrape data: {str(e)}")

# Social Media Tab
with tabs[1]:
    st.session_state.current_tab = "social"
    st.markdown('<h2 class="sub-header">Social Media Data Extraction</h2>', unsafe_allow_html=True)
    
    platform = st.selectbox(
        "Select Platform",
        ["Twitter/X", "Reddit", "YouTube Comments", "Instagram (Public)", "HackerNews"]
    )
    
    col1, col2 = st.columns(2)
    
    with col1:
        if platform == "Twitter/X":
            query_type = st.radio("Search Type", ["Username", "Hashtag", "Keyword"])
            query = st.text_input(f"{query_type}", placeholder="Enter search term")
            
        elif platform == "Reddit":
            query_type = st.radio("Search Type", ["Subreddit", "User", "Search Term"])
            query = st.text_input(f"{query_type}", placeholder="Enter search term")
            
        elif platform == "YouTube Comments":
            query = st.text_input("YouTube Video URL", placeholder="https://www.youtube.com/watch?v=...")
            
        elif platform == "Instagram (Public)":
            query_type = st.radio("Search Type", ["Username", "Hashtag"])
            query = st.text_input(f"{query_type}", placeholder="Enter without @ or #")
            
        elif platform == "HackerNews":
            query_type = st.radio("Search Type", ["Top Stories", "New Stories", "Ask HN", "Show HN"])
            query = st.text_input("Keywords (optional)", placeholder="Optional filter terms")
    
    with col2:
        limit = st.slider("Result Limit", 10, 500, 100)
        date_range = st.radio("Date Range", ["Last 24 hours", "Last week", "Last month", "All time"])
        
        include_metadata = st.checkbox("Include metadata", value=True)
        include_replies = st.checkbox("Include replies/comments", value=True)
    
    if st.button("Extract Data", key="social_scrape_button"):
        with st.spinner(f"Extracting data from {platform}..."):
            try:
                scraped_data = social_scraper.scrape(
                    platform=platform,
                    query_type=query_type if platform != "YouTube Comments" else None,
                    query=query,
                    limit=limit,
                    date_range=date_range,
                    include_metadata=include_metadata,
                    include_replies=include_replies
                )
                
                st.session_state.scraped_data = scraped_data
                st.session_state.source_type = "social"
                
                st.dataframe(scraped_data.head(10))
                st.success(f"Successfully extracted {len(scraped_data)} items from {platform}!")
                
                # AI suggestions
                with st.expander("AI Suggestions for Social Data Analysis"):
                    suggestions = ai_assistant.get_social_analysis_suggestions(platform, scraped_data)
                    st.write(suggestions)
                    
            except Exception as e:
                st.error(f"Failed to extract data: {str(e)}")

# Data Processing Tab
with tabs[2]:
    st.markdown('<h2 class="sub-header">Data Processing and Cleaning</h2>', unsafe_allow_html=True)
    
    if st.session_state.scraped_data is not None:
        data = st.session_state.scraped_data
        
        if isinstance(data, pd.DataFrame):
            st.write("Current Data Preview:")
            st.dataframe(data.head(5))
            
            st.write("Data Shape:", data.shape)
            
            # Processing options
            st.write("Select Processing Options:")
            
            col1, col2 = st.columns(2)
            
            with col1:
                if st.checkbox("Remove Duplicates"):
                    data = data_processor.remove_duplicates(data)
                
                if st.checkbox("Remove Empty Rows"):
                    data = data_processor.remove_empty_rows(data)
                
                if st.checkbox("Fill Missing Values"):
                    fill_method = st.selectbox(
                        "Fill Method",
                        ["Mean", "Median", "Mode", "Forward Fill", "Backward Fill", "Custom Value"]
                    )
                    
                    if fill_method == "Custom Value":
                        fill_value = st.text_input("Custom Fill Value", "0")
                    else:
                        fill_value = None
                        
                    data = data_processor.fill_missing_values(data, method=fill_method, fill_value=fill_value)
                
            with col2:
                if st.checkbox("Convert Data Types"):
                    column = st.selectbox("Select Column", data.columns.tolist())
                    target_type = st.selectbox("Target Type", ["String", "Integer", "Float", "Boolean", "DateTime"])
                    
                    data = data_processor.convert_data_type(data, column, target_type)
                
                if st.checkbox("Filter Data"):
                    filter_col = st.selectbox("Filter Column", data.columns.tolist(), key="filter_col")
                    filter_type = st.selectbox("Filter Type", ["Contains", "Equals", "Greater Than", "Less Than"])
                    filter_value = st.text_input("Filter Value")
                    
                    data = data_processor.filter_data(data, filter_col, filter_type, filter_value)
                
                if st.checkbox("Text Cleaning"):
                    text_col = st.selectbox("Text Column", data.columns.tolist(), key="text_col")
                    clean_options = st.multiselect(
                        "Cleaning Options",
                        ["Remove HTML", "Remove URLs", "Remove Special Characters", "Lowercase", "Remove Extra Spaces", "Remove Stopwords"]
                    )
                    
                    data = data_processor.clean_text(data, text_col, clean_options)
            
            # AI-assisted cleaning
            if st.checkbox("AI-Assisted Data Cleaning"):
                with st.spinner("AI analyzing your data..."):
                    cleaning_suggestions = ai_assistant.suggest_data_cleaning(data)
                    st.write("AI Cleaning Suggestions:")
                    st.write(cleaning_suggestions)
                    
                    if st.button("Apply AI Suggestions"):
                        with st.spinner("Applying AI suggestions..."):
                            data = ai_assistant.apply_cleaning_suggestions(data, cleaning_suggestions)
                            st.success("AI suggestions applied!")
            
            # Update processed data
            st.session_state.processed_data = data
            
            # Show results
            st.write("Processed Data Preview:")
            st.dataframe(data.head(5))
            
            # Export options
            st.write("Export Processed Data:")
            export_format = st.selectbox("Export Format", ["CSV", "JSON", "Excel", "HTML", "SQL"])
            
            if st.button("Export Data"):
                with st.spinner("Preparing download..."):
                    if export_format == "CSV":
                        csv_data = data_processor.export_to_csv(data)
                        st.download_button(
                            label="Download CSV",
                            data=csv_data,
                            file_name="processed_data.csv",
                            mime="text/csv"
                        )
                    
                    elif export_format == "JSON":
                        json_data = data_processor.export_to_json(data)
                        st.download_button(
                            label="Download JSON",
                            data=json_data,
                            file_name="processed_data.json",
                            mime="application/json"
                        )
                    
                    elif export_format == "Excel":
                        excel_data = data_processor.export_to_excel(data)
                        st.download_button(
                            label="Download Excel",
                            data=excel_data,
                            file_name="processed_data.xlsx",
                            mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                    
                    elif export_format == "HTML":
                        html_data = data_processor.export_to_html(data)
                        st.download_button(
                            label="Download HTML",
                            data=html_data,
                            file_name="processed_data.html",
                            mime="text/html"
                        )
                    
                    elif export_format == "SQL":
                        table_name = st.text_input("Table Name", "scraped_data")
                        sql_data = data_processor.export_to_sql(data, table_name)
                        st.download_button(
                            label="Download SQL",
                            data=sql_data,
                            file_name="processed_data.sql",
                            mime="text/plain"
                        )
        
        else:
            st.warning("The current data is not in tabular format. Text cleaning options available:")
            
            text_data = str(data)
            
            clean_options = st.multiselect(
                "Text Cleaning Options",
                ["Remove HTML", "Remove URLs", "Remove Special Characters", "Lowercase", "Remove Extra Spaces", "Remove Stopwords"]
            )
            
            if st.button("Process Text"):
                with st.spinner("Processing text..."):
                    processed_text = data_processor.process_text(text_data, clean_options)
                    st.session_state.processed_data = processed_text
                    
                    st.text_area("Processed Text", processed_text[:1000] + "..." if len(processed_text) > 1000 else processed_text, height=300)
                    
                    # Download option
                    st.download_button(
                        label="Download Text",
                        data=processed_text,
                        file_name="processed_text.txt",
                        mime="text/plain"
                    )
    else:
        st.info("No data to process. Please scrape data from the Web Scraping or Social Media tab first.")
        
        # Upload data option
        st.write("Or upload data for processing:")
        uploaded_file = st.file_uploader("Upload data file (CSV, JSON, Excel)", type=["csv", "json", "xlsx", "xls"])
        
        if uploaded_file is not None:
            try:
                if uploaded_file.name.endswith(".csv"):
                    data = pd.read_csv(uploaded_file)
                elif uploaded_file.name.endswith(".json"):
                    data = pd.read_json(uploaded_file)
                elif uploaded_file.name.endswith((".xlsx", ".xls")):
                    data = pd.read_excel(uploaded_file)
                    
                st.session_state.scraped_data = data
                st.session_state.source_type = "upload"
                
                st.success("Data loaded successfully! Refresh this tab to see processing options.")
                st.dataframe(data.head(5))
                
            except Exception as e:
                st.error(f"Failed to load data: {str(e)}")

# Visualization Tab
with tabs[3]:
    st.markdown('<h2 class="sub-header">Data Visualization</h2>', unsafe_allow_html=True)
    
    if st.session_state.processed_data is not None:
        data = st.session_state.processed_data
        
        if isinstance(data, pd.DataFrame):
            st.write("Create visualizations for your processed data:")
            
            viz_type = st.selectbox(
                "Visualization Type",
                ["Bar Chart", "Line Chart", "Scatter Plot", "Pie Chart", "Histogram", "Box Plot", "Heatmap", "Word Cloud"]
            )
            
            if viz_type != "Word Cloud":
                col1, col2 = st.columns(2)
                
                with col1:
                    if viz_type in ["Bar Chart", "Line Chart", "Box Plot"]:
                        x_axis = st.selectbox("X-Axis", data.columns.tolist(), key="x_axis")
                        
                    if viz_type in ["Scatter Plot"]:
                        x_axis = st.selectbox("X-Axis", data.columns.tolist(), key="x_axis_scatter")
                        y_axis = st.selectbox("Y-Axis", data.columns.tolist(), key="y_axis_scatter")
                        
                    if viz_type in ["Histogram"]:
                        value_col = st.selectbox("Column", data.columns.tolist(), key="hist_col")
                        bins = st.slider("Number of Bins", 5, 100, 20)
                        
                    if viz_type in ["Pie Chart"]:
                        label_col = st.selectbox("Labels", data.columns.tolist(), key="pie_labels")
                        value_col = st.selectbox("Values", data.columns.tolist(), key="pie_values")
                        
                    if viz_type in ["Heatmap"]:
                        st.write("Select columns for heatmap (numerical columns recommended):")
                        heatmap_cols = st.multiselect("Columns", data.columns.tolist(), key="heatmap_cols")
                
                with col2:
                    if viz_type in ["Bar Chart", "Line Chart", "Scatter Plot", "Box Plot"]:
                        color_by = st.selectbox("Color By (Optional)", ["None"] + data.columns.tolist(), key="color_by")
                        
                    title = st.text_input("Chart Title", f"{viz_type} of Data")
                    
                    if viz_type == "Bar Chart":
                        orientation = st.radio("Orientation", ["Vertical", "Horizontal"])
                    
                    if viz_type in ["Line Chart", "Scatter Plot"]:
                        show_trendline = st.checkbox("Show Trendline", value=False)
            
            else:  # Word Cloud
                text_col = st.selectbox("Text Column", data.columns.tolist(), key="wordcloud_col")
                max_words = st.slider("Maximum Words", 50, 500, 200)
                
            # Generate visualization
            if st.button("Generate Visualization"):
                with st.spinner("Creating visualization..."):
                    try:
                        if viz_type == "Bar Chart":
                            y_axis = st.selectbox("Y-Axis (Value)", data.columns.tolist(), key="y_axis_bar")
                            fig = visualizer.create_bar_chart(
                                data, x_axis, y_axis, 
                                color_by if color_by != "None" else None,
                                title, 
                                orientation.lower()
                            )
                            st.plotly_chart(fig, use_container_width=True)
                            
                        elif viz_type == "Line Chart":
                            y_axis = st.selectbox("Y-Axis (Value)", data.columns.tolist(), key="y_axis_line")
                            fig = visualizer.create_line_chart(
                                data, x_axis, y_axis, 
                                color_by if color_by != "None" else None,
                                title, 
                                show_trendline
                            )
                            st.plotly_chart(fig, use_container_width=True)
                            
                        elif viz_type == "Scatter Plot":
                            fig = visualizer.create_scatter_plot(
                                data, x_axis, y_axis, 
                                color_by if color_by != "None" else None,
                                title, 
                                show_trendline
                            )
                            st.plotly_chart(fig, use_container_width=True)
                            
                        elif viz_type == "Pie Chart":
                            fig = visualizer.create_pie_chart(
                                data, label_col, value_col, title
                            )
                            st.plotly_chart(fig, use_container_width=True)
                            
                        elif viz_type == "Histogram":
                            fig = visualizer.create_histogram(
                                data, value_col, bins, title
                            )
                            st.plotly_chart(fig, use_container_width=True)
                            
                        elif viz_type == "Box Plot":
                            y_axis = st.selectbox("Y-Axis (Value)", data.columns.tolist(), key="y_axis_box")
                            fig = visualizer.create_box_plot(
                                data, x_axis, y_axis, 
                                color_by if color_by != "None" else None,
                                title
                            )
                            st.plotly_chart(fig, use_container_width=True)
                            
                        elif viz_type == "Heatmap":
                            if not heatmap_cols:
                                st.warning("Please select at least 2 columns for the heatmap.")
                            else:
                                fig = visualizer.create_heatmap(
                                    data, heatmap_cols, title
                                )
                                st.plotly_chart(fig, use_container_width=True)
                                
                        elif viz_type == "Word Cloud":
                            fig = visualizer.create_wordcloud(
                                data, text_col, max_words
                            )
                            st.pyplot(fig)
                            
                    except Exception as e:
                        st.error(f"Failed to create visualization: {str(e)}")
                        
            # AI visualization suggestions
            with st.expander("AI Visualization Suggestions"):
                if st.button("Get AI Suggestions"):
                    with st.spinner("Analyzing your data for visualization insights..."):
                        suggestions = ai_assistant.suggest_visualizations(data)
                        st.write(suggestions)
        
        elif isinstance(data, str):
            st.info("Text data doesn't support most visualizations. You can generate a word cloud:")
            
            if st.button("Generate Word Cloud"):
                with st.spinner("Creating word cloud..."):
                    try:
                        fig = visualizer.create_text_wordcloud(data, max_words=200)
                        st.pyplot(fig)
                    except Exception as e:
                        st.error(f"Failed to create word cloud: {str(e)}")
                        
    else:
        st.info("No processed data available. Please process data in the Data Processing tab first.")

# AI Assistant Tab
with tabs[4]:
    st.markdown('<h2 class="sub-header">AI Data Assistant</h2>', unsafe_allow_html=True)
    
    st.write("Get AI assistance for your data extraction and analysis needs:")
    
    assistance_type = st.radio(
        "What type of assistance do you need?",
        ["Data Extraction Help", "Analysis Ideas", "Code Generation", "Pattern Recognition", "Summarize Data"]
    )
    
    if assistance_type == "Data Extraction Help":
        website_url = st.text_input("Website URL (Optional)", placeholder="https://example.com")
        extraction_goal = st.text_area("Describe what data you want to extract:", placeholder="I want to extract product prices and names from an e-commerce site...")
        
        if st.button("Get Extraction Advice"):
            with st.spinner("AI analyzing your request..."):
                advice = ai_assistant.get_extraction_advice(website_url, extraction_goal)
                
                st.write("### AI Extraction Advice")
                st.write(advice["explanation"])
                
                if "code_sample" in advice:
                    st.code(advice["code_sample"], language="python")
                
                if "css_selectors" in advice:
                    st.write("### Suggested CSS Selectors")
                    for item, selector in advice["css_selectors"].items():
                        st.write(f"- **{item}**: `{selector}`")
    
    elif assistance_type == "Analysis Ideas":
        if st.session_state.processed_data is not None:
            data = st.session_state.processed_data
            
            st.write("Current data sample:")
            if isinstance(data, pd.DataFrame):
                st.dataframe(data.head(3))
            else:
                st.text(str(data)[:300] + "...")
            
            analysis_goal = st.text_area("What insights are you looking for?", placeholder="I want to understand trends in this e-commerce data...")
            
            if st.button("Get Analysis Ideas"):
                with st.spinner("AI generating analysis ideas..."):
                    ideas = ai_assistant.get_analysis_ideas(data, analysis_goal)
                    
                    st.write("### AI Analysis Suggestions")
                    st.write(ideas["explanation"])
                    
                    if "suggested_analyses" in ideas:
                        st.write("### Suggested Analyses")
                        for i, analysis in enumerate(ideas["suggested_analyses"], 1):
                            st.write(f"**{i}. {analysis['title']}**")
                            st.write(analysis["description"])
                            if "code_sample" in analysis:
                                st.code(analysis["code_sample"], language="python")
        else:
            st.info("No data available for analysis. Please scrape or process data first.")
    
    elif assistance_type == "Code Generation":
        task_description = st.text_area("Describe the code you need:", placeholder="Generate code to extract all links from a webpage and save them to CSV...")
        
        if st.button("Generate Code"):
            with st.spinner("AI generating code..."):
                generated_code = ai_assistant.generate_code(task_description)
                
                st.write("### Generated Code")
                st.code(generated_code["code"], language="python")
                
                if "explanation" in generated_code:
                    st.write("### Explanation")
                    st.write(generated_code["explanation"])
    
    elif assistance_type == "Pattern Recognition":
        if st.session_state.processed_data is not None:
            data = st.session_state.processed_data
            
            st.write("Current data sample:")
            if isinstance(data, pd.DataFrame):
                st.dataframe(data.head(3))
                
                specific_request = st.text_area("Any specific patterns you're interested in?", placeholder="Find recurring themes in customer reviews...")
                
                if st.button("Find Patterns"):
                    with st.spinner("AI analyzing patterns..."):
                        patterns = ai_assistant.find_patterns(data, specific_request)
                        
                        st.write("### Discovered Patterns")
                        st.write(patterns["summary"])
                        
                        if "patterns" in patterns:
                            for i, pattern in enumerate(patterns["patterns"], 1):
                                st.write(f"**Pattern {i}: {pattern['name']}**")
                                st.write(pattern["description"])
                                if "evidence" in pattern:
                                    st.write("Evidence:")
                                    st.write(pattern["evidence"])
            else:
                st.text(str(data)[:300] + "...")
                
                specific_request = st.text_area("Any specific patterns you're interested in?", placeholder="Find recurring themes in this text...")
                
                if st.button("Find Patterns"):
                    with st.spinner("AI analyzing patterns..."):
                        patterns = ai_assistant.find_text_patterns(data, specific_request)
                        
                        st.write("### Discovered Patterns")
                        st.write(patterns["summary"])
                        
                        if "patterns" in patterns:
                            for i, pattern in enumerate(patterns["patterns"], 1):
                                st.write(f"**Pattern {i}: {pattern['name']}**")
                                st.write(pattern["description"])
                                if "examples" in pattern:
                                    st.write("Examples:")
                                    for example in pattern["examples"]:
                                        st.write(f"- {example}")
        else:
            st.info("No data available for pattern recognition. Please scrape or process data first.")
    
    elif assistance_type == "Summarize Data":
        if st.session_state.processed_data is not None:
            data = st.session_state.processed_data
            
            st.write("Current data sample:")
            if isinstance(data, pd.DataFrame):
                st.dataframe(data.head(3))
            else:
                st.text(str(data)[:300] + "...")
            
            focus_area = st.text_input("Any specific focus for the summary?", placeholder="Focus on pricing trends...")
            
            if st.button("Generate Summary"):
                with st.spinner("AI generating summary..."):
                    summary = ai_assistant.summarize_data(data, focus_area)
                    
                    st.write("### Data Summary")
                    st.write(summary["overview"])
                    
                    if "key_points" in summary:
                        st.write("### Key Points")
                        for point in summary["key_points"]:
                            st.write(f"- {point}")
                    
                    if "recommendations" in summary:
                        st.write("### Recommendations")
                        for rec in summary["recommendations"]:
                            st.write(f"- {rec}")
        else:
            st.info("No data available to summarize. Please scrape or process data first.")

# Footer
st.markdown("---")
st.markdown('<p style="text-align: center;">DataMiner AI - Developed with ❤️ using Streamlit</p>', unsafe_allow_html=True)
