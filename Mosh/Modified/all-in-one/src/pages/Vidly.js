import React, { Component } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import TableSec from "./vidly/Table";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "../components/Pagination";
import ListItems from "./vidly/ListItems";
import { paginate } from "../utils/Paginate";
import Lodash from "lodash";
import { Link } from "react-router-dom";

const theme = createMuiTheme();

const useStyles = {
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  topText: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: "100%",
    lineHeight: 1.43,
  },
  searchFrom: {
    marginBottom: theme.spacing(2),
  },
};

class Vidly extends Component {
  state = {
    movies: [],
    genres: [{ _id: "5b21ca3eeb7f6fbccd471817", name: "All" }],
    currentPage: 1,
    moviesOnPage: 4,
    selectGenre: "All",
    sortColmn: {
      path: "title",
      order: "asc",
    },
    searchValue: "",
  };

  UNSAFE_componentWillMount() {
    const oldGenres = [...this.state.genres];
    const genres = oldGenres.concat(getGenres());

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (props) => {
    const movies = this.state.movies.filter((movie) => movie._id !== props._id);
    this.setState({ movies });
  };

  handleLikeToggle = (props) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(props);
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handleActivePage = (props) => {
    this.setState({ currentPage: props });
  };

  handleSelectGenre = (props) => {
    this.setState({ selectGenre: props.name, currentPage: 1, searchValue: "" });
  };

  handleSorting = (sortColmn) => {
    this.setState({ sortColmn });
  };

  handleSearch = ({ target: input }) => {
    const sortColmn = {
      path: "title",
      order: "asc",
    };
    this.setState({ sortColmn, selectGenre: "All", currentPage: 1 });

    this.setState({ searchValue: input.value });
  };

  render() {
    const { classes } = this.props;
    const {
      movies: allMovies,
      currentPage,
      moviesOnPage,
      selectGenre,
      sortColmn,
      searchValue,
    } = this.state;
    const filterMovies =
      selectGenre !== "All"
        ? allMovies.filter((movie) => movie.genre.name === selectGenre)
        : allMovies;
    const searched = filterMovies.filter((m) =>
      m.title.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    const sorted = Lodash.orderBy(
      searched,
      [sortColmn.path],
      [sortColmn.order]
    );
    const movies = paginate(sorted, currentPage, moviesOnPage);
    const moviesLength = searched.length;
    return (
      <Container>
        <Grid container className={classes.section} spacing={4}>
          <Grid item sm={3}>
            <ListItems
              genres={this.state.genres}
              onSelectGenre={this.handleSelectGenre}
            />
          </Grid>
          <Grid item sm={9}>
            <Link to="/vidly/add-movie" style={{ textDecoration: "none" }}>
              <Button size="large" variant="contained" color="primary">
                New Movie
              </Button>
            </Link>
            <Typography display="block" className={classes.topText}>
              {moviesLength < 1 ? "There are no " : `Showing ${moviesLength} `}
              movies in the database.
            </Typography>
            <TextField
              id="outlined-basic"
              label="Search..."
              variant="outlined"
              fullWidth
              className={classes.searchFrom}
              color="secondary"
              onChange={this.handleSearch}
              value={this.state.searchValue}
            />
            <TableSec
              movies={movies}
              onDelete={this.handleDelete}
              toggleLike={this.handleLikeToggle}
              onSort={this.handleSorting}
              sortColmn={sortColmn}
            />
            <Pagination
              moviesLength={moviesLength}
              currentPage={currentPage}
              moviesOnPage={moviesOnPage}
              onActivePage={this.handleActivePage}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Vidly);
