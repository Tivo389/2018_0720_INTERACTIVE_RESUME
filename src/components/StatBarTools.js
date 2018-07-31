import React, { Component } from 'react';

class StatBarTools extends Component {

  componentWillMount() {
    // debugger;
  }


  // RENDER OF COMPONENT
  render() {
    const list = this.props.statTools.list;
    const listSets = [];
    while (list.length > 0) listSets.push(list.splice(0,7));

    return (
      <div className="statBarBlock statBarList">
        <h5>Tools<span className="subText"> (Frameworks, Libraries, etc.)</span></h5>
        <div className="listSetContainer">
          {Object.keys(listSets).map(keyOne =>
            <div className="listSet">
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
