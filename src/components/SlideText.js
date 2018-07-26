import React, { Component } from 'react';

class SlideText extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section className="slideText" data-slidenum={this.props.slideNum}>
        <p>SlideText</p>
      </section>
    );
  }

}

export default SlideText;
