import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { BrowserRouter } from 'react-router-dom'

import configureStore from './state/reducers/configureStore'
import Theme from "./config/Theme"
import './view/fonts/fonts.css'
import './view/app.css'

import Header from './view/components/Header/index';
import MobileToolbar from './view/components/MobileToolbar/index';
import RouterGrid from './view/components/RouterGrid/index';


let { store, persistor } = configureStore()

const App = props => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Theme>
          <Header />

            <RouterGrid/>

          {/* MobileToolbar */}
          <MobileToolbar />

        </Theme>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
