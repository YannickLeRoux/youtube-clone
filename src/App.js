import React, { Component } from 'react';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import './App.css';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const API_KEY = 'AIzaSyACcU0IJj8yWytr3nTELOMvskn6-lctLsc';




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('react js');

  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => this.setState(
      { videos: videos ,
        selectedVideo: videos[0] }
    ));

  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
    return (
      <div className="App">
        <h3 className="logo">Video Live Search</h3>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={ this.state.videos }
          onVideoSelect={video => this.setState({ selectedVideo: video })} />

      </div>
    );
  }
}

export default App;
