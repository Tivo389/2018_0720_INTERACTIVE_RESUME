import React, { Component } from 'react';

class SlideJourney extends Component {

  // RENDER OF COMPONENT
  render() {
    const {slideNum, slideJNum, imagePath, journey} = this.props;
    return (
      <section
        id={`s${slideNum}`}
        className="slideJourney"
        data-slidenum={slideNum}
        data-slidejnum={slideJNum}>
        <div className="journeyWrapper">

          <div className="spriteContainer">
            <object
              data={imagePath}
              type="image/svg+xml"
            alt={`Image for Journey ${slideJNum}`}>
            </object>
          </div>

          <div className="infoContainer">
            <h6>{journey.name}</h6>
            <div>
              <i className="fas fa-map-marker-alt"></i>
              <p>{journey.location}</p>
            </div>
            {journey.www &&
              <div>
                <a href={journey.www}>
                  <i className="fas fa-link"></i>
                  <p>{journey.name} Website</p>
                </a>
              </div>
            }
            <h6>Role &amp; Contribution</h6>
            <div>
              <i class="fas fa-id-card-alt"></i>
              <p>{journey.role}</p>
            </div>
            {journey.contributions && journey.contributions.map((element,key) => (
              <div>
                <i className="fas fa-trophy"></i>
                <p key={key}>{element}</p>
              </div>
            ))}
            {journey.folioUrl &&
              <div>
                <a href={journey.folioUrl}>
                  <i className="fas fa-link"></i>
                  <p>See it on my portfolio</p>
                </a>
              </div>
            }
          </div>

          <div className="descriptionContainer">
            <h6>Description</h6>
            {Object.keys(journey.descriptions).map(key => (
              <p key={key}>&bull; {journey.descriptions[key]}</p>
            ))}
          </div>

        </div>
      </section>
    );
  }

}

export default SlideJourney;
