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

export default function UpdateDeductions() {
  let history = useHistory();
  const classes = useStyles();
  const {
    loadDeductions,
    deductions,
    deductions_loading,
    addDeduction,
    deleteDeduction,
    updateDeduction,
  } = useTablesContext();

  useEffect(() => {
    loadDeductions();
  }, []);

  const update_Deduction = (data) => {
    updateDeduction({ id: data.id, ...data });
    loadDeductions();
  };

  const add_Deduction = (data) => {
    addDeduction(data);
    loadDeductions();
  };

  const delete_Deduction = (data) => {
    const { id } = data;
    deleteDeduction(id);
    loadDeductions();
  };

  if (deductions_loading) {
    return (
      <div>
        <h2>Loading...Deductions</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={deductions}
          title="Deductions"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Deduction(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Deduction(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Deduction(oldData);
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
