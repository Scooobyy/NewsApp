// src/Components/Slider.js
import React, { Component } from 'react';
import './Slider.css';

const images = [
    "https://wonderfulengineering.com/wp-content/uploads/2016/01/nature-wallpapers-8.jpg",
    "https://wallup.net/wp-content/uploads/2016/03/10/319576-photography-landscape-nature-water-grass-trees-plants-sunrise-lake.jpg",
    "https://www.techgrapple.com/wp-content/uploads/2016/08/Nature-Mountain-blue-effect.jpg",
    "https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-Nature-Backgrounds-Images-Download.jpg"
];

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        currentImage: (prevState.currentImage + 1) % images.length
      }));
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        className="background-slider"
        style={{ backgroundImage: `url(${images[this.state.currentImage]})` }}
      >
        <div className="slider-overlay">
          {this.props.children}
        </div>
      </div>
    );
  }
}
