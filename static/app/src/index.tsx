import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/App';
import './infrastructure/i18n/i18n-index';

//import './index.css';

//import '@atlaskit/css-reset';


ReactDOM.render(
    <App />,
    document.getElementById('root')
);

/**
For production remove the <React.StrictMode>
React's StrictMode renders components several times (intentionally) to help you detect rendering side effects.
It only happens during development.
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
 */
