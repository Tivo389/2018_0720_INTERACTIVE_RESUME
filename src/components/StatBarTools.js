import React, { Component } from 'react';

class StatBarTools extends Component {

  // RENDER OF COMPONENT
  render() {
    let list = [...this.props.statTools.list];
    const listSets = [];
    while (list.length > 0) listSets.push(list.splice(0,7));

    return (
      <div className="statBarBlock statBarList">
        <h6>Tools<span className="subText"> (Frameworks, Libraries, etc.)</span></h6>
        <div className="listSetContainer">
          {Object.keys(listSets).map(keyOne =>
            <div  key={keyOne} className="listSet">
              {Object.keys(listSets[keyOne]).map(keyTwo =>
                <p key={keyTwo}>&bull; { listSets[keyOne][keyTwo] }</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default StatBarTools;
