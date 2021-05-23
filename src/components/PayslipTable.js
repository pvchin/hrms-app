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
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import { useHistory, Link } from "react-router-dom";

import { usePayslipsContext } from "../context/payslips_context";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "Period", field: "period" },
  { title: "Date", field: "date", type: "date" },
  { title: "Nett Pay", field: "nett_pay", type: "numeric" },
  { title: "Bank Name", field: "bank_name" },
  { title: "Bank AC No", field: "bank_accno" },
  { title: "Status", field: "status" },
];

export default function AllEmployeesTable() {
  let history = useHistory();
  const classes = useStyles();
  const {
    payslips,
    addPayslip,
    payslips_loading,
    updatePayslip,
    deletePayslip,
    loadPayslips,
    getSinglePayslip,
    getSingleBatchPayslip,
    setEditPayslipID,
    setIsPayslipEditingOn,
    setIsPayslipEditingOff,
    resetSinglePayslip,
    payslip_period,
    payslip_endmonthdate,
    singlebatchpayslip,
    singlebatch_payslip_loading,
    singlebatch_payslip_error,
  } = usePayslipsContext();
  const { loadEmployees, employees } = useEmployeesContext();

  useEffect(() => {
    getSingleBatchPayslip(payslip_period);
  }, []);

  const update_Payslip = async (data) => {
    const { id } = data;
    setEditPayslipID(id);
    setIsPayslipEditingOn();
    getSinglePayslip(id);
    history.push("/singlepayslip");
  };

  const add_Payslip = async (data) => {
    const { id } = data;
    resetSinglePayslip();
    setEditPayslipID("");
    setIsPayslipEditingOff();
    history.push("/singlepayslip");
  };

  const delete_Payslip = (data) => {
    const { id } = data;
    setEditPayslipID(id);
    deletePayslip(id);
    loadPayslips();
  };

  const build_Payslip = () => {
    const current_period = payslip_period;
    const current_endmonthdate = Date.parse(payslip_endmonthdate);

    loadEmployees();
    console.log(current_period);
    getSingleBatchPayslip(payslip_period);
    const paydata = singlebatchpayslip.map((e) => e.name);
    console.log("paydata", singlebatchpayslip.length, paydata);
    {
      employees.map((emp) => {
        const {
          id,
          name,
          bank_name,
          bank_acno,
          basic_salary,
          tap_acno,
          scp_acno,
        } = emp;
        const data = {
          name: name,
          period: current_period,
          date: current_endmonthdate,
          basic_pay: basic_salary,
          nett_pay: 0,
          bank_name: bank_name,
          bank_acno: bank_acno,
          tap_acno: tap_acno,
          scp_acno: scp_acno,
          empid: id,
          status: "Pending",
        };
        const res = paydata.includes(emp.name);
        if (!res) {
          console.log("add", data);
          addPayslip({ ...data });
        }
      });
    }
    //loadDailyAllowances();
  };

  if (singlebatch_payslip_loading) {
    return (
      <div>
        <h2>Loading.....Payslips</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatchpayslip}
          title="Payslips"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
            Build: (props) => <BuildOutlinedIcon />,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Payslip(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Payslip(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Payslip(rowData);
              },
            },
            {
              icon: "build",
              tooltip: "Build Records",
              isFreeAction: true,
              onClick: (event, rowData) => {
                build_Payslip();
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ paddingLeft: 22 }}>
                  <h3>{`Batch: ${payslip_period}      End Month: ${payslip_endmonthdate}`}</h3>
                </div>
                {/* <div style={{ paddingLeft: 22 }}>
                  <h3>{`End Month: ${payslip_endmonthdate}`}</h3>
                </div> */}
                <Link to="/payslip">
                  <div>
                    <ArrowBackIcon fontSize="large" color="primary" />
                  </div>
                </Link>
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
