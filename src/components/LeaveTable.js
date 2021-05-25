import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, Link } from "react-router-dom";

import { useLeavesContext } from "../context/leaves_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "From Date", field: "from_date" },
  { title: "To Date", field: "to_date" },
  { title: "No of Days", field: "no_of_days" },
  { title: "Status", field: "status" },
];

export default function LeaveTable() {
  let history = useHistory();
  const classes = useStyles();
  const {
    leaves,
    addLeave,
    leaves_loading,
    updateLeave,
    deleteLeave,
    loadLeaves,
    getSingleLeave,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
    resetSingleLeave,
  } = useLeavesContext();

  useEffect(() => {
    loadLeaves();
  }, []);

  const update_Leave = async (data) => {
    const { id } = data;
    setEditLeaveID(id);
    setIsLeaveEditingOn();
    getSingleLeave(id);
    history.push("/singleleave");
  };

  const add_Leave = async (data) => {
    const { id } = data;
    resetSingleLeave();
    setEditLeaveID("");
    setIsLeaveEditingOff();
    history.push("/singleleave");
  };

  const delete_Leave = (data) => {
    const { id } = data;
    setEditLeaveID(id);
    deleteLeave(id);
    loadLeaves();
  };

  if (leaves_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leaves}
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
          //   components={{
          //     Toolbar: (props) => (
          //       <div>
          //         <MTableToolbar {...props} />
          //         <Link to="/expenses">
          //           <div>
          //             <ArrowBackIcon fontSize="large" color="primary" />
          //           </div>
          //         </Link>
          //       </div>
          //     ),
          //   }}
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
