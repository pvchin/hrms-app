import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

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
    title: "Archievement",
    field: "archievement",
  },

  { title: "Grade", field: "grade" },
  {
    title: "Remark",
    field: "remark",
  },
  {
    title: "Expiry Date",
    field: "expiry_date",
    type: "date",
  },
];

export default function UpdateBatchEducations({ empid }) {
  let history = useHistory();
  const classes = useStyles();
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
    //console.log(linkid);
    loadSingleBatchEducation(empid);
  }, []);

  const update_Education = (data) => {
    updateEducation({ id: data.id, ...data });
    loadSingleBatchEducation();
  };

  const add_Education = (data, empid) => {
    addEducation({ ...data, empid: empid });
    loadSingleBatchEducation();
  };

  const delete_Education = (data) => {
    const { id } = data;
    deleteEducation(id);
    loadSingleBatchEducation();
  };

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
          title="Education"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Education(newData, empid);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Education(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Education(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
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
