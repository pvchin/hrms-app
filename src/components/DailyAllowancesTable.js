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
import { CustomDialog } from "../helpers/CustomDialog";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { useEmployeesContext } from "../context/employees_context";
import DailyAllowsDetlsTable from "./DailyAllowsDetlsTable";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "Period", field: "period" },
  { title: "Location", field: "location" },
  { title: "Manager Name", field: "manager_name" },
  { title: "No Of Days", field: "no_of_days", type: "numeric" },
  { title: "Amount", field: "amount", type: "numeric" },
  { title: "Status", field: "status" },
];

export default function DailyAllowancesTable() {
  let history = useHistory();
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    dailyallowances,
    singlebatch_dailyallowance,
    addDailyAllowance,
    singlebatch_dailyallowance_loading,
    updateDailyAllowance,
    deleteDailyAllowance,
    loadDailyAllowances,
    getSingleDailyAllowance,
    setEditDailyAllowanceID,
    setIsDailyAllowanceEditingOn,
    setIsDailyAllowanceEditingOff,
    resetSingleDailyAllowance,
    dailyallowance_period,
    getSingleBatchDailyAllowance,
  } = useDailyAllowancesContext();
  const { loadEmployees, employees } = useEmployeesContext();

  useEffect(() => {
    getSingleBatchDailyAllowance(dailyallowance_period);
  }, []);

  const update_DailyAllowance = async (data) => {
    console.log("dailyallows", data)
    const { id } = data;
    setEditDailyAllowanceID(id);
    setIsDailyAllowanceEditingOn();
    //getSingleBatchDailyAllowance(dailyallowance_period);
    handleDialogOpen();
    //history.push("/singledailyallowsdetlstable");
  };

  const add_DailyAllowance = async (data) => {
    const { id } = data;
    resetSingleDailyAllowance();
    setEditDailyAllowanceID("");
    setIsDailyAllowanceEditingOff();
    handleDialogOpen();
    //history.push("/singledailyallowance");
  };

  const delete_DailyAllowance = (data) => {
    const { id } = data;
    setEditDailyAllowanceID(id);
    deleteDailyAllowance(id);
    getSingleBatchDailyAllowance(dailyallowance_period);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    getSingleBatchDailyAllowance(dailyallowance_period);
  };

  if (singlebatch_dailyallowance_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatch_dailyallowance}
          title="Daily Allowances Application"
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
                update_DailyAllowance(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_DailyAllowance(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_DailyAllowance(rowData);
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
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <Link to="/dailyallowances">
                  <div>
                    <ArrowBackIcon fontSize="large" color="primary" />
                  </div>
                </Link>
              </div>
            ),
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title="Daily Allowances Details"
          showButton={true}
          isFullscree={false}
        >
          <DailyAllowsDetlsTable handleDialogClose={handleDialogClose} />
        </CustomDialog>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
