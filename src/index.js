import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { BrowserRouter, Route } from 'react-router-dom'
import routes from "./config/Routes"

import Header from './components/Header/index';
import MobileToolbar from './components/MobileToolbar/index';

import './fonts/fonts.css'
import './app.css'
import Theme from "./config/Theme"

let { store, persistor } = configureStore()

const App = props => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Theme>
          <Header />
          <div className="page__container">
            <div className="page-grid">

              {/* Left Sidebar */}
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.LeftSidebar}
                />
              ))}

              {/* Main */}
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.MainContent}
                />
              ))}

              {/* Right Sidebar */}
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.RightSidebar}
                />
              ))}
            </div>
          </div>

          {/* MobileToolbar */}
          <MobileToolbar />

        </Theme>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
