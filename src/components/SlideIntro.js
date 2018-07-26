import React, { Component } from 'react';

class SlideIntro extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section
        id={`s${this.props.slideNum}`}
        className="slideIntro"
        data-slidenum={this.props.slideNum}
        data-loadingstat={this.props.loadingStat}>
        <p>SlideIntro</p>
      </section>
    );
  }

}

export default SlideIntro;
