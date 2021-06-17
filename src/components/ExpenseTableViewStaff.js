import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import MaterialTable from "material-table";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { selector, useRecoilState, useRecoilValueLoadable } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useExpensesContext } from "../context/expenses_context";
import { expenses_url } from "../utils/constants";

const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },

  { title: "Description", field: "description" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Status", field: "status" },
];

const fetchExpensesDetails = selector({
  key: "fetchExpensesDetailsSelector",
  get: async ({ get }) => {
    try {
      const { data } = await axios.get(expenses_url);
      const wpexpirydata = data;

      return data;
    } catch (error) {
      throw error;
    }
  },
});

const ExpenseTableViewStaff = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [userdata, setUserdata] = useState([]);
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  const ExpensesDetails = useRecoilValueLoadable(fetchExpensesDetails);
  const { state, contents } = ExpensesDetails;
  const { expenses, expenses_loading, expenses_error, loadEmpExpenses } =
    useExpensesContext();

  useEffect(() => {
    loadEmpExpenses(loginLevel.loginUserId);
  }, []);

  if (expenses_error) {
    return (
      <div>
        <h2>Internet connections problem!</h2>
      </div>
    );
  }

  if (expenses_loading) {
    return (
      <div>
        <h2>Loading....Expenses</h2>
      </div>
    );
  }

  return (
    <List className={classes.root}>
      <Grid container direction="row">
        {expenses
          .filter((i) => i.empid === loginLevel.loginUserId)
          .map((row) => {
            return (
              <ListItem key={row.id}>
                {/* <Grid item sm={2} align="center">
                  <ListItemText>{row.name}</ListItemText>
                </Grid> */}
                <Grid item sm={3} align="center">
                  <ListItemText>{row.date}</ListItemText>
                </Grid>
                <Grid item sm={3} align="center">
                  <ListItemText>{row.description}</ListItemText>
                </Grid>
                <Grid item sm={3} align="center">
                  <ListItemText>{row.amount}</ListItemText>
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

export default ExpenseTableViewStaff;
