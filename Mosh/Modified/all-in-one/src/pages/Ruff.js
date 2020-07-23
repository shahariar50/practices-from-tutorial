import React, { Component } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Ruff extends Component {
  state = {
    data: {
      genre: "",
    },
    errors: {},
    genres: getGenres(),
  };

  componentWillMount() {
    const movie = getMovie("5b21ca3eeb7f6fbccd47181a");
    this.setState({ data: this.structureData(movie) });
  }

  structureData = (movie) => {
    return {
      id: movie._id,
      name: movie.title,
      genre: movie.genre.name,
      stock: movie.numberInStock,
      rate: movie.dailyRentalRate,
    };
  };

  handleChange = (e) => {
    console.log(e.target.name);
  };

  hanldeSubmit(e) {
    console.log(e);
  }

  render() {
    const { data, genres } = this.state;

    return (
      <form onSubmit={this.hanldeSubmit}>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={data.genre}
          onChange={this.handleChange}
          helperText="Please select your currency"
          fullWidth
          name="genre"
        >
          {genres.map((genre, index) => (
            <MenuItem key={index} value={genre.name}>
              {genre.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
    );
  }
}

export default Ruff;
