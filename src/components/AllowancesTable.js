import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";

import { useTablesContext } from "../context/tables_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateAllowances() {
   const classes = useStyles();
  const {
    loadAllowances,
    allowances,
    allowances_loading,
    addAllowance,
    deleteAllowance,
    updateAllowance,
  } = useTablesContext();

  useEffect(() => {
    loadAllowances();
  }, []);

  const update_Allowance = (data) => {
    updateAllowance({ id: data.id, ...data });
    loadAllowances();
  };

  const add_Allowance = async (data) => {
    addAllowance(data);
    loadAllowances();
  };

  const delete_Allowance = (data) => {
    const { id } = data;
    deleteAllowance(id);
    loadAllowances();
  };

  if (allowances_loading) {
    return (
      <div>
        <h2>Loading...Allowances</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={allowances}
          title="Allowances"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Allowance(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Allowance(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Allowance(oldData);
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
