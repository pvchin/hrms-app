import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

const columns = [
  {
    title: "Institution",
    field: "institution",
  },
  {
    title: "Course",
    field: "course",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
  },
  
  {
    title: "Expiry Date",
    field: "expiry_date",
    type: "date",
  },
];

export default function Emp_Educations() {
  let history = useHistory();
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();

  const {
    loadSingleBatchEducation,
    singlebatcheducation,
    addEducation,
    deleteEducation,
    updateEducation,
    singlebatch_education_loading,
    singlebatch_education_error,
  } = useTablesContext();

  useEffect(() => {
    loadSingleBatchEducation(editEmployeeID);
  }, []);

  if (singlebatch_education_loading) {
    return (
      <div>
        <h2>Loading...Education</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
         <MaterialTable
          columns={columns}
          data={singlebatcheducation}
          title="Experience"
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
