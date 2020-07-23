import React from "react";
import { Container, Typography } from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import Joi from "@hapi/joi";
import Form from "../utils/Forms";

const theme = createMuiTheme();
const useStyles = {
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  sectionHeader: {
    marginBottom: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
};

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {
      username: null,
      password: null,
    },
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
  };

  doSubmit = (e) => {
    //console.log("Submitted");
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;

    return (
      <Container className={classes.section}>
        <Typography
          className={classes.sectionHeader}
          variant="h2"
          component="h2"
        >
          Login
        </Typography>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {this.renderTextField(
            "username",
            "Username",
            errors.username,
            data.username
          )}
          {this.renderTextField(
            "password",
            "Password",
            errors.password,
            data.password,
            "password"
          )}
          {this.renderButton("Login")}
        </form>
      </Container>
    );
  }
}

export default withStyles(useStyles)(LoginForm);
