import React, { Component } from 'react';

class StatBar extends Component {

  // RENDER OF COMPONENT
  render() {
    const isActive = this.props.statBarActive;
    const classValue = isActive ? 'active' : '';
    return (
      <div id="statBar" className={ classValue }>
        <div>
          {<object
            data={require('../images/radarGraph.svg')}
            type="image/svg+xml"
            alt="Radar graph of skillset">
          </object>}

        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

}

export default StatBar;
