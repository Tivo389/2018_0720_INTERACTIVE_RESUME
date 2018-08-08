import React, { Component } from 'react';

class SlideContact extends Component {

  // PROPERTIES OF COMPONENT
  maxCount = 0;

  // LIFECYCLE METHODS
  componentDidMount() {
    const counter = document.querySelector('span.characterCount');
    this.maxCount = Number(counter.innerText);
  }

  // RENDER OF COMPONENT
  render() {
    return (
      <section
        id={`s${this.props.slideNum}`}
        className="slideContact"
        data-slidenum={this.props.slideNum}>
        <div className="formWrapper">
          <h4>Let's get in touch and talk about the future.</h4>
          <form
            id="contactForm"
            method="post"
            action="php/mail.php">
            {/* 888 NEED TO TEST PHP LATER*/}
            <div className="formGroup">
              <label htmlFor="email">your email</label>
              <input
                id="email"
                type="email"
                name="email"
                maxLength="50"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                required/>
            </div>
            <div className="formGroup">
              <label htmlFor="subject">subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                maxLength="50"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                required/>
            </div>
            <div className="formGroup">
              <label htmlFor="message">message</label>
              <span className="characterCount">600</span>
              <textarea
                id="message"
                type="textarea"
                name="message"
                maxLength="600"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onInput={this.handleInput}
                required>
              </textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>

      </section>
    );
  }

  handleFocus = (e) => {
    e.currentTarget.parentElement.classList.add('active');
  };

  handleBlur = (event) => {
    const e = event.currentTarget;
    e.value ? e.parentElement.classList.add('active') : e.parentElement.classList.remove('active');
  };

  handleInput = (e) => {
    const counter = document.querySelector('span.characterCount');
    const currentCount = this.maxCount - e.currentTarget.value.length;
    currentCount < 100 ? counter.style.color = '#B2005A' : counter.style.color = '#777777';
    counter.innerText = currentCount;
  };

}

export default SlideContact;
