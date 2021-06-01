import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useEmployeesContext } from "../context/employees_context";
import { useTrainingsContext } from "../context/trainings_context";

const columns = [
  {
    title: "Institute",
    field: "institute",
  },
  {
    title: "Course",
    field: "course",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
    filtering: false,
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    filtering: false,
  },
  {
    title: "Expiry Date",
    field: "expiry_date",
    type: "date",
    filtering: false,
  },
  
];

export default function Emp_ViewFamily() {
  let history = useHistory();
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();
  const {
    isTrainingEditing,
    singlebatch_training,
    updateTraining,
    addTraining,
    editTrainingID,
    single_training,
    getSingleBatchTraining,
    singlebatch_training_loading,
  } = useTrainingsContext();

  useEffect(() => {
    getSingleBatchTraining(editEmployeeID);
  }, []);

  if (singlebatch_training_loading) {
    return (
      <div>
        <h2>Loading...Trainings</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatch_training}
          title=""
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
