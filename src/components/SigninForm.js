import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { employees_url } from "../utils/constants";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";

const SigninForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const {
    employees,
    loadEmployees,
    setEditEmployeeID,
    employees_loading,
    employees_error,
  } = useEmployeesContext();

  useEffect(() => {
    loadEmployees();
  }, []);

  if (employees_loading) {
    <div>
      <h2>Loading...</h2>
    </div>;
  }
  if (employees_error) {
    <div>
      <h2>Internet connection problem!</h2>
    </div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const emp = employees
      .filter((item) => item.email === email)
      .map((row) => {
        return {
          id: row.id,
          name: row.name,
          email: row.email,
          password: row.password,
          leave_bal: row.leave_bal,
          siteallows_fee: row.siteallows_fee,
          perdiem_fee: row.perdiem_fee,
          reporting_to: row.reporting_to,
        };
      });

    if (emp[0].email === email && emp[0].password === password) {
      setLoginLevel({
        ...loginLevel,
        loginUser: emp[0].name,
        loginUserId: emp[0].id,
        loginLevel: role,
        loginEmail: email,
        login: true,
        leave_bal: emp[0].leave_bal,
        siteallows_fee: emp[0].siteallows_fee,
        perdiem_fee: emp[0].perdiem_fee,
        reporting_to: emp[0].reporting_to,
      });
      setEditEmployeeID(emp[0].id);
      setPassword("");
    } else {
      setAlert(false);
    }
  };

  const handleStaffClick = (e) => {
    //e.preventDefault();
    setRole("Staff");
    handleSubmit(e);
  };
  const handleAdminClick = (e) => {
    e.preventDefault();
    setRole("Admin");
    handleSubmit(e);
  };
  const handleAdminManagerClick = (e) => {
    e.preventDefault();
    setRole("AdminManager");
    handleSubmit(e);
  };
  const handleManagerClick = (e) => {
    e.preventDefault();
    setRole("Manager");
    handleSubmit(e);
  };

  if (employees_loading) {
    <div>
      <h2>Verifying...</h2>
    </div>;
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        style={{ width: 350 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        style={{ width: 350 }}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ textAlign: "center" }}>
        <ButtonGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => setRole("Staff")}
          >
            Staff
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => setRole("Admin")}
          >
            Admin
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => setRole("AdminManager")}
          >
            Admin Manager
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => setRole("Manager")}
          >
            Manager
          </Button>
        </ButtonGroup>
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
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "600px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

export default SigninForm;
