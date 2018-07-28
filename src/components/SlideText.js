import React, { Component } from 'react';

class SlideText extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section
        id={`s${this.props.slideNum}`}
        className="slideText"
        data-slidenum={this.props.slideNum}
        data-loadingstatus={this.props.loadingStatus}>
        <p>SlideText</p>
      </section>
    );
  }

}

export default SlideText;
