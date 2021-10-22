import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Profile } from "./views/Profile";
import Register from "./views/Register";
import ProtectedRoute from "./components/routing/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
