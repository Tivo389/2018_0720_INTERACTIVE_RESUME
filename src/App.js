import React, { Component } from 'react';

class App extends Component {
  state = {
    scrollTotal: 0,
    test: 'hello'
  };



  render() {
    return (
      <main id="app" onWheel={this.scroll}>
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



  scroll = (e) => {
    e.preventDefault();
    const slideWidth = window.innerWidth;
    let scrollTotal = this.state.scrollTotal;
    let scrollThreshold = 0.8;
    let currentTotal = scrollTotal += Math.floor(e.deltaY);

    this.setState({ scrollTotal: currentTotal });

    if(scrollTotal > slideWidth*scrollThreshold) {
      const scrollRight = e.currentTarget.scrollLeft += slideWidth;
      // this.scrollTo(e.currentTarget, 1000, 1000);
      this.resetScroll();
    } else if(scrollTotal < slideWidth*-scrollThreshold) {
      const scrollLeft = e.currentTarget.scrollLeft -= slideWidth;
      // this.scrollTo(e.currentTarget, 1000, 1000);
      this.resetScroll();
    }
  };


  // CONTINUE HERE. NEED TO FIX THE SCROLL ANIMATION
  // scrollTo = (element, to, duration) => {
    // if (duration <= 0) return;
    // var difference = to - element.scrollLeft;
    // var perTick = difference / duration * 10;
    // if(difference > 0) {
    //   setInterval(() => {
    //     element.scrollLeft = element.scrollLeft + perTick;
    //     // if (element.scrollLeft === to) return;
    //   }, 10);
    // }
  // };



  resetScroll = () => {
    this.setState({ scrollTotal: 0 });
  };
}

export default App;
