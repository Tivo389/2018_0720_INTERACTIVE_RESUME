import React from 'react';
import ReactDOM from 'react-dom';
import './css/stylesheet.css';
// import App from './App';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
