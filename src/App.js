import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { wheelNormalise } from './js/wheelNormalise';
import { debounce } from './js/debounce';
import StatBar from './components/StatBar';
import StatBarLoading from './components/StatBarLoading';
import Timeline from './components/Timeline';
import SlideLanding from './components/SlideLanding';
import SlideIntro from './components/SlideIntro';
import SlideJourney from './components/SlideJourney';
import SlideText from './components/SlideText';
import SlideContact from './components/SlideContact';
import db from './pseudoDB';

class App extends Component {

  // STATE & PROPERTIES OF COMPONENT
  state = {
    currentJourneySlideNum: 0,
    currentSlideNum: 1,
    journeyDetails: db,
    loadProgress: 0,
    statBarActive: false,
    timelineActive: false
  };
  // - As a state it would require setState(), resulting in a rapid-rendering.
  scrolledPx = 0;

  // LIFECYCLE METHODS
  componentWillMount() {
    smoothscroll.polyfill(); // - smoothscroll.polyfill() for handleHashClick().
  }
  componentWillUpdate() {
    // console.log('componentWillUpdate!'); // - Check if setState() isn't being rapid-fired.
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate!');
    this.statBarPadding();
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <main
        id="app"
        onWheel={this.handleWheel}
        onScroll={this.handleScroll}>
        <StatBarLoading
          loadProgress={this.state.loadProgress}
          statBarActive={this.state.statBarActive}/>
        <StatBar
          statBarActive={this.state.statBarActive}
          journeyDetails={this.state.journeyDetails}
          currentJourneySlideNum={this.state.currentJourneySlideNum}/>
        <Timeline
          loadProgress={this.state.loadProgress}
          timelineActive={this.state.timelineActive}
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}
          journeyDetails={this.state.journeyDetails}
          currentSlideNum={this.state.currentSlideNum}
          currentJourneySlideNum={this.state.currentJourneySlideNum}/>
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
          journey={this.state.journeyDetails.j1.details}
          imagePath={require('./images/dummy.svg')}/>
        <SlideJourney
          slideNum="6"
          slideJNum="2"
          journey={this.state.journeyDetails.j2.details}
          imagePath={require('./images/dummy.svg')}/>
        <SlideJourney
          slideNum="7"
          slideJNum="3"
          journey={this.state.journeyDetails.j3.details}
          imagePath={require('./images/dummy.svg')}/>
        <SlideJourney
          slideNum="8"
          slideJNum="4"
          journey={this.state.journeyDetails.j4.details}
          imagePath={require('./images/dummy.svg')}/>
        <SlideJourney
          slideNum="9"
          slideJNum="5"
          journey={this.state.journeyDetails.j5.details}
          imagePath={require('./images/dummy.svg')}/>
        <SlideJourney
          slideNum="10"
          slideJNum="6"
          journey={this.state.journeyDetails.j6.details}
          imagePath={require('./images/dummy.svg')}/>
        <SlideJourney
          slideNum="11"
          slideJNum="7"
          journey={this.state.journeyDetails.j7.details}
          imagePath={require('./images/dummy.svg')}/>
        <SlideText
          slideNum="12"
          text={["Thank you for your time.", "That's my journey so far."]}/>
        <SlideContact slideNum="13"/>
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
    const sBarSlides = [5,6,7,8,9,10,11];
    const sBarActive = sBarSlides.find(integer => integer === this.state.currentSlideNum);
    const timelineSlides = [5,6,7,8,9,10,11,12,13];
    const tActive = timelineSlides.find(integer => integer === this.state.currentSlideNum);
    sBarActive ? this.setState({ statBarActive: true }) : this.setState({ statBarActive: false });
    tActive ? this.setState({ timelineActive: true }) : this.setState({ timelineActive: false });
  };

  // FUNCTION THAT RUNS FUNCTIONS AFTER THE SCROLL IS COMPLETE.
  // - Implemented like this to cater for smoothScroll where the duration has variation.
  handleScroll = debounce(() => {
    this.checkSlideAttributes();
    this.checkActiveStatus();
  }, 250);

  // FUNCTION THAT CHECKS IF STATBAR IS ACTIVE.
  // - If the statBar is active, padding-top will be added to the slide.
  // - 38px is based on the timeline + margin distance from the bottom of viewport.
  statBarPadding = () => {
    // console.log('statBarPadding');
    const slides = document.querySelectorAll("section[class^='slide']");
    if(this.state.statBarActive) {
      const statBar = document.querySelector('#statBar');
      const statBarHeight = `${statBar.getBoundingClientRect().height - 38}px`;
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

}

export default App;
