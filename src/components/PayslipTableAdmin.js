import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, MenuItem, Icon } from "@material-ui/core";
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
  {
    title: "Basic Pay",
    field: "basic_pay",
    type: "currency",
    editable: "never",
  },
  {
    title: "TAP Amount",
    field: "tap_amount",
    type: "currency",
    editable: "never",
  },
  {
    title: "SCP Amount",
    field: "scp_amount",
    type: "currency",
    editable: "never",
  },
  {
    title: "Earnings",
    field: "total_earnings",
    type: "currency",
    editable: "never",
  },
  {
    title: "Deductions",
    field: "total_deductions",
    type: "currency",
    editable: "never",
  },
  { title: "Nett Pay", field: "nett_pay", type: "currency", editable: "never" },
  // { title: "Bank Name", field: "bank_name" },
  // { title: "Bank AC No", field: "bank_accno" },
  {
    title: "Status",
    field: "status",
    cellStyle: {
      width: 50,
      maxWidth: 50,
    },
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: 100 }}
        value={props.value}
        select
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approve">Approve</MenuItem>
        <MenuItem value="Reject">Reject</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>
    ),
  },
];

export default function PayslipTableAdmin({
  payslipsdata,
  setPayslipsdata,
  handleDialogClose,
}) {
  let history = useHistory();
  const classes = useStyles();
  const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  const { updatePayslip } = usePayslipsContext();

  const Save_PayslipData = () => {
    payslipsdata.forEach((data) => {
      const { id } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updatePayslip({ id, ...fields });
      }
    });

    handleDialogClose();
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={payslipsdata}
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
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...payslipsdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setPayslipsdata([...dataUpdate]);
                  //approve_Expense(newData);

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
                    onClick={Save_PayslipData}
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
