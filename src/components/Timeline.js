import React, { Component } from 'react';
import TimelineLoading from './TimelineLoading';
import AnimateOnChange from 'react-animate-on-change';

class Timeline extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.activeTimeline;
    const loadProgress = this.props.loadProgress;
    const jData = this.props.database;
    const sNum = this.props.currentSlideNum;
    const jNum = `j${this.props.currentJourneySlideNum}`;
    const j = jData[jNum];
    const classValue = isActive ? 'active' : '';
    return (
      <div id="timeline" className={classValue}>
        <ul className="timePeriod">
          { (sNum >= 5 && sNum <= 11) ? (
              <AnimateOnChange
                customTag="li"
                baseClassName="year"
                animationClassName="yearActive"
                animate={true}>
                {j.yearStart}
              </AnimateOnChange>
            ) : (
              <li>2019</li>
          ) }
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li>
            <i className="fas fa-caret-down"></i>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          { (sNum >= 5 && sNum <= 11) ? (
              <AnimateOnChange
                customTag="li"
                baseClassName="year"
                animationClassName="yearActive"
                animate={true}>
                {j.yearEnd}
              </AnimateOnChange>
            ) : (
              <li>20XX</li>
          ) }
          <TimelineLoading loadProgress={loadProgress} activeTimeline={isActive}/>
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

export default Timeline;
