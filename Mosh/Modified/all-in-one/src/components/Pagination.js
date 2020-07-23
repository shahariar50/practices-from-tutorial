import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import Lodash from "lodash";

const useStyles = makeStyles((theme) => ({
  pageiButton: {
    color: `${theme.palette.primary.main} !important`,
    cursor: "pointer",
  },
  pagiActiveButton: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: "#fff !important",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const Pagination = ({
  moviesLength,
  currentPage,
  moviesOnPage,
  onActivePage,
}) => {
  const classes = useStyles();

  const totalPagi = Math.ceil(moviesLength / moviesOnPage);

  if (totalPagi === 1) return null;

  const pagi = Lodash.range(1, totalPagi + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {pagi.map((pagi) => (
          <li className="page-item" key={pagi}>
            <Link
              className={`page-link ${classes.pageiButton} ${
                pagi === currentPage && classes.pagiActiveButton
              }`}
              onClick={() => onActivePage(pagi)}
            >
              {pagi}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
