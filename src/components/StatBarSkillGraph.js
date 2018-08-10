import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import StatBarBarGraph from './StatBarBarGraph';

class StatBarSkillGraph extends Component {

  // RENDER OF COMPONENT
  render() {
    const {j, path, title} = this.props;
    return (
      <div className="statBarBlock">
        <h6>{title}</h6>
        <TransitionGroup component={null}>
          {Object.keys(j.stats[path]).map(key =>
            <CSSTransition
              key={key}
              classNames="barGraphTransition"
              timeout={300}>
              <StatBarBarGraph
                key={key}
                barIndex={key}
                details={j.stats[path][key]}/>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }

}

export default StatBarSkillGraph;
