import React from "react";

import { Button, CircularProgress, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../constants/colors";
import { signUp } from "../../api/api";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  mainStyle: {
    display: "flex",
    margin: 0,
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  flexCenteredStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: "100vh",
    width: "50%",
    fontSize: "3rem",
    color: colors.secondary,
  },
  fontMediumSize: {
    fontSize: "2rem",
  },
  inputFieldStyle: {
    margin: "50px",
    width: "60%",
    backgroundColor: colors.white,
    borderRadius: "5px",
    border: `1px solid ${colors.primary}`,
  },
  loadingScreenStyle: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    zIndex: 101,
    backgroundColor: colors.transparentPrimary,
  },
  buttonStyle: {
    margin: "50px",
  },
  passwordAlertStyle: {
    fontStyle: "italic",
    fontSize: "0.7rem",
    marginBottom: "10px",
  },
});

export default function SignUp() {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = React.useState<string>();
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>();

  const signUpUser = async () => {
    setIsLoading(true);
    await signUp({ email, username, password });
    setIsLoading(false);
    history.push("/login");
  };

  return (
    <div className={classes.mainStyle}>
      {isLoading && (
        <div className={classes.loadingScreenStyle}>
          <CircularProgress size={70} />
        </div>
      )}
      <div className={classes.formStyle}>
        <div className={classes.fontMediumSize}>Sign Up</div>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className={classes.inputFieldStyle}
          value={email}
          margin="normal"
          size="medium"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className={classes.inputFieldStyle}
          value={username}
          margin="normal"
          size="medium"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          className={classes.inputFieldStyle}
          value={password}
          margin="normal"
          size="medium"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={classes.passwordAlertStyle}>
          Password must be at least 8 characters long
        </p>
        <Button
          variant="contained"
          className={classes.buttonStyle}
          onClick={signUpUser}
        >
          Sign Up
        </Button>
      </div>
      <div className={classes.flexCenteredStyle}>
        <p>TODO-APP</p>
      </div>
    </div>
  );
}
