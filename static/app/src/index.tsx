import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/App';
import './infrastructure/i18n/i18n-index';

//import './index.css';

import '@atlaskit/css-reset';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
