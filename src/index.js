import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { BrowserRouter } from 'react-router-dom'

import configureStore from './state/reducers/configureStore'
import Theme from "./config/Theme"
import './view/styles/fonts/fonts.css'
import './view/styles/template1/styles.scss'
// import './view/app.scss'

import Header from './view/components/Header';
import Footer from './view/components/Footer';
import RouterGrid from './view/components/RouterGrid';

import { IntlProvider } from 'react-intl-redux';

let { store, persistor } = configureStore()

const App = props => (
  <Provider store={store}>
    <IntlProvider textComponent={React.Fragment}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Theme>
            <Header />
            <RouterGrid />
            <Footer />
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </IntlProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));