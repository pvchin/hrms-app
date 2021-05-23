import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

import { useTablesContext } from "../context/tables_context";
import { useEmployeesContext } from "../context/employees_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Relationship",
    field: "relationship",
  },
  {
    title: "BIrth Date",
    field: "birth_date",
    type: "date",
  },
  {
    title: "Phone",
    field: "phone",
  },
  { title: "Age", field: "age", type: "numeric" },
];

export default function UpdateBatchFamily({ empid }) {
  let history = useHistory();
  const classes = useStyles();
  const {
    loadSingleBatchFamily,
    loadFamily,
    singlebatchfamily,
    addFamily,
    deleteFamily,
    updateFamily,
    singlebatch_family_loading,
    singlebatch_family_error,
  } = useTablesContext();
  const { editEmployeeID } = useEmployeesContext();

  useEffect(() => {
    //console.log();
    loadSingleBatchFamily(empid);
    //loadFamily();
  }, []);

  const update_Family = (data) => {
    updateFamily({ id: data.id, ...data });
    loadSingleBatchFamily(empid);
  };

  const add_Family = (data, empid) => {
    addFamily({ ...data, empid: empid });
    loadSingleBatchFamily(empid);
  };

  const delete_Family = (data) => {
    const { id } = data;
    deleteFamily(id);
    loadSingleBatchFamily(empid);
  };

  if (singlebatch_family_loading) {
    return (
      <div>
        <h2>Loading...Family</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatchfamily}
          title="Family"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Family(newData, empid);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Family(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Family(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
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
