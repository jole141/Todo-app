import React from "react";
import { IconButton, TextField } from "@mui/material";
import { Check, HighlightOffOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  editStyle: {
    display: "flex",
    alignItems: "center",
  },
});

type EditComponentProps = {
  title: string;
  newTitle: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  editItem: () => void;
};

export default function EditComponent({
  title,
  newTitle,
  setNewTitle,
  setEditMode,
  editItem,
}: EditComponentProps) {
  const classes = useStyles();

  return (
    <div className={classes.editStyle}>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        type="text"
        value={newTitle}
        margin="normal"
        size="medium"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <IconButton onClick={editItem}>
        <Check />
      </IconButton>
      <IconButton
        onClick={() => {
          setEditMode(false);
          setNewTitle(title);
        }}
      >
        <HighlightOffOutlined />
      </IconButton>
    </div>
  );
}
