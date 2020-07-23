import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import TableSec from "./vidly/Table";
import { makeStyles } from "@material-ui/core/styles";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "../components/Pagination";
import ListItems from "./vidly/ListItems";
import { paginate } from "../utils/Paginate";
import Lodash from "lodash";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
}));

const Vidly = () => {
  //States
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([
    { _id: "5b21ca3eeb7f6fbccd471817", name: "All" },
  ]);
  const [selectGenre, setSelectGenre] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [sortColmn, setSortColmn] = useState({
    path: "title",
    order: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const moviesOnPage = 4;

  // Functions
  useEffect(() => {
    const genVal = [...genres, ...getGenres()];
    setGenres(genVal);

    const movieVal = [...movies, ...getMovies()];
    setMovies(movieVal);
  }, []);

  const handleDelete = (props) => {
    const values = movies.filter((movie) => movie._id !== props._id);
    setMovies(values);
  };

  const handleLikeToggle = (props) => {
    const values = movies.map((movie) =>
      movie._id !== props._id ? movie : { ...movie, like: !movie.like }
    );
    setMovies(values);
  };

  const handleActivePage = (props) => {
    setCurrentPage(props);
  };

  const handleSelectGenre = (props) => {
    setSelectGenre(props.name);
    setCurrentPage(1);
    setSearchValue("");
  };

  const handleSorting = (sortColmn) => {
    setSortColmn(sortColmn);
  };

  const handleSearch = ({ target: input }) => {
    setSortColmn({ path: "title", order: "asc" });
    setSelectGenre("All");
    setCurrentPage(1);
    setSearchValue(input.value);
  };

  // Variables
  const classes = useStyles();
  const filterMovies =
    selectGenre !== "All"
      ? movies.filter((movie) => movie.genre.name === selectGenre)
      : movies;
  const searched = filterMovies.filter((m) =>
    m.title.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  const sorted = Lodash.orderBy(searched, [sortColmn.path], [sortColmn.order]);
  const restMovies = paginate(sorted, currentPage, moviesOnPage);
  const moviesLength = searched.length;

  return (
    <Container>
      <Grid container className={classes.section} spacing={4}>
        <Grid item sm={3}>
          <ListItems genres={genres} onSelectGenre={handleSelectGenre} />
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
            onChange={handleSearch}
            value={searchValue}
          />
          <TableSec
            movies={restMovies}
            onDelete={handleDelete}
            toggleLike={handleLikeToggle}
            onSort={handleSorting}
            sortColmn={sortColmn}
          />
          <Pagination
            moviesLength={moviesLength}
            currentPage={currentPage}
            moviesOnPage={moviesOnPage}
            onActivePage={handleActivePage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Vidly;
