import React from "react";
import { TableRow, TableCell, Button, TableBody } from "@material-ui/core";
import Like from "../../components/Like";
import { Link } from "react-router-dom";

const TableBodys = (props) => {
  return (
    <TableBody>
      {props.movies.map((movie, index) => (
        <TableRow key={index}>
          <TableCell>
            <Link to={`/vidly/movies/${movie._id}`}>{movie.title}</Link>
          </TableCell>
          <TableCell>{movie.genre.name}</TableCell>
          <TableCell>{movie.numberInStock}</TableCell>
          <TableCell>{movie.dailyRentalRate}</TableCell>
          <TableCell>
            <Like toggleLike={props.toggleLike} movie={movie} />
          </TableCell>
          <TableCell>
            <Button
              color="primary"
              variant="contained"
              onClick={() => props.onDelete(movie)}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodys;
