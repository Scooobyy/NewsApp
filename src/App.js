import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import About from './Components/About1';
import './Components/News.css';
import './Components/About.css';
import Slider from './Components/Slider';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  state = {
    searchQuery: 'india'
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <>
        <Slider />
        <div style={{ paddingTop: '0vh' }}>
          <Router>
            <Navbar onSearch={this.handleSearch} />
            <Routes>
              <Route
                path="/"
                element={<News key={this.state.searchQuery} query={this.state.searchQuery} />}
              />
              <Route exact path="/about" element={<About />} />

              {/* ✅ Category Routes */}
              <Route path="/business" element={<News key="business" query="business" />} />
              <Route path="/general" element={<News key="general" query="general" />} />
              <Route path="/health" element={<News key="health" query="health" />} />
              <Route path="/sports" element={<News key="sports" query="sports" />} />
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}
