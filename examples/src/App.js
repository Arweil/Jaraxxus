import React, { Component } from 'react';
import logo from '@/logo.svg';
import app from '@/App.less';

// installed into jaraxxus
import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <div className={app.App}>
        <header className={app['App-header']}>
          <img src={logo} className={app['App-logo']} alt="logo" />
          <h1 className={app['App-title']}>Welcome to React</h1>
        </header>
        <p className={app['App-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className={app['App-flex']}>
          <div className={app['App-flex-item']}></div>
          <div className={app['App-flex-item']}></div>
          <div className={app['App-flex-item']}></div>
          <div className={app['App-flex-item']}></div>
          <div className={app['App-flex-item']}></div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
