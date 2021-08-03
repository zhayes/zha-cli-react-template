import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ErrorBoundary from '~components/ErrorBoundary';

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
, document.getElementById('app'));