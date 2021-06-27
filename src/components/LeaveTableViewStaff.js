import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import MaterialTable from "material-table";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { selector, useRecoilState, useRecoilValueLoadable } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
import { useLeavesContext } from "../context/leaves_context";
import { leaves_url } from "../utils/constants";

const drawerWidth = 240;



// const fetchExpensesDetails = selector({
//   key: "fetchExpensesDetailsSelector",
//   get: async ({ get }) => {
//     try {
//       const { data } = await axios.get(expenses_url);
//       const wpexpirydata = data;

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },
// });

const LeaveTableViewStaff = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [userdata, setUserdata] = useState([]);
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  //const ExpensesDetails = useRecoilValueLoadable(fetchExpensesDetails);
  //const { state, contents } = ExpensesDetails;
  const { editEmployeeID } = useEmployeesContext();
  const {
    leaves,
    leaves_loading,
    leaves_error,
        loadEmpLeaves,
  } = useLeavesContext();

  useEffect(() => {
    loadEmpLeaves(editEmployeeID);
  }, []);

  if (leaves_error) {
    return (
      <div>
        <h2>Internet connections problem!</h2>
      </div>
    );
  }

  if (leaves_loading) {
    return (
      <div>
        <h2>Loading....Expenses</h2>
      </div>
    );
  }

  return (
    <List className={classes.root}>
      <Grid container direction="row">
        {leaves
          // .filter((i) => i.empid === loginLevel.loginUserId)
          .map((row) => {
            return (
              <ListItem key={row.id}>
                <Grid item sm={3} align="center">
                  <ListItemText>{row.from_date}</ListItemText>
                </Grid>
                <Grid item sm={3} align="center">
                  <ListItemText>{row.to_date}</ListItemText>
                </Grid>
                <Grid item sm={3} align="center">
                  <ListItemText>{row.reason}</ListItemText>
                </Grid>
                <Grid item sm={3} align="center">
                  <ListItemText>{row.status}</ListItemText>
                </Grid>
              </ListItem>
            );
          })}
      </Grid>
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

export default LeaveTableViewStaff;
