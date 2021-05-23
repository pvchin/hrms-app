import React, { useState, useEffect } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, Link } from "react-router-dom";

import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { useEmployeesContext } from "../context/employees_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "Period", field: "period" },
  { title: "Location", field: "location" },
  { title: "Manager Name", field: "manager_name" },
  { title: "No Of Days", field: "no_of_days", type: "numeric" },
  { title: "Amount", field: "amount", type: "numeric" },
  { title: "Status", field: "status" },
];

export default function AllEmployeesTable() {
  let history = useHistory();
  const classes = useStyles();
  const {
    dailyallowances,
    addDailyAllowance,
    dailyallowances_loading,
    updateDailyAllowance,
    deleteDailyAllowance,
    loadDailyAllowances,
    getSingleDailyAllowance,
    setEditDailyAllowanceID,
    setIsDailyAllowanceEditingOn,
    setIsDailyAllowanceEditingOff,
    resetSingleDailyAllowance,
    dailyallowance_period,
  } = useDailyAllowancesContext();
  const { loadEmployees, employees } = useEmployeesContext();

  useEffect(() => {
    loadDailyAllowances();
  }, []);

  const update_DailyAllowance = async (data) => {
    const { id } = data;
    setEditDailyAllowanceID(id);
    setIsDailyAllowanceEditingOn();
    getSingleDailyAllowance(id);
    history.push("/singledailyallowance");
  };

  const add_DailyAllowance = async (data) => {
    const { id } = data;
    resetSingleDailyAllowance();
    setEditDailyAllowanceID("");
    setIsDailyAllowanceEditingOff();
    history.push("/singledailyallowance");
  };

  const delete_DailyAllowance = (data) => {
    const { id } = data;
    setEditDailyAllowanceID(id);
    deleteDailyAllowance(id);
    loadDailyAllowances();
  };

  if (dailyallowances_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={dailyallowances}
          title="Daily Allowances Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_DailyAllowance(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_DailyAllowance(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_DailyAllowance(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <Link to="/dailyallowances">
                  <div>
                    <ArrowBackIcon fontSize="large" color="primary" />
                  </div>
                </Link>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
