import React, { Component } from 'react';

class SlideJourney extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section className="slideJourney" data-slidenum={this.props.slideNum}>
        <p>SlideJourney</p>
      </section>
    );
  }

}

export default SlideJourney;
