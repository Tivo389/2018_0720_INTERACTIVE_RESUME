import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { wheelNormalise } from './js/wheelNormalise';
import { debounce } from './js/debounce';
import StatBarLoading from './components/StatBarLoading';
import StatBar from './components/StatBar';
import TimelineLoading from './components/TimelineLoading';
import TimelineNavBar from './components/TimelineNavBar';
import SlideLanding from './components/SlideLanding';
import SlideIntro from './components/SlideIntro';
import SlideJourney from './components/SlideJourney';
import SlideText from './components/SlideText';
import SlideContact from './components/SlideContact';
import ScreenTooSmall from './components/ScreenTooSmall';
import TouchControl from './components/TouchControl';
import db from './pseudoDB';

class App extends Component {

  // STATE & PROPERTIES OF COMPONENT
  state = {
    activeStatBar: false,
    activeTimeline: false,
    currentJourneySlideNum: 0,
    currentSlideNum: 1,
    database: db,
    loadProgress: 0,
    showStatBarOn: [5,6,7,8,9,10,11],
    showTimelineOn: [5,6,7,8,9,10,11]
  };
  // - As a state it would require setState(), resulting in a rapid-rendering.
  scrolledPx = 0;
  startPoint;
  endPoint;

  // LIFECYCLE METHODS
  componentWillMount() {
    smoothscroll.polyfill(); // - smoothscroll.polyfill() for handleHashClick().
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, {passive: false});
    window.addEventListener('touchstart', this.handleTouchStart, {passive: true});
    window.addEventListener('touchmove', this.handleTouchMove, {passive: false});
    window.addEventListener('touchend', this.handleTouchEnd, {passive: true});
  }
  componentWillUpdate() {
    // console.log('componentWillUpdate!'); // - Check if setState() isn't being rapid-fired.
  }
  componentDidUpdate() {
    this.statBarPadding();
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <main
        id="app"
        tabIndex="0"
        onWheel={this.handleWheel}
        onScroll={this.handleScroll}>
        <TouchControl
          currentSlideNum={this.state.currentSlideNum}
          scrollAnimate={this.scrollAnimate}>
        </TouchControl>
        <ScreenTooSmall></ScreenTooSmall>
        <StatBarLoading
          loadProgress={this.state.loadProgress}
          activeStatBar={this.state.activeStatBar}/>
        <StatBar
          activeStatBar={this.state.activeStatBar}
          database={this.state.database}
          currentJourneySlideNum={this.state.currentJourneySlideNum}/>
        <TimelineLoading
          loadProgress={this.state.loadProgress}
          activeTimeline={this.state.activeTimeline}/>
        <TimelineNavBar currentSlideNum={this.state.currentSlideNum}></TimelineNavBar>
        <SlideLanding slideNum="1"/>
        <SlideIntro
          slideNum="2"
          loadingStatus="1/3"
          imagePath={require('./images/frontEndDev.svg')}
          title="Front-end Developer"
          pointOne="A developer with the technical knowledge of code to create the visual elements  for a software, application, or website."
          pointTwo="Also takes part in the User-Interface (UI) and User-Experience (UX) process to  ensure the product has the appropriate look and feel."/>
        <SlideIntro
          slideNum="3"
          loadingStatus="2/3"
          imagePath={require('./images/graphicDesigner.svg')}
          title="Graphic Designer"
          pointOne="A designer with the technical knowledge to communicate information through  visual means such as image and typography."
          pointTwo="Since it's a broad term you may come across designers who work in a specific field, such as branding, logo, editorial, and packaging."/>
        <SlideText
          slideNum="4"
          loadingStatus="3/3"
          text={["My journey so far..."]}/>
        <SlideJourney
          slideNum="5"
          slideJNum="1"
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          state={this.state}/>
        <SlideJourney
          slideNum="6"
          slideJNum="2"
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          state={this.state}/>
        <SlideJourney
          slideNum="7"
          slideJNum="3"
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          state={this.state}/>
        <SlideJourney
          slideNum="8"
          slideJNum="4"
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          state={this.state}/>
        <SlideJourney
          slideNum="9"
          slideJNum="5"
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          state={this.state}/>
        <SlideJourney
          slideNum="10"
          slideJNum="6"
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          state={this.state}/>
        <SlideJourney
          slideNum="11"
          slideJNum="7"
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          state={this.state}/>
        <SlideContact slideNum="12"/>
      </main>
    );
  }

  // FUNCTION FOR WHEEL EVENT
  // - Stores amount scrolled and will activate 'scrollAnimate()' when it reaches the threshold.
  // - Caters for mouseWheel (vertical), trackpad vertical-swipe, and trackpad horizontal-swipe.
  handleWheel = (e) => {
    // console.log('handleWheel');
    e.persist();
    e.preventDefault();
    let scrolledPx = this.scrolledPx;
    const pixelY = Math.floor(wheelNormalise(e).pixelY);
    const pixelX = Math.floor(wheelNormalise(e).pixelX * -1);
    let pixels = Math.abs(pixelY) > Math.abs(pixelX) ? pixelY : pixelX;
    if (pixels > window.innerWidth) pixels = window.innerWidth;
    const threshold = window.innerWidth * 0.8;
    const activateScroll = scrolledPx > threshold || -scrolledPx > threshold;
    const scrollDirection = scrolledPx >= 0 ? true : false;
    const currentTotal = scrolledPx += pixels;
    this.scrolledPx = currentTotal;
    if (activateScroll) {
      this.scrollAnimate(e.currentTarget, scrollDirection);
      this.scrolledPx = 0;
    }
  };

  // FUNCTION FOR ANIMATING THE SCROLL
  // - Will animate-scroll the slide, if direction is true it will scroll ==>.
  scrollAnimate = debounce((e, direction) => {
    // console.log('scrollAnimate');
    const duration = 350;
    const width = window.innerWidth;
    const perTick = Math.floor(width / duration * 10);
    const currentSlide = Math.floor(e.scrollLeft / width);
    const scrollRightPx = (currentSlide + 1) * width;
    const scrollLeftPx = (currentSlide - 1) * width;
    let scrollCycle = 0;
    const scrollAnimation = () => {
      if (scrollCycle > width) {
        direction ? e.scrollLeft = scrollRightPx : e.scrollLeft = scrollLeftPx;
        clearInterval(scroll);
        scrollCycle = 0;
        return;
      }
      direction ? e.scrollLeft += perTick : e.scrollLeft -= perTick;
      scrollCycle += perTick;
    };
    const scroll = setInterval(scrollAnimation, 10);
  }, 250);

  // FUNCTION TO CHECK SLIDE ATTRIBUTES
  // - Implemented on the scroll event and anchor clicks.
  checkSlideAttributes = () => {
    // console.log('checkSlideAttributes');
    const app = document.querySelector('#app');
    let sHasLoadAttr;
    let loadingStatus;
    let slideNum = this.state.currentSlideNum;
    let slideJNum = 0;
    app.childNodes.forEach((slide) => {
      const sInView = slide.getBoundingClientRect().x === 0;
      const sHasLoading = slide.attributes['data-loadingstatus'];
      const sHasJNum = slide.attributes['data-slidejnum'];
      const sHasNumRegex = /[s]\d+/;
      const sHasNum = slide.id.match(sHasNumRegex);
      if (sInView && sHasNum) slideNum = +sHasNum[0].slice(1,sHasNum[0].length);
      if (sInView && sHasLoading) sHasLoadAttr = slide;
      if (sInView && sHasJNum) slideJNum = +slide.dataset.slidejnum;
      if (sHasLoadAttr) {
        const numerator = sHasLoadAttr.dataset.loadingstatus[0];
        const denominator = sHasLoadAttr.dataset.loadingstatus[2];
        loadingStatus = numerator / denominator;
      } else {
        loadingStatus = 0;
      }
    });
    this.setState({
      loadProgress: loadingStatus,
      currentSlideNum: slideNum,
      currentJourneySlideNum: slideJNum
    });
  };

  // FUNCTION TO CHECK IF ACTIVE CLASS NEEDS TO BE ADDED TO STATBAR & TIMELINE.
  // - If state.loadingStatus is 1, it will keep active class on.
  checkActiveStatus = () => {
    // console.log('checkActiveStatus');
    const { showStatBarOn, showTimelineOn, currentSlideNum } = this.state;
    const sBarActive = Boolean(showStatBarOn.find(integer => integer === currentSlideNum));
    const tActive = Boolean(showTimelineOn.find(integer => integer === currentSlideNum));
    this.setState({
      activeStatBar: sBarActive,
      activeTimeline: tActive
    });
  };

  // FUNCTION THAT RUNS FUNCTIONS AFTER THE SCROLL IS COMPLETE.
  // - Implemented like this to cater for smoothScroll where the duration has variation.
  handleScroll = debounce(() => {
    this.checkSlideAttributes();
    this.checkActiveStatus();
  }, 350);

  // FUNCTION THAT CHECKS IF STATBAR IS ACTIVE.
  // - If the statBar is active, padding-top will be added to the slide.
  statBarPadding = () => {
    // console.log('statBarPadding');
    const slides = document.querySelectorAll("section[class^='slide']");
    if(this.state.activeStatBar) {
      const statBar = document.querySelector('#statBar');
      const statBarHeight = `${statBar.getBoundingClientRect().height}px`;
      // Note the backup value for 'delay' is based on statBar.scss.
      const delay = window.getComputedStyle(statBar).transitionDelay || '0.3s';
      slides.forEach(slide => {
        slide.style.transitionDelay = delay;
        slide.style.paddingTop = statBarHeight;
      });
    } else {
      slides.forEach(slide => slide.style.paddingTop = 0);
    }
  };

  // FUNCTION TO MOVE SLIDE BY PRESSING ARROW KEY
  // - This is bound to window.eventListener and will not work while an input/textarea is focused.
  // - If input/textarea is focused and you scroll to a different slide it will blur first.
  handleKeyDown = (e) => {
    // console.log('handleKeyDown');
    const app = document.querySelector('#app');
    const tagName = document.activeElement.tagName;
    const onContactSlide = this.state.currentSlideNum === 12;
    const inputIsActive = (tagName === "INPUT") || (tagName === "TEXTAREA");
    const key = e.keyCode || e.which || e.key;
    const isLeftArrow = (key === 37) || (key === 'ArrowLeft');
    const isRightArrow = (key === 39) || (key === 'ArrowRight');
    let scrollDirection;
    if (isLeftArrow && inputIsActive && !onContactSlide) {
      document.activeElement.blur();
      scrollDirection = false;
    } else if (isRightArrow && inputIsActive && !onContactSlide) {
      document.activeElement.blur();
      scrollDirection = true;
    } else if (isLeftArrow && !inputIsActive) {
      scrollDirection = false;
    } else if (isRightArrow && !inputIsActive) {
      scrollDirection = true;
    } else {
      return;
    };
    e.preventDefault();
    this.scrollAnimate(app, scrollDirection);
  };

  // FUNCTION TO LOG TOUCH-START COORDINATES
  // - Logs x-Coordinate of touch start.
  handleTouchStart = (e) => {
    // console.log('handleTouchStart');
    this.startPoint = e.touches[0].clientX;
    // console.log('startPoint: ' + this.startPoint);
  };

  // FUNCTION TO PREVENT DEFAULT TOUCH-MOVE DEFAULT
  // - Prevents the default action of touch move.
  handleTouchMove = (e) => {
    // console.log('handleTouchMove');
    e.preventDefault();
  };

  // FUNCTION TO LOG TOUCH-END COORDINATES AND DETERMINE SWIPE DIRECTION
  // - Logs x-Coordinate of touch end and then determines the swipe direction.
  handleTouchEnd = (e) => {
    // console.log('handleTouchEnd');
    this.endPoint = e.changedTouches[0].clientX;
    const app = document.querySelector('#app');
    const distance = this.startPoint - this.endPoint;
    const swipeLeft = (distance > 0) && (distance > 100);
    const swipeRight = (distance < 0) && (distance < -100);
    if (swipeLeft) {
      this.scrollAnimate(app, true);
    } else if (swipeRight) {
      this.scrollAnimate(app, false);
    } else {
      return;
    }
  };

}

export default App;
