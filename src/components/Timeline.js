import React, { Component } from 'react';
import AnimateOnChange from 'react-animate-on-change';

class Timeline extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.activeTimeline;
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
            {/*<i className="fas fa-caret-down"></i>*/}
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
