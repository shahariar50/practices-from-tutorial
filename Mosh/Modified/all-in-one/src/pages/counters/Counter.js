import React from "react";
import { Grid, Chip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  sectionItem: {
    marginBottom: theme.spacing(2),
  },
  chip: {
    backgroundColor: (props) => props.value === 0 && "#ff9800",
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

function Counter(props) {
  const classes = useStyle(props.props);
  const { value } = props.props;
  return (
    <Grid item xs={12} className={classes.sectionItem}>
      <Chip label={value === 0 ? "Zero" : value} className={classes.chip} />
      <Button
        variant="contained"
        color="default"
        onClick={() => props.onIncrease(props.props)}
        className={classes.button}
      >
        Increase
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={() => props.onDecrease(props.props)}
        className={classes.button}
        disabled={value === 0 && true}
      >
        Decrease
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.onDelete(props.props)}
        className={classes.button}
      >
        Delete
      </Button>
    </Grid>
  );
}

export default Counter;
