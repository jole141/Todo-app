import React from "react";

import { makeStyles } from "@mui/styles";

import TodoCard from "../../components/TodoCard";
import { colors } from "../../constants/colors";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { TodoItemResponse } from "../../api/types";
import { addTodoItem, getTodoItems } from "../../api/api";

const useStyles = makeStyles({
  mainStyle: {
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "center",
    minHeight: "93vh",
  },
  boardStyle: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
  inputStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "4.5rem",
  },
  addStyle: {
    position: "absolute",
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchStyle: {
    position: "absolute",
    right: 0,
  },
});

export default function TodoBoard() {
  const classes = useStyles();

  const [title, setTitle] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [todoItems, setTodoItems] = React.useState<TodoItemResponse[]>();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [alignment, setAlignment] = React.useState<string | null>("all");

  const showItem = (item: TodoItemResponse) => {
    const nameValidation = item.title
      .toLowerCase()
      .includes(search.toLocaleLowerCase());
    switch (alignment) {
      case "active":
        return nameValidation && !item.isDone;
      case "done":
        return nameValidation && item.isDone;
      default:
        return nameValidation;
    }
  };

  const setToggleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const loadItems = () => {
    setLoaded(false);
    getTodoItems().then((res) => setTodoItems(res));
    setLoaded(true);
  };

  const addItem = async () => {
    await addTodoItem({ title });
    setTitle("");
    loadItems();
  };

  React.useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <div className={classes.mainStyle}>
        <div className={classes.boardStyle}>
          <div className={classes.inputStyle}>
            <div className={classes.addStyle}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                type="text"
                value={title}
                margin="normal"
                size="medium"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Box m={2}>
                <Button variant="contained" onClick={addItem}>
                  Add
                </Button>
              </Box>
            </div>
            <div className={classes.searchStyle}>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                type="text"
                value={search}
                margin="normal"
                size="medium"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={setToggleSelect}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
          </ToggleButtonGroup>
          {loaded && todoItems !== undefined ? (
            todoItems.map(
              (item) =>
                showItem(item) && (
                  <TodoCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    isDone={item.isDone}
                    dom={item.dom}
                    loadItems={loadItems}
                  />
                )
            )
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </div>
  );
}
