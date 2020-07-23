import React from "react";
import { Container, Typography } from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import Form from "../utils/Forms";
import Joi from "@hapi/joi";

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

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      email: "",
    },
    errors: {
      email: null,
      username: null,
      password: null,
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email")
      .email({ tlds: { allow: false } }),
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
  };

  doSubmit = (e) => {
    console.log(e);
  };

  render() {
    const { classes } = this.props;
    const { errors, data } = this.state;
    return (
      <Container className={classes.section}>
        <Typography
          className={classes.sectionHeader}
          variant="h2"
          component="h2"
        >
          Register
        </Typography>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {this.renderTextField("email", "Email", errors.email, data.email)}
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
          {this.renderButton("Register")}
        </form>
      </Container>
    );
  }
}

export default withStyles(useStyles)(RegisterForm);
