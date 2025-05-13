import React, { Component } from 'react';
import './News.css';

export class Newsitem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl ,author,date} = this.props;
    // author,date
    const fallbackImage = "https://media.istockphoto.com/id/472226477/photo/smart-world.webp?s=2048x2048&w=is&k=20&c=r-M9HPuRJo5I3mnvuTEDjw1r8j4fxH1LTvYsc0DmGn4=";

    return (
      <div className="news-glass-tile" style={{ backgroundImage: `url(${imageUrl || fallbackImage})` }}>
        <div className="news-glass-overlay">
          <h3 className="glass-title">{title}</h3>
          <p className="glass-desc">{description}</p>
          <p class="card-text"><small className="text-muted">By{!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
          <a
          
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button"
          >
            Read More →
          </a>
        </div>
      </div>
    );
  }
}

export default Newsitem;
