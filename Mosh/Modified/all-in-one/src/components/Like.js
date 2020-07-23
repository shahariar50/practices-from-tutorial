import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  likeBtn: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

const Like = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.movie.like ? (
        <FavoriteIcon
          className={classes.likeBtn}
          onClick={() => props.toggleLike(props.movie)}
        />
      ) : (
        <FavoriteBorderIcon
          className={classes.likeBtn}
          onClick={() => props.toggleLike(props.movie)}
        />
      )}
    </>
  );
};

export default Like;
