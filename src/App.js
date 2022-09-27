import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import UtilsContext from './context/UtilsContext';
import JobOrderContext from './context/JobOrder/JobOrderContext';

import Login from './views/Login';
import Error from './error/Error';
import './assets/css/Login.css';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { routes } from './config/config';

library.add(fab, fas);

function App() {
  return (
    <Router>
      <Switch>
        <UtilsContext >
          <JobOrderContext>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path="/" render={prop => <Login {...prop} />} exact />
                {routes.map((data, i) => {
                  return <Route
                    key={i}
                    path={data.path}
                    render={prop => <data.component {...prop} title={data.title} />} />
                })}
                <Route render={prop => <Error {...prop} />} />
              </Switch>
            </Suspense>
          </JobOrderContext>
        </UtilsContext>
      </Switch>
    </Router>
  );
}

export default App;
