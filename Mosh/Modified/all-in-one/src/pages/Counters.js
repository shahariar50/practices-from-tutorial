import React, { useState } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./counters/Counter";
import { useSelector, useDispatch } from "react-redux";

// const { counter } = useSelector((state) => state);
// console.log(counter);

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
  const [counters, setCounters] = useState([
    {
      id: 1,
      value: 0,
    },
  ]);
  const classes = useStyles();

  const handleAdd = () => {
    setCounters([
      ...counters,
      {
        id: counters.length + 1,
        value: 0,
      },
    ]);
  };

  const handleDelete = (props) => {
    const values = counters.filter((counter) => counter.id !== props.id);
    setCounters(values);
  };

  const handleIncrease = (props) => {
    const values = [...counters];
    const index = values.indexOf(props);
    values[index].value++;
    setCounters(values);
  };

  const handleDecrease = (props) => {
    const values = [...counters];
    const index = values.indexOf(props);
    values[index].value > 0 && values[index].value--;
    setCounters(values);
  };

  const handleReset = () => {
    const values = counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    setCounters(values);
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
        <Button color="secondary" variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleReset}
          className={classes.button}
        >
          Reset
        </Button>
      </Grid>
    </Container>
  );
};

export default Counters;
