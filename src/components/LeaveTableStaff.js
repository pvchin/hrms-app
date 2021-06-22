import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import LeaveForm from "./LeaveForm";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialog";
import { useLeavesContext } from "../context/leaves_context";
import { useEmployeesContext } from "../context/employees_context";

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Leave Balance",
    field: "leave_bal",
    type: "numeric",
    editable: "never",
  },
  {
    title: "No of Days",
    field: "no_of_days",
    type: "mumeric",
    editable: "never",
  },
  {
    title: "Reason",
    field: "reason",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
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

export default function LeaveTableStaff() {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { loadEmployees } = useEmployeesContext();
  const {
    leaves,
    editLeaveID,
    leaves_loading,
    deleteLeave,
    loadLeaves,
    getSingleLeave,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
    resetSingleLeave,
  } = useLeavesContext();
  console.log("login",loginLevel)
  useEffect(() => {
    loadLeaves();
  }, []);

  useEffect(() => {
    loadEmployees();
  }, []);

  const update_Leave = async (data) => {
    const { id } = data;
    setEditLeaveID(id);
    setIsLeaveEditingOn();
    getSingleLeave(id);
    handleDialogOpen();
    //history.push("/singleleave");
  };

  const add_Leave = async (data) => {
    // const { id } = data;
    resetSingleLeave();
    setEditLeaveID("");
    setIsLeaveEditingOff();
    handleDialogOpen();
    //history.push("/singleleave");
  };

  const delete_Leave = (data) => {
    const { id } = data;
    setEditLeaveID(id);
    handleAlertOpen();
    //deleteLeave(id);
    //loadLeaves();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    loadLeaves();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editLeaveID;
    deleteLeave(id);
    loadLeaves();
  };

  if (leaves_loading) {
    return (
      <div>
        <h2>Loading...Leaves</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leaves
            .filter((item) => item.empid === loginLevel.loginUserId)
            .map((row) => {
              return { ...row };
            })}
          title="Leave Application"
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
                update_Leave(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Leave(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Leave(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "primary",
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
        >
          <LeaveForm handleDialogClose={handleDialogClose} />
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