import React, { Component } from 'react';
import { wheelNormalise } from './js/wheelNormalise.js';
import { debounce } from './js/debounce.js';

class App extends Component {
  // STATE OF COMPONENT
  state = {
    scrolledPx: 0
  };

  // RENDER OF COMPONENT
  render() {
    return (
      <main id="app" onWheel={this.handleWheel}>
        <header>
          <ul>
            <li><a href="#1">one</a></li>
            <li><a href="#5">five</a></li>
            <li><a href="#10">ten</a></li>
            <li><a href="#15">fifteen</a></li>
          </ul>
        </header>
        <section id="1"><h1>01</h1></section>
        <section><h1>02</h1></section>
        <section><h1>03</h1></section>
        <section><h1>04</h1></section>
        <section id="5"><h1>05</h1></section>
        <section><h1>06</h1></section>
        <section><h1>07</h1></section>
        <section><h1>08</h1></section>
        <section><h1>09</h1></section>
        <section id="10"><h1>10</h1></section>
        <section><h1>11</h1></section>
        <section><h1>12</h1></section>
        <section><h1>13</h1></section>
        <section><h1>14</h1></section>
        <section id="15"><h1>15</h1></section>
      </main>
    );
  }

  // FUNCTION FOR WHEEL EVENT
  // - Stores amount scrolled and will activate 'scrollAnimate()' when it reaches the threshold.
  handleWheel = (e) => {
    // console.log('handleWheel');
    e.persist();
    e.preventDefault();
    let scrolledPx = this.state.scrolledPx;
    let pixelY = Math.floor(wheelNormalise(e).pixelY);
    if (pixelY > window.innerWidth) pixelY = window.innerWidth;
    const threshold = window.innerWidth * 0.8;
    const activateScroll = scrolledPx > threshold || -scrolledPx > threshold;
    const scrollDirection = scrolledPx >= 0 ? true : false;
    const currentTotal = scrolledPx += pixelY;
    this.setState({ scrolledPx: currentTotal });
    if (activateScroll) {
      this.scrollAnimate(e.currentTarget, scrollDirection);
      this.setState({ scrolledPx: 0 });
    }
  };

  // FUNCTION FOR ANIMATING THE SLIDE SCROLL
  // - Will animate-scroll the slide, if direction is true it will scroll ==>.
  scrollAnimate = debounce((e, direction) => {
    // console.log('scrollAnimate');
    const duration = 350;
    const width = window.innerWidth;
    const perTick = Math.floor(width / duration * 10);
    const currentSlide = Math.floor(e.scrollLeft / width);
    const scrollRight = (currentSlide + 1) * width;
    const scrollLeft = (currentSlide - 1) * width;
    let scrollCycle = 0;
    const scrollAnimation = () => {
      if (scrollCycle > width) {
        direction ? e.scrollLeft = scrollRight : e.scrollLeft = scrollLeft;
        clearInterval(scroll);
        scrollCycle = 0;
        return;
      }
      direction ? e.scrollLeft += perTick : e.scrollLeft -= perTick;
      scrollCycle += perTick;
    };
    const scroll = setInterval(scrollAnimation, 10);
  }, 250);
}

export default App;
