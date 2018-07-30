import React, { Component } from 'react';

class StatBarTools extends Component {

  // RENDER OF COMPONENT
  render() {
    return (
      <div className="statBarBlock">
        <h5>Tools (Frameworks, Libraries, etc.)</h5>
        <ul>
          {Object.keys(this.props.statTools.list).map(key =>
            <li key={key}>{ this.props.statTools.list[key] }</li>
          )}
        </ul>
      </div>
    );
  }

}

export default StatBarTools;
