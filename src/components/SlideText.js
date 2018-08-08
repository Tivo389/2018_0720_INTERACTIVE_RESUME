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
        {this.props.text.map((element,key) =>
          <p key={key}>{element}</p>
        )}
      </section>
    );
  }

}

export default SlideText;
