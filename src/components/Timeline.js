import React, { Component } from 'react';

class Timeline extends Component {
  // RENDER OF COMPONENT
  render() {
    return (
      <div id="timeline">
        <ul
          className="timePeriod"
          style={{ transform:`scaleX(${this.props.loadingProgress})` }}>
          <li>2008</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li>2009</li>
        </ul>
        <ul className="timeLinks">
          <a href="#s1" onClick={this.handleHashClick}>
            <li><i className="fas fa-home"></i></li>
          </a>
          <a href="#s5" onClick={this.handleHashClick}>
            <li>2008 – 2009</li>
          </a>
          <a href="#s6" onClick={this.handleHashClick}>
            <li>2012 – 2014</li>
          </a>
          <a href="#s7" onClick={this.handleHashClick}>
            <li>2014 – 2015</li>
          </a>
          <a href="#s8" onClick={this.handleHashClick}>
            <li>2016</li>
          </a>
          <a href="#s9" onClick={this.handleHashClick}>
            <li>2017</li>
          </a>
          <a href="#s10" onClick={this.handleHashClick}>
            <li>2017 – 2018</li>
          </a>
          <a href="#s12" onClick={this.handleHashClick}>
            <li><i className="fas fa-paper-plane"></i></li>
          </a>
        </ul>
      </div>
    );
  }

  // FUNCTION FOR CLICKING A HASH-LINK ANCHOR
  // - On click it will .scrollIntoView() the hash link.
  handleHashClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.attributes.href.value);
    target.scrollIntoView({ behavior:'smooth' });
    setTimeout(() => this.props.checkSlideAttributes(), 2500);
  };
}

export default Timeline;
