import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Error from "../pages/Error/Error";

import Login from './../pages/Login/Login';


function UnauthenticatedRoutes() {
  return (
    <Router>
      <div className="App">
        <Switch>          
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default UnauthenticatedRoutes;
