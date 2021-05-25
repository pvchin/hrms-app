import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

import { useTablesContext } from "../context/tables_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateDepartments() {
  let history = useHistory();
  const classes = useStyles();
  const {
    loadDepartments,
    departments,
    departments_loading,
    addDepartment,
    deleteDepartment,
    updateDepartment,
  } = useTablesContext();

  useEffect(() => {
    loadDepartments();
  }, []);

  const update_Department = (data) => {
    updateDepartment({ id: data.id, ...data });
    loadDepartments();
  };

  const add_Department = (data) => {
    addDepartment(data);
    loadDepartments();
  };

  const delete_Department = (data) => {
    const { id } = data;
    deleteDepartment(id);
    loadDepartments();
  };

  if (departments_loading) {
    return (
      <div>
        <h2>Loading.....Departments</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={departments}
          title="Departments"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Department(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Department(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Department(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "primary",
            },
            showTitle: true,
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
