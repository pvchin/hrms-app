import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

import { useTablesContext } from "../context/tables_context";

const columns = [
  {
    title: "Company",
    field: "company",
  },
  {
    title: "Location",
    field: "location",
  },
  {
    title: "Position",
    field: "position",
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
  { title: "Remark", field: "remark" },
];

export default function UpdateBatchExperiences({ empid }) {
  let history = useHistory();
  const classes = useStyles();
  const {
    loadSingleBatchExperience,
    singlebatchexperience,
    addExperience,
    deleteExperience,
    updateExperience,
    singlebatch_experience_loading,
    singlebatch_experience_error,
  } = useTablesContext();

  useEffect(() => {
    //console.log(linkid);
    loadSingleBatchExperience(empid);
  }, []);

  const update_Experience = (data) => {
    updateExperience({ id: data.id, ...data });
    loadSingleBatchExperience();
  };

  const add_Experience = (data, empid) => {
    addExperience({ ...data, empid: empid });
    loadSingleBatchExperience();
  };

  const delete_Experience = (data) => {
    const { id } = data;
    deleteExperience(id);
    loadSingleBatchExperience();
  };

  if (singlebatch_experience_loading) {
    return (
      <div>
        <h2>Loading...Experience</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatchexperience}
          title="Experience"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Experience(newData, empid);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Experience(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Experience(oldData);
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
