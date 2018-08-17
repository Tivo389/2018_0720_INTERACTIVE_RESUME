import React, { Component } from 'react';

class TimelineNavBar extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div className="timelineNavBarWrapper">
        <i className="fas fa-caret-down"></i>
        <ul className="timelineNavBar">
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
            <li>2017-A</li>
          </a>
          <a href="#s10" onClick={this.handleHashClick}>
            <li>2017-B</li>
            {/*<li><i className="fas fa-code"></i></li>*/}
          </a>
          <a href="#s11" onClick={this.handleHashClick}>
            <li>2017 – 2018</li>
          </a>
          <a href="#s13" onClick={this.handleHashClick}>
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
  };

}

export default TimelineNavBar;
