import React from 'react';
import ReactDOM from 'react-dom';
import { initializeMap } from './mapScripts/initializeMap.js';
import App from './components/app.js';

const mainDiv = document.getElementById('main');

ymaps.ready(initializeMap);


ReactDOM.render( <App/> , mainDiv);