import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import routes from './routes'

export default () => (
  <Router>
    <Switch>
      {routes.map((route, i) => (
        <Route 
          key={i}
          path={route.path}
          render={props => <route.Component {...props} />}
        />
      ))}
    </Switch>
  </Router>
);