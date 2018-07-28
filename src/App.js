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
    loadingStat: 0,
    currentSlideNum: 1,
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
    console.log('componentWillUpdate!'); // - Check if setState() wasn't being rapid-fired.
  }
  componentDidUpdate() {
    // console.log('componentWillUpdate!'); // - Check state.loadingState to activate/deactivate.
    this.addActiveClass();
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <main id="app" onWheel={this.handleWheel}>
        <StatBarLoading loadingProgress={this.state.loadingStat}/>
        <StatBar/>
        <TimelineLoading loadingProgress={this.state.loadingStat}/>
        <Timeline checkSlideAttributes={this.checkSlideAttributes}/>
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
        this.checkSlideAttributes();
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
  checkSlideAttributes = () => {
    // console.log('checkSlideAttributes');
    const app = document.querySelector('#app');
    let sHasLoadAttr;
    let loadingStat;
    let slideNum = 0;
    app.childNodes.forEach((slide) => {
      const sInView = slide.getBoundingClientRect().x === 0;
      const sHasLoading = slide.attributes['data-loadingstat'];
      const sHasNumRegex = /[s]\d+/;
      const sHasNum = slide.id.match(sHasNumRegex);
      if (sInView && sHasNum) slideNum = +sHasNum[0].slice(1,sHasNum[0].length);
      if (sInView && sHasLoading) sHasLoadAttr = slide;
      if (sHasLoadAttr) {
        const numerator = sHasLoadAttr.dataset.loadingstat[0];
        const denominator = sHasLoadAttr.dataset.loadingstat[2];
        loadingStat = numerator / denominator;
      } else {
        loadingStat = 0;
      }
    });
    this.setState({
      loadingStat: loadingStat,
      currentSlideNum: slideNum
    });
  };

  // FUNCTION TO CHECK IF ACTIVE CLASS NEEDS TO BE ADDED TO STATBAR & TIMELINE.
  // - If state.loadingState is 1, it will keep active class on.
  addActiveClass = () => {
    // console.log('addActiveClass');
    // console.log(this.state.statBarActive);
    // console.log(this.state.timelineActive);
  };
}

export default App;
