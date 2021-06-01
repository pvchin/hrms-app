import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Icon } from "@material-ui/core";
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
    title: "Archievement",
    field: "archievement",
  },

  { title: "Grade", field: "grade" },
  {
    title: "Remark",
    field: "remark",
  },
];

export default function Emp_Educations({
  educationdata,
  setEducationdata,
  handleDialogClose,
}) {
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

  useEffect(() => {}, [educationdata]);

  const Save_EducationData = () => {
    console.log(educationdata);
    // delete existing data
    {
      singlebatcheducation.map((f) => {
        const { id } = f;
        deleteEducation(id);
      });
    }
    //add new data
    {
      educationdata.map((data) => {
        const { institution, course, from_date, to_date, grade, remark } = data;
        addEducation({
          institution,
          course,
          from_date,
          to_date,
          grade,
          remark,
          empid: editEmployeeID,
        });
      });
    }
    loadSingleBatchEducation(editEmployeeID);
    handleDialogClose();
  };

  const update_Education = (data) => {
    updateEducation({ id: data.id, ...data });
    loadSingleBatchEducation(editEmployeeID);
  };

  const add_Education = (data) => {
    addEducation({ ...data, empid: editEmployeeID });
    loadSingleBatchEducation(editEmployeeID);
  };

  const delete_Education = (data) => {
    const { id } = data;
    deleteEducation(id);
    loadSingleBatchEducation(editEmployeeID);
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
          data={educationdata}
          title="Education"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setEducationdata([...educationdata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...educationdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setEducationdata([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...educationdata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setEducationdata([...dataDelete]);

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
                    onClick={Save_EducationData}
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
