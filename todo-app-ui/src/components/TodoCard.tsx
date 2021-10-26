import React from "react";

import { makeStyles } from "@mui/styles";
import { Checkbox, IconButton } from "@mui/material";
import { colors } from "../constants/colors";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { checkTodoItem, deleteTodoItem, editTodoItem } from "../api/api";
import { dateConverter } from "../pages/TodoBoard/util";
import EditComponent from "./EditComponent";

const useStyles = makeStyles({
  todoItemStyle: {
    backgroundColor: colors.todoItem,
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    margin: "0.5rem",
    borderRadius: "10px",
    position: "relative",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  dateStyle: {
    fontSize: "0.8rem",
    justifySelf: "end",
    margin: "0 1rem",
  },
  buttonStyle: {
    margin: "0 20px",
  },
  itemActionsStyle: {
    position: "absolute",
    right: "15px",
  },
  editStyle: {
    display: "flex",
    alignItems: "center",
  },
});

type TodoCardProps = {
  id: string;
  title: string;
  isDone: boolean;
  dom: string;
  loadItems: () => void;
};

export default function TodoCard({
  id,
  title,
  dom,
  isDone,
  loadItems,
}: TodoCardProps) {
  const classes = useStyles();

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [newTitle, setNewTitle] = React.useState<string>(title);

  const checkItem = async () => {
    await checkTodoItem(id);
    loadItems();
  };

  const editItem = async () => {
    await editTodoItem({ id, title: newTitle });
    await loadItems();
  };

  const deleteItem = async () => {
    await deleteTodoItem(id);
    await loadItems();
  };

  return (
    <div className={classes.todoItemStyle}>
      <Checkbox checked={isDone} onChange={checkItem} />
      {editMode ? (
        <EditComponent
          title={title}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          setEditMode={setEditMode}
          editItem={editItem}
        />
      ) : (
        <>
          <p className={classes.titleStyle}>{title}</p>
          <p className={classes.dateStyle}>{dateConverter(dom)}</p>
        </>
      )}

      <div className={classes.itemActionsStyle}>
        {!editMode && (
          <IconButton
            onClick={() => {
              setEditMode(true);
              setNewTitle(title);
            }}
          >
            <Edit color="primary" />
          </IconButton>
        )}
        <IconButton onClick={deleteItem}>
          <DeleteOutline sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
}
