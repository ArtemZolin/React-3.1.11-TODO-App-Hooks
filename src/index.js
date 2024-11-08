import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';

import App from './components/app';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.createRoot(document.querySelector("#root")).render(<App></App>);
