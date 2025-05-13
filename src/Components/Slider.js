// src/Components/Slider.js
import React, { Component } from 'react';
import './Slider.css';

const images = [

    "https://cdn.pixabay.com/photo/2013/01/01/15/56/new-zealand-73230_1280.jpg",

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
