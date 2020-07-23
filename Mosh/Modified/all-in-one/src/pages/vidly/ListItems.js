import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Divider, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  boxBorder: {
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
}));

const ListItems = ({ genres, onSelectGenre }) => {
  const classes = useStyles();
  return (
    <Box
      border={1}
      borderColor="text.primary"
      borderRadius={5}
      className={classes.boxBorder}
    >
      <List>
        {genres.map((genre, index) => (
          <React.Fragment key={index}>
            <ListItem button>
              <ListItemText
                primary={genre.name}
                onClick={() => onSelectGenre(genre)}
              />
            </ListItem>
            {genres.length > index + 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ListItems;
