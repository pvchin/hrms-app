import React, { useState, useEffect, useRef } from "react";

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

export default function Payslip_Earnings({ setCalc }) {
  let history = useHistory();
  const [obj, setObj] = useState({});
  const [load, setLoad] = useState(true);
  const classes = useStyles();
  const {
    payslipearnings,
    payslip_earning_amount,
    setPayslipEarningAmount,
    addPayslipEarning,
    payslipearnings_loading,
    updatePayslipEarning,
    deletePayslipEarning,
    updatePayslip,
    editPayslipID,
    single_payslip,
    payslip_period,
    getSingleBatchPayslipEarnings,
  } = usePayslipsContext();

  const { name, amount } = payslipearnings;
  const { allowances } = useTablesContext();

  useEffect(() => {
    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  }, []);

  useEffect(() => {
    handleLookup();
    setLoad(false);
    console.log("effect", obj);
  }, [load]);

  const calc_Earning = (data) => {
    const sum = data.reduce((a, v) => (a = a + v.amount), 0);
    console.log("Earning", data);
    setPayslipEarningAmount(sum);
  };

  const update_Payslip = () => {
    const { rec_id, id, total_earnings, ...paydata } = single_payslip;
    updatePayslip({
      id: editPayslipID,
      total_earnings: payslip_earning_amount,
      ...paydata,
    });
    setCalc(true);
  };

  const update_PayslipEarning = async (data) => {
    const { id, rec_id, empid, ...fields } = data;
    console.log("update", data);
    updatePayslipEarning({ id: data.id, empid: empid, ...fields });

    update_Payslip();
    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  };

  const add_PayslipEarning = (data) => {
    console.log("add", data);
    const { description, amount } = data;
    addPayslipEarning({
      description: description,
      amount: amount,
      name: single_payslip.name,
      empid: single_payslip.empid,
      period: single_payslip.period,
    });

    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  };

  const delete_PayslipEarning = (data) => {
    const { id } = data;
    deletePayslipEarning(id);
    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  };

  const handleLookup = () => {
    setObj(
      allowances.reduce(function (acc, cur, i) {
        acc[cur.rec_id] = cur.name;
        return acc;
      }, {})
    );
  };

  if (payslipearnings_loading) {
    return (
      <div>
        <h2>Loading... Incomes.</h2>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          //columns={columns}
          columns={[
            {
              title: "Name",
              field: "description",
              lookup: obj,
            },
            { title: "Amount", field: "amount", type: "numeric" },
          ]}
          data={payslipearnings}
          title="Income"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // setData([...data, newData]);
                  add_PayslipEarning(newData);
                  calc_Earning([...payslipearnings, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...payslipearnings];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //setData([...dataUpdate]);
                  update_PayslipEarning(newData);
                  calc_Earning(dataUpdate);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...payslipearnings];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  // setData([...dataDelete]);
                  delete_PayslipEarning(oldData);
                  calc_Earning(dataDelete);
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
