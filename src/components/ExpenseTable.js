import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";
import { useHistory, Link } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { useExpensesContext } from "../context/expenses_context";
import { useEmployeesContext } from "../context/employees_context";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialog";

const columns = [
  { title: "Name", field: "name" },
  {
    title: "From Date",
    field: "from_date",
    editComponent: (props) => (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={props.dateTimePickerLocalization}
      >
        <DatePicker
          format="dd/MM/yyyy"
          value={props.value || null}
          onChange={props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    ),
  },
  {
    title: "To Date",
    field: "to_date",
    editComponent: (props) => (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={props.dateTimePickerLocalization}
      >
        <DatePicker
          format="dd/MM/yyyy"
          value={props.value || null}
          onChange={props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    ),
  },
  { title: "Description", field: "description", type: "date" },
  { title: "Amount", field: "amount", type: "numeric" },
  { title: "Status", field: "status" },
];

export default function ExpenseTable() {
  let history = useHistory();
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { loadEmployees, employees } = useEmployeesContext();
  const {
    expenses,
    addExpense,
    editExpenseID,
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

  useEffect(() => {
    loadEmployees();
  }, []);

  const add_Expense = async (data) => {
    const { id } = data;
    resetSingleExpense();
    setEditExpenseID("");
    setIsExpenseEditingOff();
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const update_Expense = async (data) => {
    const { id } = data;
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    getSingleExpense(id);
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const delete_Expense = (data) => {
    const { id } = data;
    setEditExpenseID(id);
    handleAlertOpen();

    // deleteExpense(id);
    // loadExpenses();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    loadExpenses();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editExpenseID;
    deleteExpense(id);
    loadExpenses();
  };

  if (expenses_loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={expenses}
          title="Expenses Claims Application"
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
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Expense(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Expense(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Expense(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
            },
            showTitle: true,
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscree={false}
          isFullwidth={false}
        >
          <ExpenseForm handleDialogClose={handleDialogClose} />
        </CustomDialog>

        <AlertDialog
          handleClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Expenses"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialog>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
