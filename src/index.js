import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store.js';
import App from './App';
<<<<<<< HEAD
import Login from './components/Login'

ReactDOM.render(<App />, document.getElementById('root'));
=======
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    , document.getElementById('root'));

>>>>>>> master
