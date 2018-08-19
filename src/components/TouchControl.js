import React, { Component } from 'react';

class TouchControl extends Component {
  touchControlActive = false;

  // LIFECYCLE METHODS
  componentDidMount() {
    window.addEventListener('touchstart', this.activateTouchControl, {passive: true});
    this.statusCheck();
  }
  componentDidUpdate() {
    this.statusCheck();
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <div id="touchControl">
        <div data-name="left" onTouchStart={this.handleTouch}>
          <i className="fas fa-arrow-alt-circle-left"></i>
        </div>
        <div data-name="right" onTouchStart={this.handleTouch}>
          <i className="fas fa-arrow-alt-circle-right"></i>
        </div>
      </div>
    );
  }

  // FUNCTION TO SHOW TOUCH CONTROL IF TOUCH IS DETECTED
  // - Will show the touchControl component and hide the nav methods.
  activateTouchControl = () => {
    // console.log('activateTouchControl');
    if (!this.touchControlActive) {
      const touchControl = document.querySelector('#touchControl');
      const navMethods = document.querySelector('.navMethodsWrapper');
      touchControl.classList.add('active');
      navMethods.classList.add('inactive');
      this.touchControlActive = true;
    }
    return;
  };

  // FUNCTION THAT HANDLES TOUCH EVENT FOR THE BUTTONS
  // - These buttons cater for touch devices.
  handleTouch = (e) => {
    // console.log('handleTouch');
    const app = document.querySelector('#app');
    let scrollDirection = e.currentTarget.dataset.name;
    if (scrollDirection === 'left') {
      scrollDirection = false;
    } else if (scrollDirection === 'right') {
      scrollDirection = true;
    } else {
      return;
    };
    this.props.scrollAnimate(app, scrollDirection)
  };

  // FUNCTION THAT DE/ACTIVATES BUTTON
  // - 1st slide = left arrow deactivated, lastSlide = right arrow deactivated.
  statusCheck = () => {
    // console.log('statusCheck');
    const currentSlideNum = this.props.currentSlideNum;
    const touchControl = document.querySelector('#touchControl');
    const left = touchControl.querySelector("[data-name='left']");
    const right = touchControl.querySelector("[data-name='right']");
    left.classList.remove('inactive');
    right.classList.remove('inactive');
    if (currentSlideNum === 1) {
      left.classList.add('inactive');
    } else if (currentSlideNum === 12) {
      right.classList.add('inactive');
    } else {
      return;
    }
  };

}

export default TouchControl;
