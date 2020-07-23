import React from "react";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./counters/Counter";
import { useSelector, useDispatch } from "react-redux";
import {
  addCounter,
  increaseCounter,
  decreaseCounter,
  deleteCounter,
  resetCounter,
} from "../store/counters";

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const Counters = () => {
  const { counters } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleIncrease = (props) => {
    dispatch(increaseCounter(props));
  };

  const handleDecrease = (props) => {
    dispatch(decreaseCounter(props));
  };

  const handleDelete = (props) => {
    dispatch(deleteCounter(props));
  };

  return (
    <Container>
      <Grid container className={classes.section}>
        {counters.map((counter, index) => (
          <Counter
            key={index}
            props={counter}
            onIncrease={handleIncrease}
            onDelete={handleDelete}
            onDecrease={handleDecrease}
          ></Counter>
        ))}
        <Button
          color="secondary"
          variant="contained"
          onClick={() => dispatch(addCounter())}
        >
          Add
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => dispatch(resetCounter())}
          className={classes.button}
        >
          Reset
        </Button>
      </Grid>
    </Container>
  );
};

export default Counters;
