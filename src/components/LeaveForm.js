import React, { useState, useReducer, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Select,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useLeavesContext } from "../context/leaves_context";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const initial_values = {
  name: "",
  to_date: "",
  from_date: "",
  reason: "",
  status: "Pending",
  no_of_days: 0,
};

const LeaveForm = ({ handleDialogClose }) => {
  let history = useHistory();
  const classes = useStyles();
  const {
    isLeaveEditing,
    single_leave,
    updateLeave,
    addLeave,
    editLeaveID,
    loadLeaves,
    single_leave_loading,
  } = useLeavesContext();
  const { loadEmployees, employees } = useEmployeesContext();
  const { name, to_date, from_date, reason, status, no_of_days } =
    single_leave || initial_values;
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    if (isLeaveEditing) {
      updateLeave({ id: editLeaveID, ...data });
    } else {
      addLeave({ ...data });
    }
    // loadLeaves();
    //history.push("/leave");
    handleDialogClose();
  };

  if (single_leave_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          LEAVE FORM
        </Typography>
        <Typography component="p">Leave Application</Typography>
        <Divider />
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
                    select
                  >
                    {employees.map((e) => {
                      return (
                        <MenuItem key={e.name} value={e.name}>
                          {e.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                );
              }}
              rules={{ required: "Name required" }}
            />
          </div>
          <div>
            <Controller
              name="from_date"
              control={control}
              defaultValue={from_date}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="From Date"
                    type="date"
                    id="margin-normal"
                    name="from_date"
                    defaultValue={from_date}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                );
              }}
              rules={{ required: "From Date is required" }}
            />
          </div>
          <div>
            <Controller
              name="to_date"
              control={control}
              defaultValue={to_date}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="To Date"
                    id="margin-normal"
                    type="date"
                    name="to_date"
                    defaultValue={to_date}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                );
              }}
              rules={{ required: "To Date is required" }}
            />
          </div>
          <div>
            <Controller
              name="no_of_days"
              control={control}
              defaultValue={no_of_days}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="No Of Days"
                    type="number"
                    id="standard-number"
                    name="no_of_days"
                    defaultValue={no_of_days}
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
              name="reason"
              control={control}
              defaultValue={reason}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Reason"
                    id="margin-normal"
                    name="reason"
                    defaultValue={reason}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              // rules={{ required: "Reason is required" }}
            />
          </div>
          <div>
            <Controller
              name="status"
              control={control}
              defaultValue="Pending"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Status"
                    id="margin-normal"
                    name="status"
                    defaultValue={status}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Cancel">Cancel</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit(onSubmit)}
            >
              Submit <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
        </form>
      </Paper>
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

export default LeaveForm;
