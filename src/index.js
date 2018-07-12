import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore'
import { PersistGate } from 'redux-persist/lib/integration/react'

import MainContainer from './components/MainContainer/index';

import Header from './components/Header/index';
import MobileToolbar from './components/MobileToolbar/index';

import './fonts/fonts.css'
import './app.css'
import Theme from "./Theme"


let { store, persistor } = configureStore()

const App = () => (

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Theme>
        <div className="main-container">
          <Header />
          <MainContainer />
          <MobileToolbar />
        </div>
      </Theme>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
