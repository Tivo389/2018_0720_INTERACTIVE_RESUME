import React, { Component } from 'react';

class StatBarTools extends Component {

  // RENDER OF COMPONENT
  render() {
    const statTools = [...this.props.statTools];
    const tools = [];
    while (statTools.length > 0) tools.push(statTools.splice(0,5));
    return (
      <div className="statBarBlock statBarTools">
        <h6>Tools<span className="subText60"> (Frameworks, Libraries, etc.)</span></h6>
        <div className="toolsContainer">
          {Object.keys(tools).map(keyOne =>
            <div key={keyOne} className="listSet">
              {Object.keys(tools[keyOne]).map(keyTwo =>
                <p key={keyTwo}>&bull; { tools[keyOne][keyTwo] }</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default StatBarTools;
