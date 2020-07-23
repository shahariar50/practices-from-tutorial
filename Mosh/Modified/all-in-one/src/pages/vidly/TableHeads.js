import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  tableHead: {
    borderBottom: "2px solid rgba(224, 224, 224, 1)",
    borderTop: "1px solid rgba(224, 224, 224, 1)",
    cursor: "pointer",
  },
}));

const TableHeads = ({ onSort }) => {
  const classes = useStyle();
  return (
    <TableHead>
      <TableRow>
        <TableCell
          className={classes.tableHead}
          onClick={() => onSort("title")}
        >
          Title
        </TableCell>
        <TableCell
          className={classes.tableHead}
          onClick={() => onSort("genre.name")}
        >
          Genre
        </TableCell>
        <TableCell
          className={classes.tableHead}
          onClick={() => onSort("numberInStock")}
        >
          Stock
        </TableCell>
        <TableCell
          className={classes.tableHead}
          onClick={() => onSort("dailyRentalRate")}
        >
          Rate
        </TableCell>
        <TableCell className={classes.tableHead}></TableCell>
        <TableCell className={classes.tableHead}></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeads;
