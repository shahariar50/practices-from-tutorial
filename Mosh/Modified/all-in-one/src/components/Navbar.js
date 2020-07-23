import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "none",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menuToolbar: {
    padding: "0",
  },
  menuLink: {
    marginRight: theme.spacing(2),
    color: "#fff",
    textDecoration: "none",
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.menuToolbar}>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>

          <Link className={classes.menuLink} to="/counter">
            Counter App
          </Link>
          <Link className={classes.menuLink} to="/vidly">
            Vidly
          </Link>
          <Link className={classes.menuLink} to="/login">
            Login
          </Link>
          <Link className={classes.menuLink} to="/register">
            Register
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
