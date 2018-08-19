import React, { Component } from 'react';

class SlideLanding extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section
        id={`s${this.props.slideNum}`}
        className="slideLanding"
        data-slidenum={this.props.slideNum}>
        <h1 className="alignCenter">Hello I'm <span className="colorMain">Shunjiro Miyaki</span><br/>a Front-end Developer & Graphic Designer</h1>
        <div className="navMethodsWrapper">
          <div className="navMethodScroll">
            <p className="scroll">scroll</p>
            <p className="scroll">scroll</p>
            <p className="scroll">scroll</p>
          </div>
          {/*<p>&emsp;or&emsp;</p>
          <div className="navMethodScroll swipeWrapper">
            <div className="swipeContainer swipe">
              <p>swipe</p>
              <p>swipe</p>
              <p>swipe</p>
            </div>
          </div>*/}
          <p>&emsp;or&emsp;</p>
          <div className="navMethodIcon">
            <p className="arrowKey">
              <i className="far fa-caret-square-left"></i>
            </p>
            &ensp;
            <p className="arrowKey">
              <i className="far fa-caret-square-right"></i>
            </p>
          </div>
        </div>
      </section>
    );
  }

}

export default SlideLanding;
