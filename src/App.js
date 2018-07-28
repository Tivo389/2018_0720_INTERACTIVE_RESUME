import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { wheelNormalise } from './js/wheelNormalise';
import { debounce } from './js/debounce';
import StatBar from './components/StatBar';
import StatBarLoading from './components/StatBarLoading';
import Timeline from './components/Timeline';
import TimelineLoading from './components/TimelineLoading';
import SlideLanding from './components/SlideLanding';
import SlideIntro from './components/SlideIntro';
import SlideJourney from './components/SlideJourney';
import SlideText from './components/SlideText';
import SlideContact from './components/SlideContact';

class App extends Component {
  // STATE & PROPERTIES OF COMPONENT
  state = {
    loadingStat: 0
  };
  // - As a state it would require setState(), resulting in a rapid-rendering.
  scrolledPx = 0;

  // LIFECYCLE METHODS
  // - smoothscroll.polyfill() for handleHashClick().
  componentWillMount() {
    smoothscroll.polyfill();
  }
  // - Used to check if setState() wasn't being rapid-fired.
  componentWillUpdate() {
    // console.log('componentWillUpdate!');
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <main id="app" onWheel={this.handleWheel}>
        <StatBarLoading loadingProgress={this.state.loadingStat}/>
        <StatBar/>
        <TimelineLoading loadingProgress={this.state.loadingStat}/>
        <Timeline/>
        <SlideLanding slideNum="1"/>
        <SlideIntro slideNum="2" loadingStat="1/3"/>
        <SlideIntro slideNum="3" loadingStat="2/3"/>
        <SlideText slideNum="4" loadingStat="3/3"/>
        <SlideJourney slideNum="5"/>
        <SlideJourney slideNum="6"/>
        <SlideJourney slideNum="7"/>
        <SlideJourney slideNum="8"/>
        <SlideJourney slideNum="9"/>
        <SlideJourney slideNum="10"/>
        <SlideText slideNum="11"/>
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
        this.checkifLoading(e);
        scrollCycle = 0;
        return;
      }
      direction ? e.scrollLeft += perTick : e.scrollLeft -= perTick;
      scrollCycle += perTick;
    };
    const scroll = setInterval(scrollAnimation, 10);
  }, 250);

  // FUNCTION TO CHECK IF SLIDE HAS loadingStat DATA ATTRIBUTE
  // - If true, it will update the state accordingly.
  checkifLoading = (e) => {
    let currentSlide;
    let loadingStat;
    e.childNodes.forEach((child) => {
      const childIsInView = child.getBoundingClientRect().x === 0;
      const childHasLoading = child.attributes['data-loadingstat'];
      if(childIsInView && childHasLoading) currentSlide = child;
    });
    if (currentSlide) {
      const numerator = currentSlide.dataset.loadingstat[0];
      const denominator = currentSlide.dataset.loadingstat[2];
      loadingStat = numerator / denominator;
    } else {
      loadingStat = 0;
    }
    this.setState({ loadingStat: loadingStat });
  };
}

export default App;
