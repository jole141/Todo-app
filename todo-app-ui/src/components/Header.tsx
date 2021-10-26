import React from "react";

import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { makeStyles } from "@mui/styles";
import { getCurrentUser } from "../api/api";
import { colors } from "../constants/colors";
import { AccountCircle } from "@mui/icons-material";

const useStyles = makeStyles({
  headerStyle: {
    display: "flex",
    height: "7vh",
    backgroundColor: colors.secondary,
    color: colors.primary,
    alignItems: "center",
    alignContent: "center",
  },
  logoutSectionStyle: {
    position: "absolute",
    right: "2rem",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    height: "2.5rem",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    height: "2.5rem",
    left: "2rem",
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  logoutMargin: {
    margin: "0 20px",
  },
});

export default function Header() {
  const classes = useStyles();

  const [user, setUser] = React.useState<string>();

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  React.useEffect(() => {
    getCurrentUser().then((res) => setUser(res.username));
  }, []);

  return (
    <div className={classes.headerStyle}>
      <p className={classes.headerTitle}>Todo app</p>
      <div className={classes.logoutSectionStyle}>
        <AccountCircle />
        <p className={classes.logoutMargin}>{user}</p>
        <Button
          startIcon={<LogoutIcon />}
          color="error"
          className={classes.logoutMargin}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
