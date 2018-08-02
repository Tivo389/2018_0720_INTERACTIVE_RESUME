import React, { Component } from 'react';

class SlideIntro extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <section
        id={`s${this.props.slideNum}`}
        className="slideIntro"
        data-slidenum={this.props.slideNum}
        data-loadingstatus={this.props.loadingStatus}>
        <object
          data={this.props.imagePath}
          type="image/svg+xml"
          alt={this.props.title}>
        </object>
        <div className="textBox">
          <h4>{this.props.title}</h4>
          <ul>
            <li>{this.props.pointOne}</li>
            <li>{this.props.pointTwo}</li>
          </ul>
        </div>
      </section>
    );
  }

}

export default SlideIntro;
