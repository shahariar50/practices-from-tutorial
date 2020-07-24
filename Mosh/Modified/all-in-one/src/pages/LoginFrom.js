import React from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
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
}));

const LoginForm = () => {
  const { handleSubmit, register, errors } = useForm();
  const classes = useStyles({
    criteriaMode: "all",
  });

  const renderTextField = (name, label, errors, reg, type = "text") => {
    return (
      <TextField
        error={errors && true}
        id={errors ? "standard-error-helper-text" : "outlined-basic"}
        label={label}
        name={name}
        variant="outlined"
        fullWidth
        helperText={errors && errors}
        className={classes.textField}
        color={errors ? "primary" : "secondary"}
        type={type}
        inputRef={reg}
      />
    );
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className={classes.section}>
      <Typography className={classes.sectionHeader} variant="h2" component="h2">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderTextField(
          "username",
          "Username",
          errors.username?.message,
          register({
            required: "Don't leave it blank.",
          })
        )}
        {renderTextField(
          "password",
          "Password",
          errors.password?.message,
          register({
            required: "Don't leave it blank.",
            minLength: {
              value: 8,
              message: "Password's minimum length must be 8",
            },
          }),
          "password"
        )}
        <Button
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
