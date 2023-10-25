import React, { Component } from 'react';
import { ArticleList } from './ArticleList/ArticleList';
import axios from 'axios';

import ContentLoader from 'react-content-loader';

const MyLoader = props => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#c2c2c2"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

export class App extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = await axios.get('/search?query=react');
      this.setState({ articles: response.data.hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { articles, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <p>
            <MyLoader />
            Loading...
          </p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
    );
  }
}
