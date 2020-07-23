import React from "react";
import Form from "../utils/Forms";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import Joi from "@hapi/joi";
import { Container, Typography, TextField, MenuItem } from "@material-ui/core";
import { getGenres } from "../services/fakeGenreService";

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

class NewMovie extends Form {
  state = {
    data: {
      _id: "",
    },
    errors: {},
    genres: getGenres(),
  };

  schema = {
    _id: Joi.string().required().label("Id"),
    name: Joi.string().required().label("Title"),
    genre: Joi.string().label("Genre"),
    numberInStock: Joi.number().required().label("Number In numberInStock"),
    dailyRentalRate: Joi.number().required().label("Rating"),
  };

  doSubmit = (e) => {
    console.log(e);
  };
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
          {this.renderTextField("name", "Title", errors.name, data.name)}
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
            data.numberInStock
          )}
          {this.renderTextField(
            "dailyRentalRate",
            "dailyRentalRate",
            errors.dailyRentalRate,
            data.dailyRentalRate
          )}
          {this.renderButton("Save")}
        </form>
      </Container>
    );
  }
}

export default withStyles(useStyles)(NewMovie);
