import React from "react";
import { TableContainer, Table } from "@material-ui/core";
import TableBodys from "./TableBodys";
import TableHeads from "./TableHeads.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2),
  },
}));

const TableSec = (props) => {
  const raiseSort = (path) => {
    const sortColmn = { ...props.sortColmn };
    if (sortColmn.path === path)
      sortColmn.order = sortColmn.order === "asc" ? "desc" : "asc";
    else {
      sortColmn.path = path;
      sortColmn.order = "asc";
    }
    props.onSort(sortColmn);
  };

  const { movies, onDelete, toggleLike } = props;
  const classes = useStyles();
  return (
    <TableContainer className={classes.section}>
      <Table>
        <TableHeads onSort={raiseSort} />
        <TableBodys
          movies={movies}
          onDelete={onDelete}
          toggleLike={toggleLike}
        />
      </Table>
    </TableContainer>
  );
};

export default TableSec;
