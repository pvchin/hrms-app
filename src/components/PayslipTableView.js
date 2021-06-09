import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useEmployeesContext } from "../context/employees_context";

const FILTERSTRING = "Pending";

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  { title: "Period", field: "period", editable: "never" },
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },

  { title: "Nett Pay", field: "nett_pay", type: "currency", editable: "never" },
  // { title: "Bank Name", field: "bank_name" },
  // { title: "Bank AC No", field: "bank_accno" },
  { title: "Status", field: "status", editable: "never" },
];

export default function PayslipTableVIew() {
  let history = useHistory();
  const classes = useStyles();
  const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  const {
    payslips,
    addPayslip,
    payslips_loading,
    updatePayslip,
    deletePayslip,
    loadPendingPayslips,
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
    loadPendingPayslips(FILTERSTRING);
  }, []);
    

  if (payslips_loading) {
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
          data={payslips}
          title="Payslips"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
            },
            showTitle: false,
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
