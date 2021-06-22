import React, { useState, useEffect } from "react";
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
import { useSetRecoilState, useRecoilState } from "recoil";
import { payrunState, payrunIdState } from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";

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
  // { title: "Total Wages", field: "totalwages", type: "currency" },
  // { title: "Total Allowances", field: "totalallowances", type: "currency" },
  // { title: "Total Deductions", field: "totaldeductions", type: "currency" },
  // { title: "Total Payroll", field: "totalpayroll", type: "currency" },
  { title: "Status", field: "status" },
];

export default function PayslipTable() {
  let history = useHistory();
  const classes = useStyles();
  const [input, setInput] = useRecoilState(payrunState);
  const [isLoadInput, setIsLoadInput] = useState(false);
  const [payrunId, setPayrunId] = useRecoilState(payrunIdState);
  const {
    payrun,
    getPayrun,
    payrun_loading,
    payrun_error,
    getSinglePayslip,
    setEditPayslipID,
    setIsPayslipEditingOn,
    single_payslip,
    setPayslipPeriod,
  } = usePayslipsContext();

  useEffect(() => {
    getPayrun();
  }, []);

  useEffect(() => {
    if (single_payslip.payrun) {
      console.log("single_payslip", single_payslip);
    }
  }, [single_payslip]);

  const update_Input = async (data) => {
    console.log("input", data);
    setInput({
      ...input,
      payfreq: data.payfreq,
      fromdate: new Date(data.fromdate).toDateString(),
      todate: data.todate,
      paydate: data.paydate,
      period: data.period,
      payrun: data.payrun,
    });
    setInput({
      ...input,
      payfreq: data.payfreq,
      fromdate: data.fromdate,
      todate: data.todate,
      paydate: data.paydate,
      period: data.period,
      payrun: data.payrun,
    });
    console.log("payrun", input);
  };

  const update_Payslip = async (data) => {
    console.log("data", data);
    const { id, payrun } = data;
    setPayslipPeriod(payrun); //save to recoil
    setEditPayslipID(id);
    setIsPayslipEditingOn();
    getSinglePayslip(id);
    
    history.push("/payrunbatch");
    
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
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Input(rowData);
                update_Payslip(rowData);
              },
            },
            // {
            //   icon: "delete",
            //   tooltip: "Delete Record",
            //   onClick: (event, rowData) => {
            //     delete_Payslip(rowData);
            //   },
            // },
            // {
            //   icon: "add",
            //   tooltip: "Add Record",
            //   isFreeAction: true,
            //   onClick: (event, rowData) => {
            //     add_Payslip(rowData);
            //   },
            // },
          ]}
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
                {/* <Link to="/payslip">
                  <div>
                    <ArrowBackIcon fontSize="large" color="primary" />
                  </div>
                </Link> */}
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
