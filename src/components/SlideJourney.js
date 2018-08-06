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

          <div className="spriteBox">
            <object
              data={imagePath}
              type="image/svg+xml"
              alt={`Image for Journey ${slideJNum}`}>
            </object>
          </div>

          <div>
            <h6>{journey.name}</h6>
            <p><i className="fas fa-map-marker-alt"></i> {journey.location}</p>
            {journey.www && <p><i className="fas fa-link"></i> {journey.www}</p>}
            <h6>Role &amp; Contribution</h6>
            <p><i className="fas fa-id-badge"></i> {journey.role}</p>
            {journey.contributions && journey.contributions.map((element,key) => (
                <p key={key}><i className="fas fa-trophy"></i> {element}</p>
            ))}
            {journey.folioUrl && <p><i className="fas fa-link"></i> {journey.folioUrl}</p>}
          </div>

          <div>
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
