import React, { Component } from 'react';
import InlineSVG from 'svg-inline-react';
import { j1 } from '../images/journeyImage1.js';
import { j2 } from '../images/journeyImage2.js';
import { j3 } from '../images/journeyImage3.js';
import { j4 } from '../images/journeyImage4.js';
import { j5 } from '../images/journeyImage5.js';
import { j6 } from '../images/journeyImage6.js';
import { j7 } from '../images/journeyImage7.js';

class SlideJourney extends Component {

  // LIFECYCLE METHODS
  // - componentDidUpdate: Image in current slide will become active (animate)!
  componentDidUpdate() {
    // console.log('componentDidUpdate!');
    const {slideJNum, currentJNum} = this.props;
    const img = document.querySelector(`#journeyImage${slideJNum}`);
    (+slideJNum === +currentJNum) ? img.classList.add('active') : img.classList.remove('active');
  }

  // RENDER OF COMPONENT
  render() {
    const {slideNum, slideJNum, journey} = this.props;
    let svgSource;
    switch (slideJNum) {
      case '1': svgSource = j1; break;
      case '2': svgSource = j2; break;
      case '3': svgSource = j3; break;
      case '4': svgSource = j4; break;
      case '5': svgSource = j5; break;
      case '6': svgSource = j6; break;
      case '7': svgSource = j7; break;
      default: console.error('Unknown case detected');
    };
    return (
      <section
        id={`s${slideNum}`}
        className="slideJourney"
        data-slidenum={slideNum}
        data-slidejnum={slideJNum}>
        <div className="journeyWrapper">

          <div className="imageContainer">
            <InlineSVG id={`journeyImage${slideJNum}`} src={svgSource} />
          </div>

          <div className="infoContainer">
            <h5>{journey.name}</h5>
            <div>
              <i className="fas fa-map-marker-alt"></i>
              <p>{journey.location}</p>
            </div>
            {journey.www &&
              <div>
                <a href={journey.www} target="_blank">
                  <i className="fas fa-link"></i>
                  <p>{journey.www.substr(7, journey.www.length)}</p>
                </a>
              </div>
            }
            <h5>Role &amp; Contribution</h5>
            <div>
              <i className="fas fa-id-card-alt"></i>
              <p>{journey.role}</p>
            </div>
            {journey.contributions && journey.contributions.map((element,key) => (
              <div key={key}>
                <i className="fas fa-trophy"></i>
                <p>{element}</p>
              </div>
            ))}
            {journey.folioUrl &&
              <div>
                <a href={journey.folioUrl} target="_blank">
                  <i className="fas fa-link"></i>
                  <p>See it in my portfolio</p>
                </a>
              </div>
            }
          </div>

          <div className="descriptionContainer">
            <h5>Description</h5>
            {Object.keys(journey.descriptions).map((element,key) => (
              <p key={key}>&bull; {journey.descriptions[element]}</p>
            ))}
          </div>

        </div>
      </section>
    );
  }

}

export default SlideJourney;
