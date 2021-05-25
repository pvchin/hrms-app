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

import { useEmployeesContext } from "../context/employees_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "IC No", field: "ic_no" },
  { title: "Gender", field: "gender" },
  { title: "Age", field: "age", type: "numeric" },
  { title: "Email", field: "email" },
];

export default function AllEmployeesTable() {
  let history = useHistory();
  const classes = useStyles();
  const {
    employees,
    addEmployee,
    employees_loading,
    updateEmployee,
    deleteEmployee,
    loadEmployees,
    getSingleEmployee,
    setEditEmployeeID,
    setIsEditingOn,
    setIsEditingOff,
    resetSingleEmployee,
  } = useEmployeesContext();

  useEffect(() => {
    loadEmployees();
  }, []);

  const update_Employee = async (data) => {
    const { id } = data;
    setEditEmployeeID(id);
    setIsEditingOn();
    getSingleEmployee(id);
    history.push("/singleemployee");
  };

  const add_Employee = async (data) => {
    const { id } = data;
    resetSingleEmployee();
    setEditEmployeeID("");
    setIsEditingOff();
    history.push("/singleemployee");
  };

  const delete_Employee = (data) => {
    const { id } = data;
    setEditEmployeeID(id);
    deleteEmployee(id);
    loadEmployees();
  };
  if (employees_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={employees}
          title="Employees Listing"
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
                update_Employee(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Employee(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Employee(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "secondary",
            },
            showTitle: true,
          }}
          //   components={{
          //     Toolbar: (props) => (
          //       <div>
          //         <MTableToolbar {...props} />
          //         <Link to="/expenses">
          //           <div>
          //             <ArrowBackIcon fontSize="large" color="primary" />
          //           </div>
          //         </Link>
          //       </div>
          //     ),
          //   }}
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
