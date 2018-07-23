import React, { Component } from 'react';

class App extends Component {
  // STATE OF COMPONENT
  state = {
    scrollActivation: 0
  };

  // RENDER OF COMPONENT
  render() {
    return (
      <main id="app" onWheel={this.handleWheel}>
        <header>
          <ul>
            <li>
              <a href="#1">one</a>
            </li>
            <li>
              <a href="#5">five</a>
            </li>
            <li>
              <a href="#10">ten</a>
            </li>
            <li>
              <a href="#15">fifteen</a>
            </li>
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
    e.preventDefault();
    const scrollThreshold = 0.8;
    let scrollActivation = this.state.scrollActivation;
    let currentTotal = scrollActivation += Math.floor(e.deltaY);
    this.setState({ scrollActivation: currentTotal });
    if (scrollActivation > window.innerWidth * scrollThreshold) {
      this.scrollAnimate(e.currentTarget);
      this.setState({ scrollActivation: 0 });
    } else if (scrollActivation < window.innerWidth * -scrollThreshold) {
      this.scrollAnimate(e.currentTarget);
      this.setState({ scrollActivation: 0 });
    }
  };

  // FUNCTION FOR ANIMATING THE SLIDE SCROLL
  // - When the threshold is reached, it will animate-scroll to the slide.
  scrollAnimate = (element) => {
    const scrollDuration = 350;
    const scrollWidth = window.innerWidth;
    const perTick = scrollWidth / scrollDuration * 10;
    const currentSlide = Math.floor(element.scrollLeft / scrollWidth);
    let scrollCycle = 0;
    const scrollAnimation = setInterval(() => {
      if (scrollCycle > scrollWidth) {
        element.scrollLeft = (currentSlide + 1) * scrollWidth;
        clearInterval(scrollAnimation);
        scrollCycle = 0;
        return;
      }
      element.scrollLeft = element.scrollLeft + perTick;
      scrollCycle = element.scrollLeft - (scrollWidth * currentSlide);
    }, 15);
  };
}

export default App;
