import React, { Component } from 'react';

class Thankyou extends Component {

  // LIFECYCLE METHODS
  componentDidMount() {
    setInterval(()=> {
      window.location.replace("/");
    },5000);
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <div id="thankyou">
        <p>Thank you for getting in touch!</p>
        <p>I'll redirect you back to the main page in just a moment...</p>
        <img src={require('../images/contactThankyou.svg')} alt="Thank you"/>
      </div>
    );
  }

}

export default Thankyou;
