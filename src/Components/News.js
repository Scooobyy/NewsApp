import React, { Component, createRef } from 'react';
import NewsItem from './NewsItem';
import './News.css';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 6,
      totalResults: 0,
    };
    this.loaderRef = createRef(); // Reference for IntersectionObserver
  }

  componentDidMount() {
    this.fetchArticles(this.state.page);

    // Infinite scroll observer
    this.observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          this.loadMoreArticles();
        }
      },
      { threshold: 1.0 }
    );

    if (this.loaderRef.current) {
      this.observer.observe(this.loaderRef.current);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      // Reset articles when the query changes
      this.setState({ articles: [], page: 1 }, () => {
        this.fetchArticles(1);
      });
    }
  }

  componentWillUnmount() {
    if (this.observer && this.loaderRef.current) {
      this.observer.unobserve(this.loaderRef.current);
    }
  }

  fetchArticles = async (page) => {
    this.setState({ loading: true });
    const { query } = this.props;
    const { pageSize } = this.state;

    try {
      // Calling the local backend API
      const response = await fetch(`http://localhost:5000/api/news?q=${query}&page=${page}&pageSize=${pageSize}`);
      const parsedData = await response.json();

      console.log('API Response:', parsedData);

      if (parsedData && Array.isArray(parsedData.articles)) {
        this.setState((prevState) => ({
          articles:
            page === 1
              ? parsedData.articles
              : [...prevState.articles, ...parsedData.articles],
          totalResults: parsedData.totalResults,
          page,
          loading: false,
        }));
      } else {
        console.error('No articles or bad format');
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      this.setState({ loading: false });
    }
  };

  loadMoreArticles = () => {
    const { page, pageSize, totalResults, loading } = this.state;
    const maxPage = Math.ceil(totalResults / pageSize);

    if (!loading && page < maxPage) {
      this.fetchArticles(page + 1);
    }
  };

  handlePrevClick = () => {
    if (this.state.page > 1) {
      const newPage = this.state.page - 1;
      this.setState(
        { page: newPage, articles: [] },
        () => this.fetchArticles(newPage)
      );
    }
  };

  handleNextClick = () => {
    const { page, pageSize, totalResults } = this.state;
    const maxPage = Math.ceil(totalResults / pageSize);

    if (page + 1 <= maxPage) {
      const newPage = page + 1;
      this.setState(
        { page: newPage, articles: [] },
        () => this.fetchArticles(newPage)
      );
    }
  };

  render() {
    const { articles, loading, page, pageSize, totalResults } = this.state;

    return (
      <div className="container my-1" style={{ paddingBottom: '100px' }}>
        <h2 className="text-center mb-4">📰 DailyIndianTimes - Top Headlines</h2>

        <div className="row">
          {articles.map((element, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem
                title={element.title ? element.title.slice(0, 20) + '...' : 'No Title'}
                description={element.description ? element.description.slice(0, 40) + '...' : 'No Description'}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <h4 className="text-center mt-4">
            <img
              src="https://i.pinimg.com/originals/0b/f2/85/0bf2854f6e017a49d461c719402425dc.gif"
              alt="loading"
              style={{ width: '80px', height: '80px' }}
            />
          </h4>
        )}

        {/* Intersection Observer Target */}
        <div ref={this.loaderRef}></div>

        {/* Sticky Footer Navigation Buttons */}
        <div
          className="sticky-footer d-flex justify-content-between p-3 shadow"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 0,
          }}
        >
          <button
            disabled={page <= 1}
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <span className="mt-2">Page {page} of {Math.ceil(totalResults / pageSize)}</span>
          <button
            disabled={page + 1 > Math.ceil(totalResults / pageSize)}
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
