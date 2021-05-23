import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Select,
  Grid,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEmployeesContext } from "../context/employees_context";

const Login = ({ setToken }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [load, setLoad] = useState(false);
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const { getSingleEmployeeEmail, single_employee, single_employee_loading } =
    useEmployeesContext();
  const { name, email, password } = single_employee;

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert]);

  useEffect(() => {
    getSingleEmployeeEmail(loginEmail);
    if (!single_employee_loading) {
      setLoad(false);
    } else {
      setAlert(true);
    }
  }, [load]);

  const handleSubmit = async (e) => {
    setLoad(true);
  };

  const get_SingleEmployee = () => {
    getSingleEmployeeEmail(loginEmail);
    console.log(single_employee);
  };

  return (
    <div className={classes.wrapper}>
      <h1>Log In</h1>
      <form className={classes.wrapper} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          id="margin-normal"
          name="loginEmail"
          value={loginEmail}
          className={classes.textField}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <TextField
          label="Password"
          id="margin-normal"
          name="loginPassword"
          value={loginPassword}
          className={classes.textField}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit <Icon className={classes.rightIcon}>send</Icon>
          </Button>
          <divider />
          {alert && <h2>Loading...!</h2>}
          <divider />
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default Login;
