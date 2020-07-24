import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { makeStyles } from "@material-ui/core/styles";
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

const MovieForm = (props) => {
  // States
  const [data, setData] = useState();

  // Functions
  useEffect(() => {
    const movie = getMovie(props.match.params.id);
    setData(structureData(movie));
  }, []);

  const structureData = (value) => {
    return {
      _id: value._id,
      name: value.title,
      genre: value.genre.name,
      numberInStock: value.numberInStock,
      dailyRentalRate: value.dailyRentalRate,
    };
  };

  const renderTextField = (
    name,
    label,
    errors,
    value = "",
    reg,
    type = "text"
  ) => {
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
        defaultValue={value}
      />
    );
  };
  const onSubmit = (value) => {
    value._id = data._id;
    saveMovie(value);
    props.history.push("/vidly");
  };

  // Variables
  const classes = useStyles();
  const { handleSubmit, errors, register, control } = useForm({
    criteriaMode: "all",
  });
  const genres = getGenres();

  return (
    <Container className={classes.section}>
      <Typography className={classes.sectionHeader} variant="h2" component="h2">
        Edit Your Movie
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {data?.name &&
          renderTextField("name", "Title", errors.name, data.name, register)}
        {data?.genre && (
          <Controller
            name="genre"
            control={control}
            defaultValue={data.genre}
            rules={{ required: true }}
            as={
              <TextField
                id={
                  errors.genre
                    ? "standard-error-helper-text"
                    : "standard-select-currency"
                }
                color={errors.genre ? "primary" : "secondary"}
                name="genre"
                select
                label="Genre"
                fullWidth
                className={classes.textField}
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
            }
          />
        )}
        {data?.numberInStock &&
          renderTextField(
            "numberInStock",
            "Number In numberInStock",
            errors.numberInStock,
            data.numberInStock,
            register
          )}
        {data?.dailyRentalRate &&
          renderTextField(
            "dailyRentalRate",
            "dailyRentalRate",
            errors.dailyRentalRate,
            data.dailyRentalRate,
            register
          )}
        <Button
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Container>
  );
};
export default MovieForm;
