import React, { Component } from "react";
import Joi from "@hapi/joi";
import { TextField, Button } from "@material-ui/core";

class Form extends Component {
  validate = () => {
    const result = Joi.object(this.schema).validate(this.state.data, {
      abortEarly: false,
    });
    const errors = {};
    if (!result.error) {
      return null;
    }
    for (let error of result.error.details)
      errors[error.path[0]] = error.message;
    return errors;
  };

  validateEach = (input) => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const result = Joi.object(schema).validate(obj);
    return result.error ? result.error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validate(e.target);

    this.setState({ errors: errors ? errors : {} });
    this.doSubmit(e);
  };

  handleChange = ({ target: input, ...e }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });

    let errors = { ...this.state.errors };
    errors[input.name] = this.validateEach(input);

    this.setState({ errors });
  };

  renderTextField = (
    name,
    label,
    errors,
    data,
    type = "text",
    defaultValue = ""
  ) => {
    const { classes } = this.props;
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
        onChange={this.handleChange}
        value={data}
        color={errors ? "primary" : "secondary"}
        type={type}
        defaultValue={defaultValue}
      />
    );
  };

  renderButton = (label) => {
    console.log(this.validate());
    return (
      <Button
        size="large"
        variant="contained"
        color="secondary"
        type="submit"
        disabled={this.validate() && true}
      >
        {label}
      </Button>
    );
  };
}

export default Form;
