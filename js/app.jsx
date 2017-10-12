/*
 * 应用的入口文件
 *
 *
 *
 */

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import  Reducer  from './reducers/Reducers';

import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import Dashboard from './containers/Dashboard';
import NotFound from './components/NotFound';
import App from './containers/App';

import '../css/main.css';

//创建一个含有redux-thunk中间件的Redux reducer，它可以使我们进行一些异步的操作。
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(Reducer);

function checkAuth(nextState, replaceState) {
    let { loggedIn } = store.getState();

    if(nextState.location.pathname !== './dashboard'){
        replaceState(null, nextState.location.pathname);
    }else {
        if(loggedIn) {
            replaceState(null, nextState.location.pathname);
        } else {
            replaceState(null, '/');
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={HomePage} />
                <Route onEnter={checkAuth}>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path='/dashboard' component={Dashboard} />
                </Route>
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);