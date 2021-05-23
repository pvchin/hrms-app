import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, Link } from "react-router-dom";

import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";

export default function Payslip_Deductions() {
  let history = useHistory();
  const classes = useStyles();
  const [obj, setObj] = useState({});
  const [load, setLoad] = useState(true);

  const {
    payslipdeductions,
    payslip_deduction_amount,
    setPayslipDeductionAmount,
    loadPayslipDeductions,
    addPayslipDeduction,
    payslipdeductions_loading,
    updatePayslipDeduction,
    deletePayslipDeduction,
    updatePayslip,
    editPayslipID,
    single_payslip,
    payslip_period,
    getSingleBatchPayslipDeductions,
  } = usePayslipsContext();
  const { name, amount } = payslipdeductions;
  const { deductions } = useTablesContext();

  const calc_Deduction = (data) => {
    const sum = data.reduce((a, v) => (a = a + v.amount), 0);
    setPayslipDeductionAmount(sum);
  };

  useEffect(() => {
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  }, []);

  useEffect(() => {
    handleLookup();
    setLoad(false);
    console.log("effect", obj);
  }, [load]);

  const update_Payslip = () => {
    const { rec_id, id, total_deductions, ...paydata } = single_payslip;
    updatePayslip({
      id: editPayslipID,
      total_deductions: payslip_deduction_amount,
      ...paydata,
    });
  };

  const update_PayslipDeduction = async (data) => {
    const { id, rec_id, empid, ...fields } = data;
    updatePayslipDeduction({ id: data.id, empid: empid, ...fields });
    update_Payslip();
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  };

  const add_PayslipDeduction = (data) => {
    const { description, amount } = data;
    addPayslipDeduction({
      description: description,
      amount: amount,
      name: single_payslip.name,
      empid: single_payslip.empid,
      period: single_payslip.period,
    });
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  };

  const delete_PayslipDeduction = (data) => {
    const { id } = data;
    deletePayslipDeduction(id);
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  };

  const handleLookup = () => {
    setObj(
      deductions.reduce(function (acc, cur, i) {
        acc[cur.rec_id] = cur.name;
        return acc;
      }, {})
    );
  };

  if (payslipdeductions_loading) {
    return (
      <div>
        <h2>Loading... Expenses.</h2>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={[
            {
              title: "Name",
              field: "description",
              lookup: obj,
            },
            { title: "Amount", field: "amount", type: "numeric" },
          ]}
          data={payslipdeductions}
          title="Expense"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // setData([...data, newData]);
                  add_PayslipDeduction(newData);
                  calc_Deduction([...payslipdeductions, newData]);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...payslipdeductions];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //setData([...dataUpdate]);
                  update_PayslipDeduction(newData);
                  calc_Deduction(dataUpdate);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...payslipdeductions];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  // setData([...dataDelete]);
                  delete_PayslipDeduction(oldData);
                  calc_Deduction(dataDelete);
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
