import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useEmployeesContext } from "../context/employees_context";
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

];

export default function Emp_Experiences({
  experiencedata,
  setExperiencedata,
  handleDialogClose,
}) {
  let history = useHistory();
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();
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
    loadSingleBatchExperience(editEmployeeID);
  }, []);

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
