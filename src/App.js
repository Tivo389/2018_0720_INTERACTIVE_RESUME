import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <main id="app" onWheel={this.scroll}>
        <section><h1>01</h1></section>
        <section><h1>02</h1></section>
        <section><h1>03</h1></section>
        <section><h1>04</h1></section>
        <section><h1>05</h1></section>
        <section><h1>06</h1></section>
        <section><h1>07</h1></section>
        <section><h1>08</h1></section>
        <section><h1>09</h1></section>
        <section><h1>10</h1></section>
        <section><h1>11</h1></section>
        <section><h1>12</h1></section>
        <section><h1>13</h1></section>
        <section><h1>14</h1></section>
        <section><h1>15</h1></section>
      </main>
    );
  }

  scroll = (e) => {
    console.log(Math.floor(e.deltaY));
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }
}

export default App;
