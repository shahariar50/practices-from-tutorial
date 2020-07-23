import React from "react";
import { Container, Typography, TextField, MenuItem } from "@material-ui/core";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
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

class MovieForm extends Form {
  state = {
    data: {},
    errors: {},
    genres: getGenres(),
  };

  schema = {
    _id: Joi.string().required().label("Id"),
    name: Joi.string().required().label("Title"),
    genre: Joi.string().label("Genre"),
    numberInStock: Joi.number().required().label("Number In numberInStock"),
    dailyRentalRate: Joi.number().required().min(1).max(10).label("Rating"),
  };

  UNSAFE_componentWillMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movie = getMovie(this.props.match.params.id);
    this.setState({ data: this.structureData(movie) });
  }

  structureData = (movie) => {
    return {
      _id: movie._id,
      name: movie.title,
      genre: movie.genre.name,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit(e) {
    //console.log(this.state.data);
    saveMovie(this.state.data);
    this.props.history.push("/vidly");
  }

  render() {
    const { classes } = this.props;
    const { errors, data, genres } = this.state;
    return (
      <Container className={classes.section}>
        <Typography
          className={classes.sectionHeader}
          variant="h2"
          component="h2"
        >
          Edit Your Movie
        </Typography>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {this.renderTextField(
            "name",
            "Title",
            errors.name,
            data.name,
            "",
            data.name
          )}
          <TextField
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
          </TextField>
          {this.renderTextField(
            "numberInStock",
            "Number In numberInStock",
            errors.numberInStock,
            data.numberInStock,
            "",
            data.numberInStock
          )}
          {this.renderTextField(
            "dailyRentalRate",
            "dailyRentalRate",
            errors.dailyRentalRate,
            data.dailyRentalRate,
            "",
            data.dailyRentalRate
          )}
          {this.renderButton("Save")}
        </form>
      </Container>
    );
  }
}

export default withStyles(useStyles)(MovieForm);
