import React, { Component } from "react";
import { TableContainer, Table } from "@material-ui/core";
import TableBodys from "./TableBodys";
import TableHeads from "./TableHeads.js";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

const useStyle = {
  section: {
    marginBottom: theme.spacing(2),
  },
};

class TableSec extends Component {
  raiseSort = (path) => {
    const sortColmn = { ...this.props.sortColmn };
    if (sortColmn.path === path)
      sortColmn.order = sortColmn.order === "asc" ? "desc" : "asc";
    else {
      sortColmn.path = path;
      sortColmn.order = "asc";
    }
    this.props.onSort(sortColmn);
  };

  render() {
    const { movies, onDelete, toggleLike, classes } = this.props;
    return (
      <TableContainer className={classes.section}>
        <Table>
          <TableHeads onSort={this.raiseSort} />
          <TableBodys
            movies={movies}
            onDelete={onDelete}
            toggleLike={toggleLike}
          />
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(useStyle)(TableSec);
