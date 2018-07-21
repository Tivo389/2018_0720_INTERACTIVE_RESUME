import React from 'react';
import ReactDOM from 'react-dom';
import './css/stylesheet.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import main from '../src/js/main.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
