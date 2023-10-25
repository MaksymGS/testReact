import React, { Component } from 'react';
import { ArticleList } from './ArticleList/ArticleList';
import axios from 'axios';

import ContentLoader, { Facebook } from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader viewBox="0 0 380 70">
    {/* Only SVG shapes */}    
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);
const MyFacebookLoader = () => <Facebook />;

axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

export class App extends Component {
  state = {
    articles: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await axios.get('/search?query=react');
    this.setState({
      articles: response.data.hits,
      isLoading: false,
    });
  }

  render() {
    const { articles, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <p>
            <MyFacebookLoader />
            Loading...
          </p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
    );
  }
}
