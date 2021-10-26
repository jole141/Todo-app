import React from "react";

import { Button, CircularProgress, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { colors } from "../../constants/colors";
import { Link } from "react-router-dom";
import { login } from "../../api/api";

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
  redirectSignUpText: {
    margin: "1.5rem",
  },
});

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>();

  const loginUser = async () => {
    setIsLoading(true);
    const response = await login({ email, password });
    if (response.isValid) {
      sessionStorage.setItem("jwt", response.token);
      window.location.reload();
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.mainStyle}>
      {isLoading && (
        <div className={classes.loadingScreenStyle}>
          <CircularProgress size={70} />
        </div>
      )}
      <div className={classes.formStyle}>
        <div className={classes.fontMediumSize}>Login</div>
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
          label="Password"
          variant="outlined"
          type="password"
          className={classes.inputFieldStyle}
          value={password}
          margin="normal"
          size="medium"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className={classes.buttonStyle}
          onClick={loginUser}
        >
          Login
        </Button>
        <p className={classes.redirectSignUpText}>
          Don't have an account? <Link to="/signup">Create new account.</Link>
        </p>
      </div>
      <div className={classes.flexCenteredStyle}>
        <p>TODO-APP</p>
      </div>
    </div>
  );
}
