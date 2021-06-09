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

export default function UpdateDesignations() {
 
  const classes = useStyles();
  const {
    loadDesignations,
    designations,
    designations_loading,
    addDesignation,
    deleteDesignation,
    updateDesignation,
  } = useTablesContext();

  useEffect(() => {
    loadDesignations();
  }, []);

  const update_Designation = (data) => {
    updateDesignation({ id: data.id, ...data });
    loadDesignations();
  };

  const add_Designation = (data) => {
    addDesignation(data);
    loadDesignations();
  };

  const delete_Designation = (data) => {
    const { id } = data;
    deleteDesignation(id);
    loadDesignations();
  };

  if (designations_loading) {
    return (
      <div>
        <h2>Loading.....Designations</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={designations}
          title="Designatioms"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Designation(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Designation(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Designation(oldData);
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
