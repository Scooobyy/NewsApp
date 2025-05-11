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
    this.loaderRef = createRef(); // 👈 Reference to the loader div
  }

  componentDidMount() {
    this.fetchArticles(this.state.page);

    // Set up IntersectionObserver for infinite scrolling
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
    let url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=3f906f326f62466b937ed1e947ef6e54`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      console.log('API Response:', parsedData);

      if (parsedData && parsedData.articles && Array.isArray(parsedData.articles)) {
        this.setState((prevState) => ({
          articles: [...prevState.articles, ...parsedData.articles], // Append new articles
          totalResults: parsedData.totalResults,
          page,
          loading: false,
        }));
      } else {
        console.error('No articles found or response format is incorrect');
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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

  render() {
    const { articles, loading } = this.state;

    return (
      <div className="container my-1">
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

        {/* Loader */}
        {loading && (
          <h4 className="text-center mt-4">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e596a334-ec86-4a84-96df-17900077efc2/d7gwtxy-a0648d53-d900-425d-85e4-96fdeb5e7968.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9lNTk2YTMzNC1lYzg2LTRhODQtOTZkZi0xNzkwMDA3N2VmYzIvZDdnd3R4eS1hMDY0OGQ1My1kOTAwLTQyNWQtODVlNC05NmZkZWI1ZTc5NjguZ2lmIn1dXX0.EUXeqrmX0WznMmIeDsU2e2oViUjumxXkYxFrK3A1OOY"
              alt="loading"
              style={{ width: '80px', height: '80px' }}
            />
          </h4>
        )}

        {/* IntersectionObserver trigger */}
        <div ref={this.loaderRef}></div>
      </div>
    );
  }
}

export default News;
