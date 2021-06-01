import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon } from "@material-ui/core";
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

export default function Emp_Training({
  trainingdata,
  setTrainingdata,
  handleDialogClose,
}) {
  let history = useHistory();
  const classes = useStyles();

  const { editEmployeeID } = useEmployeesContext();
  const {
    getSingleBatchTraining,
    loadTraining,
    singlebatch_training,
    addTraining,
    deleteTraining,
    updateTraining,
    singlebatch_training_loading,
    singlebatch_training_error,
  } = useTrainingsContext();

  useEffect(() => {}, [trainingdata]);

  
  const Save_TrainingData = () => {
    console.log(trainingdata);
    // delete existing data
    {
      singlebatch_training.map((f) => {
        const { id } = f;
        deleteTraining(id);
      });
    }
    //add new data
    {
      trainingdata.map((data) => {
        const { institute, course, from_date, to_date, expiry_date } = data;
        addTraining({
          institute,
          course,
          from_date,
          to_date,
          expiry_date,
          empid: editEmployeeID,
        });
      });
    }
    getSingleBatchTraining(editEmployeeID);
    handleDialogClose();
  };

  if (singlebatch_training_loading) {
    return (
      <div>
        <h2>Loading...Training</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={trainingdata}
          title="Training"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setTrainingdata([...trainingdata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...trainingdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setTrainingdata([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...trainingdata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setTrainingdata([...dataDelete]);

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
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "5px 10px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Save_TrainingData}
                  >
                    Update <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </div>
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
