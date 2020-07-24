import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import { getGenres } from "../services/fakeGenreService";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

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

const NewMovie = () => {
  // Functions
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

  const onSubmit = (data) => console.log(data);

  // Variables
  const genres = getGenres();
  const classes = useStyles();
  const { handleSubmit, register, errors, control } = useForm({
    criteriaMode: "all",
  });
  return (
    <Container className={classes.section}>
      <Typography className={classes.sectionHeader} variant="h2" component="h2">
        Edit Your Movie
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {renderTextField(
          "name",
          "Title",
          errors.name?.message,
          register({ required: "Don't leave it as empty." })
        )}
        {/* <TextField
          id="standard-select-currency"
          name="genre"
          select
          label="Genre"
          value={data.genre}
          onChange={this.handleChange}
          fullWidth
          className={classes.textField}
        >
          {genres.map((genre, index) => (
            <MenuItem key={index} value={genre.name}>
              {genre.name}
            </MenuItem>
          ))}
        </TextField> */}
        <Controller
          name="genre"
          control={control}
          defaultValue=""
          rules={{ required: "Select something." }}
          render={(props) => (
            <TextField
              {...props}
              id={
                errors.genre
                  ? "standard-error-helper-text"
                  : "standard-select-currency"
              }
              color={errors.genre ? "primary" : "secondary"}
              select
              label="Genre"
              fullWidth
              className={classes.textField}
              value={props.value}
              onChange={({ target }) => {
                props.onChange(target.value);
              }}
              error={errors.genre ? true : false}
              helperText={
                errors.genre ? (
                  <ErrorMessage errors={errors} name="genre">
                    {({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    }
                  </ErrorMessage>
                ) : (
                  ""
                )
              }
            >
              {genres.map((genre, index) => (
                <MenuItem key={index} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {renderTextField(
          "numberInStock",
          "Number In numberInStock",
          errors.numberInStock?.message,
          register({
            required: "This field is required.",
            min: { value: 0, message: "Minimum value is 0." },
          }),
          "number"
        )}
        {renderTextField(
          "dailyRentalRate",
          "dailyRentalRate",
          errors.dailyRentalRate?.message,
          register({
            required: "This field is required.",
            min: { value: 1, message: "Minimum value is 1." },
            max: { value: 10, message: "Maximum value is 10." },
          }),
          "number"
        )}
        <Button
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewMovie;
