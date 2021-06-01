import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

const columns = [
  {
    title: "Name",
    field: "name",
    filtering: false,
  },
  {
    title: "Relationship",
    field: "relationship",
  },
  {
    title: "BIrth Date",
    field: "birth_date",
    type: "date",
    filtering: false,
  },
  {
    title: "Phone",
    field: "phone",
  },
];

export default function Emp_ViewFamily() {
  let history = useHistory();
  const classes = useStyles();
  const [family, setFamily] = useState([]);
  const { editEmployeeID } = useEmployeesContext();
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

  useEffect(() => {
    loadSingleBatchFamily(editEmployeeID);
  }, []);
 

  const Load_Family = async () => {
    const res = await loadSingleBatchFamily(editEmployeeID).then(
      setFamily({ ...singlebatchfamily })
    );
    console.log(family);
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
          options={{
            search: false,
            toolbar: false,
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
