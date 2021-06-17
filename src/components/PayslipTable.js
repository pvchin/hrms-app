import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useEmployeesContext } from "../context/employees_context";

const columns = [
  { title: "Period", field: "period" },
  {
    title: "Payrun Batch",
    field: "payrun",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },
  {
    title: "Pay Date",
    field: "pay_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },

  { title: "Status", field: "status" },
];

export default function PayslipTable() {
  let history = useHistory();
  const classes = useStyles();
  const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  const {
    payrun,
    getPayrun,
    payslips,
    addPayslip,
    payrun_loading,
    payrun_error,
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
    getPayrun();
  }, []);

  const update_Payslip = async (data) => {
    const { id } = data;
    setPayPeriodEmpId(id); //save to recoil
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

 

  if (payrun_loading) {
    return (
      <div>
        <h2>Loading.....Payslips</h2>
      </div>
    );
  }
  if (payrun_error) {
    return (
      <div>
        <h2>Internet connection problem!</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={payrun}
          title="Payroll"
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
          // actions={[
          //   {
          //     icon: "edit",
          //     tooltip: "Edit Record",
          //     onClick: (event, rowData) => {
          //       update_Payslip(rowData);
          //     },
          //   },
          //   {
          //     icon: "delete",
          //     tooltip: "Delete Record",
          //     onClick: (event, rowData) => {
          //       delete_Payslip(rowData);
          //     },
          //   },
          //   {
          //     icon: "add",
          //     tooltip: "Add Record",
          //     isFreeAction: true,
          //     onClick: (event, rowData) => {
          //       add_Payslip(rowData);
          //     },
          //   },
           
          // ]}
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
                <div style={{ paddingLeft: 22 }}>
                  {/* <h3>{`Batch: ${payslip_period}      End Month: ${payslip_endmonthdate}`}</h3> */}
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
