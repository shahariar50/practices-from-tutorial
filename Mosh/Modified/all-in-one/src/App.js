import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Counters from "./pages/Counters";
import Vidly from "./pages/Vidly";
import { Grid } from "@material-ui/core";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import MovieForm from "./pages/MovieForm";
import LoginForm from "./pages/LoginFrom";
import RegisterForm from "./pages/RegisterForm";
import Ruff from "./pages/Ruff";
import NewMovie from "./pages/NewMovie";

function App() {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item container xs={12}>
          <Navbar />
        </Grid>
        <Grid item container xs={12}>
          <Switch>
            <Route path="/vidly" exact component={Vidly} />
            <Route path="/vidly/movies/:id" component={MovieForm} />
            <Route path="/vidly/add-movie" component={NewMovie} />
            <Route path="/ruff" exact component={Ruff} />
            <Route path="/counter" component={Counters} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/counter" />
            <Redirect to="/not-found" />
          </Switch>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
