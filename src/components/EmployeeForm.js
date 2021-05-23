import React, { useState, useReducer, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Select,
  Grid,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import UpdateBatchFamily from "./UpdateBatchFamily";
import UpdateBatchEducations from "./UpdateBatchEducations";
import UpdateBatchExperiences from "./UpdateBatchExperiences";

const initial_values = {
  name: "",
  gender: "",
  ic_no: "",
  email: "",
  age: 0,
  basic_salary: 0,
  bank_name: "",
  bank_acno: "",
  tap_acno: "",
  scp_acno: "",
};

const EmployeeForm = () => {
  let history = useHistory();
  const classes = useStyles();
  const {
    isEditing,
    single_employee,
    updateEmployee,
    addEmployee,
    editEmployeeID,
    loadEmployees,
    single_employee_loading,
  } = useEmployeesContext();
  const {
    name,
    ic_no,
    gender,
    age,
    email,
    basic_salary,
    bank_name,
    bank_acno,
    tap_acno,
    scp_acno,
  } = single_employee || initial_values;
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    if (isEditing) {
      updateEmployee({ id: editEmployeeID, ...data });
    } else {
      addEmployee({ ...data });
    }
    //loadEmployees();
    // <Alert severity="success">
    //   <AlertTitle>Success</AlertTitle>
    //   This is a success alert — <strong>check it out!</strong>
    // </Alert>;
    history.push("/allemployees");
  };

  if (single_employee_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Grid xs={12}>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            EMPLOYEE FORM
          </Typography>
          <Typography component="p">Employee Particulars</Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="name"
                control={control}
                defaultValue={name}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Name"
                      id="margin-normal"
                      name="name"
                      defaultValue={name}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                rules={{ required: "Name required" }}
              />
            </div>
            <div>
              <Controller
                name="email"
                control={control}
                defaultValue={email}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Email"
                      id="margin-normal"
                      name="email"
                      defaultValue={email}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                rules={{ required: "Email is required" }}
              />
            </div>
            <div>
              <Controller
                name="ic_no"
                control={control}
                defaultValue={ic_no}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="IC No"
                      id="margin-normal"
                      name="ic_no"
                      defaultValue={ic_no}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
            </div>
            <div>
              <Controller
                name="gender"
                control={control}
                defaultValue={gender}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Gender"
                      id="margin-normal"
                      name="gender"
                      defaultValue={gender}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      select
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
            </div>
            <div>
              <Controller
                name="age"
                control={control}
                defaultValue={age}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Age"
                      type="number"
                      id="standard-number"
                      name="age"
                      defaultValue={age}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
            </div>
            <div>
              <Controller
                name="basic_salary"
                control={control}
                defaultValue={basic_salary}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Basic Salary"
                      type="number"
                      id="standard-number"
                      name="basic_pay"
                      defaultValue={basic_salary}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
            </div>
            <div>
              <Controller
                name="bank_name"
                control={control}
                defaultValue={bank_name}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Bank Name"
                      id="margin-normal"
                      name="bank_name"
                      defaultValue={bank_name}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "Email is required" }}
              />
            </div>
            <div>
              <Controller
                name="bank_acno"
                control={control}
                defaultValue={bank_acno}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Bank Ac No"
                      id="margin-normal"
                      name="bank_acno"
                      defaultValue={bank_acno}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                // rules={{ required: "Email is required" }}
              />
            </div>
            <div>
              <Controller
                name="tap_acno"
                control={control}
                defaultValue={tap_acno}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="TAP Ac No"
                      id="margin-normal"
                      name="tap_acno"
                      defaultValue={tap_acno}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "Email is required" }}
              />
            </div>
            <div>
              <Controller
                name="scp_acno"
                control={control}
                defaultValue={scp_acno}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="SCP Ac No"
                      id="margin-normal"
                      name="scp_acno"
                      defaultValue={scp_acno}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "Email is required" }}
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
      <Grid xs={12}>
        <UpdateBatchFamily empid={editEmployeeID} />
      </Grid>
      <Grid xs={12}>
        <UpdateBatchEducations empid={editEmployeeID} />
      </Grid>
      <Grid xs={12}>
        <UpdateBatchExperiences empid={editEmployeeID} />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
}));

export default EmployeeForm;
