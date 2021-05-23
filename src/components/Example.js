import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

import { useExpensesContext } from "../context/expenses_context";

const columns = [
  {
    title: "Name",
    field: "name",
    // editComponent: (editProps) => (
    //   <Input
    //     autoFocus={true}
    //     onChange={(e) => editProps.onChange(e.target.value)}
    //   />
    // ),
  },
  { title: "Description", field: "description" },
  { title: "Amount", field: "amount", type: "numeric" },
];

export default function Example() {
  let history = useHistory();

  const {
    expenses,
    addExpense,
    expenses_loading,
    updateExpense,
    deleteExpense,
    loadExpenses,
    getSingleExpense,
    setEditExpenseID,
    setIsExpenseEditingOn,
    setIsExpenseEditingOff,
    resetSingleExpense,
  } = useExpensesContext();

  useEffect(() => {
    loadExpenses();
  }, []);

  //   const update_expenses = (data) => {
  //     console.log(data);
  //     const { id, ...fields } = data;
  //     updateExpense({ id: id, ...fields });
  //     loadExpenses();
  //   };

  const update_Expense = async (data) => {
    const { id } = data;
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    getSingleExpense(id);
    history.push("/singleexpense");
  };

  const delete_Expense = (id) => {
    setEditExpenseID(id);
    deleteExpense(id);
    loadExpenses();
  };

  return (
    <div className="App">
      <h1>Allownaces</h1>

      <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
        <MaterialTable
          columns={columns}
          data={expenses}
          title="testing"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Save User",
              onClick: (event, rowData) => {
                update_Expense(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete User",
              onClick: (event, rowData) => {
                delete_Expense();
              },
            },
          ]}
          //   editable={{
          //     onRowAdd: (newData) =>
          //       new Promise((resolve, reject) => {
          //         setTimeout(() => {
          //           //setData([...data, newData]);
          //           update_expenses(newData);
          //           resolve();
          //         }, 1000);
          //       }),
          //     onRowUpdate: (newData, oldData) =>
          //       new Promise((resolve, reject) => {
          //         setTimeout(() => {
          //           const dataUpdate = [...data];
          //           const index = oldData.tableData.id;
          //           dataUpdate[index] = newData;
          //           //   setData([...dataUpdate]);
          //           update_expenses(newData);
          //           resolve();
          //         }, 1000);
          //       }),
          //     onRowDelete: (oldData) =>
          //       new Promise((resolve, reject) => {
          //         setTimeout(() => {
          //           const dataDelete = [...data];
          //           const index = oldData.tableData.id;
          //           dataDelete.splice(index, 1);
          //           setData([...dataDelete]);

          //           resolve();
          //         }, 1000);
          //       }),
          //   }}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
  },
}));
