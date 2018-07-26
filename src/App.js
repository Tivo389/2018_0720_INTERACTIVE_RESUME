import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { wheelNormalise } from './js/wheelNormalise';
import { debounce } from './js/debounce';
import Timeline from './components/Timeline';
import StatBar from './components/StatBar';
import StatBarLoading from './components/StatBarLoading';
import SlideLanding from './components/SlideLanding';
import SlideIntro from './components/SlideIntro';
import SlideJourney from './components/SlideJourney';
import SlideText from './components/SlideText';
import SlideContact from './components/SlideContact';

class App extends Component {

  // STATE OF COMPONENT
  state = {
    scrolledPx: 0,
    loadingStat: 0
  };

  // LIFECYCLE METHODS
  // - smoothscroll.polyfill() for handleHashClick().
  componentWillMount() {
    smoothscroll.polyfill();
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <main id="app" onWheel={this.handleWheel}>
        <StatBarLoading loadingProgress={this.state.loadingStat}/>
        <StatBar/>
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
        <SlideJourney slideNum="11"/>
        <SlideJourney slideNum="12"/>
        <SlideText slideNum="13"/>
        <SlideContact slideNum="14"/>
        <Timeline/>
        {/*<header>
          <ul>
            <li><a href="#one" onClick={this.handleHashClick}>one</a></li>
            <li><a href="#five" onClick={this.handleHashClick}>five</a></li>
            <li><a href="#ten" onClick={this.handleHashClick}>ten</a></li>
            <li><a href="#fifteen" onClick={this.handleHashClick}>fifteen</a></li>
          </ul>
        </header>
        <section id="one"><h1>01</h1></section>
        <section><h1>02</h1></section>
        <section><h1>03</h1></section>
        <section><h1>04</h1></section>
        <section id="five"><h1>05</h1></section>
        <section><h1>06</h1></section>
        <section><h1>07</h1></section>
        <section><h1>08</h1></section>
        <section><h1>09</h1></section>
        <section id="ten"><h1>10</h1></section>
        <section><h1>11</h1></section>
        <section><h1>12</h1></section>
        <section><h1>13</h1></section>
        <section><h1>14</h1></section>
        <section id="fifteen"><h1>15</h1></section>*/}
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
    let scrolledPx = this.state.scrolledPx;
    const pixelY = Math.floor(wheelNormalise(e).pixelY);
    const pixelX = Math.floor(wheelNormalise(e).pixelX * -1);
    let pixels = Math.abs(pixelY) > Math.abs(pixelX) ? pixelY : pixelX;
    if (pixels > window.innerWidth) pixels = window.innerWidth;
    const threshold = window.innerWidth * 0.8;
    const activateScroll = scrolledPx > threshold || -scrolledPx > threshold;
    const scrollDirection = scrolledPx >= 0 ? true : false;
    const currentTotal = scrolledPx += pixels;
    this.setState({ scrolledPx: currentTotal });
    if (activateScroll) {
      this.scrollAnimate(e.currentTarget, scrollDirection);
      this.setState({ scrolledPx: 0 });
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

  // FUNCTION FOR CLICKING A HASH-LINK ANCHOR
  // - On click it will .scrollIntoView() the hash link.
  handleHashClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.attributes.href.value);
    target.scrollIntoView({ behavior:'smooth' });
  };

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
