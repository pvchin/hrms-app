import React, { useState, useEffect } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, Link } from "react-router-dom";

import { useDailyAllowancesContext } from "../context/dailyallowances_context";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "District", field: "district" },
  { title: "Operation Type", field: "typeoperation" },
  { title: "Client", field: "client" },
  { title: "Location/Rig", field: "location" },
  { title: "Ticket No/Job No", field: "jobno" },
  { title: "Crew Operation", field: "crewoperation" },
  { title: "Currency", field: "currency" },
  { title: "Job Bonus", field: "jobbonus", type: "numeric" },
  { title: "Per Diem", field: "perdiem", type: "numeric" },
];

export default function DailyAllowsDetlsTable() {
  let history = useHistory();
  const classes = useStyles();
  const {
    dailyallowsdetls,
    addDailyAllowsDetl,
    dailyallowsdetls_loading,
    updateDailyAllowsDetl,
    deleteDailyAllowsDetl,
    loadDailyAllowsDetls,
    getSingleDailyAllowsDetl,
    getSingleBatchDailyAllowsDetls,
    resetSingleDailyAllowsDetl,
    dailyallowsdetl_period,
    singlebatch_dailyallowsdetl,
    singlebatch_dailyallowsdetl_loading,
    dailyallowance_period,
    single_dailyallowance,
  } = useDailyAllowancesContext();
  //const { loadEmployees, employees } = useEmployeesContext();

  //   useEffect(() => {
  //     console.log(
  //       "allowsdetls",
  //       single_dailyallowance.empid,
  //       dailyallowance_period
  //     );
  //     getSingleBatchDailyAllowsDetls(
  //       single_dailyallowance.empid,
  //       dailyallowance_period
  //     );
  //   }, []);

  const update_DailyAllowsDetl = async (data) => {
    const { id, rec_id, empid, ...fields } = data;
    console.log("update", data);
    updateDailyAllowsDetl({ id: data.id, empid: empid, ...fields });

    //update_Daily Allowances Details;
    getSingleBatchDailyAllowsDetls(
      single_dailyallowance.empid,
      dailyallowance_period
    );
  };

  const add_DailyAllowsDetl = async (data) => {
    console.log("add", data);
    const { description, amount } = data;
    addDailyAllowsDetl({
      description: description,
      amount: amount,
      name: single_dailyallowance.name,
      empid: single_dailyallowance.empid,
      period: dailyallowance_period,
    });
  };

  const delete_DailyAllowance = (data) => {
    const { id } = data;
    deleteDailyAllowsDetl(id);
    //update_Daily Allowances Details;
    getSingleBatchDailyAllowsDetls(
      single_dailyallowance.empid,
      dailyallowance_period
    );
  };

  return (
    <div>
      <h2>In Progress.... Pls come back again!</h2>
    </div>
  );

  if (singlebatch_dailyallowsdetl_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          //columns={columns}
          columns={
            ({ title: "Date", field: "date", type: "date" },
            { title: "District", field: "district" },
            { title: "Operation Type", field: "typeoperation" },
            { title: "Client", field: "client" },
            { title: "Location/Rig", field: "location" },
            { title: "Ticket No/Job No", field: "jobno" },
            { title: "Crew Operation", field: "crewoperation" },
            { title: "Currency", field: "currency" },
            { title: "Job Bonus", field: "jobbonus", type: "numeric" },
            { title: "Per Diem", field: "perdiem", type: "numeric" })
          }
          data={singlebatch_dailyallowsdetl}
          title="Daily Allowances Details"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // setData([...data, newData]);
                  add_DailyAllowsDetl(newData);
                  //calc_Earning([...payslipearnings, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...singlebatch_dailyallowsdetl];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //setData([...dataUpdate]);
                  update_DailyAllowsDetl(newData);
                  //calc_Earning(dataUpdate);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...singlebatch_dailyallowsdetl];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  // setData([...dataDelete]);
                  delete_DailyAllowance(oldData);
                  //calc_Earning(dataDelete);
                  resolve();
                }, 1000);
              }),
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
