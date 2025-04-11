import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go
import plotly.figure_factory as ff
from matplotlib.figure import Figure
from wordcloud import WordCloud
import re
import logging
from io import BytesIO

class Visualizer:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Set default color scheme
        self.color_sequence = px.colors.qualitative.Plotly
        
        # Set default Plotly template
        self.template = "plotly_white"
    
    def create_bar_chart(self, data, x_column, y_column, color_column=None, title="Bar Chart", orientation="vertical"):
        """
        Create a bar chart visualization.
        
        Args:
            data (pd.DataFrame): Input data
            x_column (str): Column for x-axis
            y_column (str): Column for y-axis
            color_column (str, optional): Column for color grouping
            title (str): Chart title
            orientation (str): "vertical" or "horizontal"
            
        Returns:
            plotly.graph_objects.Figure: Bar chart figure
        """
        try:
            if orientation == "horizontal":
                fig = px.bar(
                    data, 
                    y=x_column,  # Switch x and y for horizontal
                    x=y_column, 
                    color=color_column,
                    title=title,
                    color_discrete_sequence=self.color_sequence,
                    template=self.template,
                    orientation='h'
                )
            else:
                fig = px.bar(
                    data, 
                    x=x_column, 
                    y=y_column, 
                    color=color_column,
                    title=title,
                    color_discrete_sequence=self.color_sequence,
                    template=self.template
                )
            
            # Update layout
            fig.update_layout(
                title={
                    'text': title,
                    'y':0.95,
                    'x':0.5,
                    'xanchor': 'center',
                    'yanchor': 'top'
                }
            )
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating bar chart: {str(e)}")
            # Return a simple error figure
            return self._create_error_figure(f"Error creating bar chart: {str(e)}")
    
    def create_line_chart(self, data, x_column, y_column, color_column=None, title="Line Chart", show_trendline=False):
        """
        Create a line chart visualization.
        
        Args:
            data (pd.DataFrame): Input data
            x_column (str): Column for x-axis
            y_column (str): Column for y-axis
            color_column (str, optional): Column for color grouping
            title (str): Chart title
            show_trendline (bool): Whether to show trendline
            
        Returns:
            plotly.graph_objects.Figure: Line chart figure
        """
        try:
            # Check if x-axis is datetime and convert if needed
            if data[x_column].dtype != 'datetime64[ns]':
                try:
                    data = data.copy()
                    data[x_column] = pd.to_datetime(data[x_column], errors='coerce')
                except:
                    pass  # If conversion fails, use as is
            
            fig = px.line(
                data, 
                x=x_column, 
                y=y_column, 
                color=color_column,
                title=title,
                color_discrete_sequence=self.color_sequence,
                template=self.template
            )
            
            # Add trendline if requested
            if show_trendline and color_column is None:
                fig.add_traces(
                    px.scatter(
                        data, 
                        x=x_column, 
                        y=y_column,
                        trendline="ols"
                    ).data[1]
                )
            
            # Update layout
            fig.update_layout(
                title={
                    'text': title,
                    'y':0.95,
                    'x':0.5,
                    'xanchor': 'center',
                    'yanchor': 'top'
                }
            )
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating line chart: {str(e)}")
            # Return a simple error figure
            return self._create_error_figure(f"Error creating line chart: {str(e)}")
    
    def create_scatter_plot(self, data, x_column, y_column, color_column=None, title="Scatter Plot", show_trendline=False):
        """
        Create a scatter plot visualization.
        
        Args:
            data (pd.DataFrame): Input data
            x_column (str): Column for x-axis
            y_column (str): Column for y-axis
            color_column (str, optional): Column for color grouping
            title (str): Chart title
            show_trendline (bool): Whether to show trendline
            
        Returns:
            plotly.graph_objects.Figure: Scatter plot figure
        """
        try:
            fig = px.scatter(
                data, 
                x=x_column, 
                y=y_column, 
                color=color_column,
                title=title,
                color_discrete_sequence=self.color_sequence,
                template=self.template
            )
            
            # Add trendline if requested
            if show_trendline and color_column is None:
                fig.add_traces(
                    px.scatter(
                        data, 
                        x=x_column, 
                        y=y_column,
                        trendline="ols"
                    ).data[1]
                )
            
            # Update layout
            fig.update_layout(
                title={
                    'text': title,
                    'y':0.95,
                    'x':0.5,
                    'xanchor': 'center',
                    'yanchor': 'top'
                }
            )
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating scatter plot: {str(e)}")
            # Return a simple error figure
            return self._create_error_figure(f"Error creating scatter plot: {str(e)}")
    
    def create_pie_chart(self, data, label_column, value_column, title="Pie Chart"):
        """
        Create a pie chart visualization.
        
        Args:
            data (pd.DataFrame): Input data
            label_column (str): Column for pie chart labels
            value_column (str): Column for pie chart values
            title (str): Chart title
            
        Returns:
            plotly.graph_objects.Figure: Pie chart figure
        """
        try:
            # Group by label_column and aggregate value_column
            if len(data[label_column].unique()) > 10:
                # If too many categories, keep top 9 and group others
                grouped_data = data.groupby(label_column)[value_column].sum().reset_index()
                grouped_data = grouped_data.sort_values(value_column, ascending=False)
                
                top_9 = grouped_data.head(9)
                others = pd.DataFrame({
                    label_column: ['Other'],
                    value_column: [grouped_data.iloc[9:][value_column].sum()]
                })
                
                plot_data = pd.concat([top_9, others], ignore_index=True)
            else:
                plot_data = data.groupby(label_column)[value_column].sum().reset_index()
            
            fig = px.pie(
                plot_data, 
                names=label_column, 
                values=value_column,
                title=title,
                color_discrete_sequence=self.color_sequence,
                template=self.template
            )
            
            # Update layout
            fig.update_layout(
                title={
                    'text': title,
                    'y':0.95,
                    'x':0.5,
                    'xanchor': 'center',
                    'yanchor': 'top'
                }
            )
            
            # Update traces
            fig.update_traces(
                textposition='inside', 
                textinfo='percent+label',
                insidetextorientation='radial',
                pull=[0.05] + [0] * (len(plot_data) - 1)  # Pull first slice out slightly
            )
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating pie chart: {str(e)}")
            # Return a simple error figure
            return self._create_error_figure(f"Error creating pie chart: {str(e)}")
    
    def create_histogram(self, data, column, bins=20, title="Histogram"):
        """
        Create a histogram visualization.
        
        Args:
            data (pd.DataFrame): Input data
            column (str): Column to visualize
            bins (int): Number of bins
            title (str): Chart title
            
        Returns:
            plotly.graph_objects.Figure: Histogram figure
        """
        try:
            # Make sure the column is numeric
            if not pd.api.types.is_numeric_dtype(data[column]):
                # Try to convert to numeric
                numeric_data = pd.to_numeric(data[column], errors='coerce')
                # If too many NaNs after conversion, raise error
                if numeric_data.isna().sum() > len(data) / 2:
                    raise ValueError(f"Column '{column}' is not numeric and cannot be converted")
                data = data.copy()
                data[column] = numeric_data
            
            fig = px.histogram(
                data, 
                x=column,
                nbins=bins,
                title=title,
                color_discrete_sequence=self.color_sequence,
                template=self.template
            )
            
            # Update layout
            fig.update_layout(
                title={
                    'text': title,
                    'y':0.95,
                    'x':0.5,
                    'xanchor': 'center',
                    'yanchor': 'top'
                },
                bargap=0.1
            )
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating histogram: {str(e)}")
            # Return a simple error figure
            return self._create_error_figure(f"Error creating histogram: {str(e)}")
    
    def create_box_plot(self, data, x_column, y_column, color_column=None, title="Box Plot"):
        """
        Create a box plot visualization.
        
        Args:
            data (pd.DataFrame): Input data
            x_column (str): Column for x-axis (categorical)
            y_column (str): Column for y-axis (numeric)
            color_column (str, optional): Column for color grouping
            title (str): Chart title
            
        Returns:
            plotly.graph_objects.Figure: Box plot figure
        """
        try:
            # Make sure y_column is numeric
            if not pd.api.types.is_numeric_dtype(data[y_column]):
                # Try to convert to numeric
                numeric_data = pd.to_numeric(data[y_column], errors='coerce')
                # If too many NaNs after conversion, raise error
                if numeric_data.isna().sum() > len(data) / 2:
                    raise ValueError(f"Column '{y_column}' is not numeric and cannot be converted")
                data = data.copy()
                data[y_column] = numeric_data
            
            fig = px.box(
                data, 
                x=x_column, 
                y=y_column,
                color=color_column,
                title=title,
                color_discrete_sequence=self.color_sequence,
                template=self.template
            )
            
            # Update layout
            fig.update_layout(
                title={
                    'text': title,
                    'y':0.95,
                    'x':0.5,
                    'xanchor': 'center',
                    'yanchor': 'top'
                }
            )
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating box plot: {str(e)}")
            # Return a simple error figure
            return self._create_error_figure(f"Error creating box plot: {str(e)}")
    
    def create_heatmap(self, data, columns, title="Correlation Heatmap"):
        """
        Create a heatmap visualization.
        
        Args:
            data (pd.DataFrame): Input data
            columns (list): Columns to include in the heatmap
            title (str): Chart title
            
        Returns:
            plotly.graph_objects.Figure: Heatmap figure
        """
        try:
            # Make sure all columns are numeric
            numeric_data = data[columns].apply(pd.to_numeric, errors='coerce')
            
            # Calculate correlation matrix
            corr_matrix = numeric_data.corr().round(2)
            
            # Create heatmap
            fig = px.imshow(
                corr_matrix,
                text_auto=True,
                color_continuous_scale=px.colors.diverging.RdBu_r,
                title=title,
                template=self.template
            )
            
            # Update layout
            fig.update_layout(
                title={
                    'text': title,
                    'y':0.95,
                    'x':0.5,
                    'xanchor': 'center',
                    'yanchor': 'top'
                }
            )
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating heatmap: {str(e)}")
            # Return a simple error figure
            return self._create_error_figure(f"Error creating heatmap: {str(e)}")
    
    def create_wordcloud(self, data, text_column, max_words=200):
        """
        Create a word cloud visualization from a DataFrame column.
        
        Args:
            data (pd.DataFrame): Input data
            text_column (str): Column with text data
            max_words (int): Maximum number of words to include
            
        Returns:
            matplotlib.figure.Figure: Word cloud figure
        """
        try:
            # Combine all text in the column
            text = ' '.join(data[text_column].astype(str).tolist())
            
            # Clean text
            text = re.sub(r'http\S+', '', text)  # Remove URLs
            text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
            text = text.lower()
            
            # Create word cloud
            wordcloud = WordCloud(
                max_words=max_words,
                background_color='white',
                width=800,
                height=400,
                contour_width=1,
                contour_color='steelblue',
                colormap='viridis'
            ).generate(text)
            
            # Create figure
            fig = plt.figure(figsize=(10, 6))
            plt.imshow(wordcloud, interpolation='bilinear')
            plt.axis('off')
            plt.tight_layout(pad=0)
            plt.title('Word Cloud', fontsize=16, pad=20)
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating word cloud: {str(e)}")
            
            # Create error figure
            fig = plt.figure(figsize=(10, 6))
            plt.text(0.5, 0.5, f"Error creating word cloud: {str(e)}", 
                    horizontalalignment='center', verticalalignment='center',
                    fontsize=12, color='red')
            plt.axis('off')
            
            return fig
    
    def create_text_wordcloud(self, text, max_words=200):
        """
        Create a word cloud visualization from text.
        
        Args:
            text (str): Input text
            max_words (int): Maximum number of words to include
            
        Returns:
            matplotlib.figure.Figure: Word cloud figure
        """
        try:
            # Clean text
            text = re.sub(r'http\S+', '', text)  # Remove URLs
            text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
            text = text.lower()
            
            # Create word cloud
            wordcloud = WordCloud(
                max_words=max_words,
                background_color='white',
                width=800,
                height=400,
                contour_width=1,
                contour_color='steelblue',
                colormap='viridis'
            ).generate(text)
            
            # Create figure
            fig = plt.figure(figsize=(10, 6))
            plt.imshow(wordcloud, interpolation='bilinear')
            plt.axis('off')
            plt.tight_layout(pad=0)
            plt.title('Word Cloud', fontsize=16, pad=20)
            
            return fig
            
        except Exception as e:
            self.logger.error(f"Error creating word cloud from text: {str(e)}")
            
            # Create error figure
            fig = plt.figure(figsize=(10, 6))
            plt.text(0.5, 0.5, f"Error creating word cloud: {str(e)}", 
                    horizontalalignment='center', verticalalignment='center',
                    fontsize=12, color='red')
            plt.axis('off')
            
            return fig
    
    def _create_error_figure(self, error_message):
        """
        Create a simple error figure.
        
        Args:
            error_message (str): Error message to display
            
        Returns:
            plotly.graph_objects.Figure: Error figure
        """
        fig = go.Figure()
        
        fig.add_annotation(
            text=error_message,
            x=0.5, y=0.5,
            xref="paper", yref="paper",
            showarrow=False,
            font=dict(color="red", size=14)
        )
        
        fig.update_layout(
            title="Error Creating Visualization",
            xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
            yaxis=dict(showgrid=False, zeroline=False, showticklabels=False)
        )
        
        return fig
