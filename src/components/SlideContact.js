import React, { Component } from 'react';

class SlideContact extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section className="slideContact" data-slidenum={this.props.slideNum}>
        <p>SlideContact</p>
      </section>
    );
  }

}

export default SlideContact;
