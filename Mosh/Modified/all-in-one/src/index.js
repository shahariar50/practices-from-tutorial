import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import configureStore from "./store/configStore";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff4757",
      light: "#ffa4b1",
    },
    secondary: {
      main: "#1976d2",
      light: "#4791db",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
