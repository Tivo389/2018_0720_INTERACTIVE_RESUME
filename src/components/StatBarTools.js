import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class StatBarTools extends Component {

  // RENDER OF COMPONENT
  render() {
    const statTools = [...this.props.statTools];
    return (
      <div className="statBarBlock statBarTools">
        <h6>
          Tools<span className="subText60"> (Frameworks, Libraries, etc.)</span>
        </h6>
        <div className="toolsContainer">
          <TransitionGroup component="div" className="listSet">
            {Object.keys(statTools).map(key =>
              statTools[key].active &&
              <CSSTransition key={key} classNames="listSetText" timeout={300}>
                <p className="active" key={key}>&bull; {statTools[key].name}</p>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
      </div>
    );
  }

}

export default StatBarTools;
