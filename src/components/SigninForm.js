import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

const SigninForm = ({ setLogin }) => {
  let history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@demo.com" && password === "123456") {
      setPassword("");
      setLogin(true);
    } else {
      setAlert(false);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ textAlign: "center" }}>
        <Button type="submit" variant="contained" color="primary">
          Signin
        </Button>
      </div>
      {!alert && <h3>Login Fail!</h3>}
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

export default SigninForm;
