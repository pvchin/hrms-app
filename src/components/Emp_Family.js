import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";
import { Button, Icon } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

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

export default function Emp_Family({
  familydata,
  setFamilydata,
  handleDialogClose,
}) {
  let history = useHistory();
  const classes = useStyles();

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

  useEffect(() => {}, [familydata]);

  const Save_FamilyData = () => {
    console.log(familydata);
    // delete existing data
    {
      singlebatchfamily.map((f) => {
        const { id } = f;
        deleteFamily(id);
      });
    }
    //add new data
    {
      familydata.map((data) => {
        const { name, relationship, birth_date, phone, age } = data;
        addFamily({
          name,
          relationship,
          birth_date,
          phone,
          age,
          empid: editEmployeeID,
        });
      });
    }
    loadSingleBatchFamily(editEmployeeID);
    handleDialogClose();
  };

  const update_Family = (data) => {
    const { id, rec_id, tableData, ...fields } = data;
    setTimeout(() => {}, 1000);

    updateFamily({ id, ...fields });
    //loadSingleBatchFamily(editEmployeeID);
    //loadSingleBatchFamily(editEmployeeID);
  };

  const add_Family = (data) => {
    addFamily({ ...data, empid: editEmployeeID });
    //loadSingleBatchFamily(editEmployeeID);
  };

  const delete_Family = (data) => {
    const { id } = data;
    deleteFamily(id);
    //loadSingleBatchFamily(editEmployeeID);
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
          data={familydata}
          title="Family"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setFamilydata([...familydata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...familydata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setFamilydata([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...familydata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setFamilydata([...dataDelete]);

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
                    onClick={Save_FamilyData}
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
