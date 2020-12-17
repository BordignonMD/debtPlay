import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Context} from '../src/Context/AuthContext';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddDebt from "./pages/AddDebt";
import ListDebt from "./pages/ListDebt";
import UpdateDebt from './pages/UpdateDebt';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <CustomRoute isPrivate path="/home" component={Home} />
        <CustomRoute isPrivate path="/debt/add" component={AddDebt} />
        <CustomRoute isPrivate path="/debt/list" component={ListDebt} />
        <CustomRoute isPrivate path="/debt/update" component={UpdateDebt} />
        <CustomRoute isPrivate path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
  );
}
