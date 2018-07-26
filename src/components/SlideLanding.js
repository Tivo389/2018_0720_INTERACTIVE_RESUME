import React, { Component } from 'react';

class SlideLanding extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section className="slideLanding" data-slidenum={this.props.slideNum}>
        <p>SlideLanding</p>
      </section>
    );
  }

}

export default SlideLanding;
