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

class App extends Component {
  // STATE & PROPERTIES OF COMPONENT
  state = {
    loadProgress: 0,
    currentSlideNum: 1,
    statBarActive: false,
    timelineActive: false,
    statApplications: {
      a1: {
        appName: 'Photoshop CC',
        appStat: 80
      },
      a2: {
        appName: 'Illustrator CC',
        appStat: 100
      },
      a3: {
        appName: 'InDesign CC',
        appStat: 100
      },
      a4: {
        appName: 'Animate CC',
        appStat: 30
      },
      a5: {
        appName: 'Sketch',
        appStat: 70
      }
    },
    statCoding: {
      c1: {
        appName: 'HTML',
        appStat: 100
      },
      c2: {
        appName: 'CSS (Sass)',
        appStat: 100
      },
      c3: {
        appName: 'JavaScript',
        appStat: 80
      },
      c4: {
        appName: 'Ruby',
        appStat: 50
      }
    },
    statTools: {
      list: ['Angular', 'CLI', 'Google AdWords', 'Google Analytics', 'Github', 'Gulp', 'jQuery', 'Koala', 'Rails', 'React', 'Slack', 'Sublime Text', 'Snap.svg']
    }
  };
  // - As a state it would require setState(), resulting in a rapid-rendering.
  scrolledPx = 0;

  // LIFECYCLE METHODS
  componentWillMount() {
    smoothscroll.polyfill(); // - smoothscroll.polyfill() for handleHashClick().
    console.log(this.state.statTools.list);
  }
  componentWillUpdate() {
    console.log('componentWillUpdate!'); // - Check if setState() isn't being rapid-fired.
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate!');
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <main id="app" onWheel={this.handleWheel} onScroll={this.handleScroll}>
        <StatBarLoading
          loadProgress={this.state.loadProgress}
          statBarActive={this.state.statBarActive}/>
        <StatBar
          statBarActive={this.state.statBarActive}
          statCoding={this.state.statCoding}
          statApplications={this.state.statApplications}
          statTools={this.state.statTools}/>
        <Timeline
          loadProgress={this.state.loadProgress}
          timelineActive={this.state.timelineActive}
          checkSlideAttributes={this.checkSlideAttributes}
          checkActiveStatus={this.checkActiveStatus}/>
        <SlideLanding slideNum="1"/>
        <SlideIntro slideNum="2" loadingStatus="1/3"/>
        <SlideIntro slideNum="3" loadingStatus="2/3"/>
        <SlideText slideNum="4" loadingStatus="3/3"/>
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
    let slideNum = 0;
    app.childNodes.forEach((slide) => {
      const sInView = slide.getBoundingClientRect().x === 0;
      const sHasLoading = slide.attributes['data-loadingstatus'];
      const sHasNumRegex = /[s]\d+/;
      const sHasNum = slide.id.match(sHasNumRegex);
      if (sInView && sHasNum) slideNum = +sHasNum[0].slice(1,sHasNum[0].length);
      if (sInView && sHasLoading) sHasLoadAttr = slide;
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
      currentSlideNum: slideNum
    });
  };

  // FUNCTION TO CHECK IF ACTIVE CLASS NEEDS TO BE ADDED TO STATBAR & TIMELINE.
  // - If state.loadingStatus is 1, it will keep active class on.
  checkActiveStatus = () => {
    // console.log('checkActiveStatus');
    const sBarSlides = [5,6,7,8,9,10];
    const sBarActive = sBarSlides.find(integer => integer === this.state.currentSlideNum);
    const timelineSlides = [5,6,7,8,9,10,11,12];
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
}

export default App;
