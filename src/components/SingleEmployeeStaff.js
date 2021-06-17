import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { loginLevelState } from "./data/atomdata";
import { atom, selector, useRecoilState, useRecoilValueLoadable } from "recoil";
import { Container, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

import EmployeeFormStaff from "./EmployeeFormStaff";
import EmployeeViewStaff from "./EmployeeViewStaff";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

const drawerWidth = 240;

const ToolbarHeader = ({ title }) => {
  const classes = useToolbarStyles();

  return (
    <div>
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      </Toolbar>
    </div>
  );
};

const SingleEmployeeStaff = ({ title }) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const {
    singleemployee,
    editEmployeeID,
    single_employee_loading,
    single_employee_error,
    getSingleEmployee,
    deleteEmployee,
    loadEmployees,
    setEditEmployeeID,
    setIsEditingOn,
    setIsEditingOff,
    resetSingleEmployee,
    resetEmployees,
  } = useEmployeesContext();
  const {
    singlebatchfamily,
    loadSingleBatchFamily,
    singlebatch_family_loading,
    singlebatch_family_error,
    singlebatchexperience,
    loadSingleBatchExperience,
    singlebatch_experience_loading,
    singlebatch_experience_error,
    singlebatcheducation,
    loadSingleBatchEducation,
    singlebatch_education_loading,
    singlebatch_education_error,
  } = useTablesContext();

  // useEffect(() => {
  //   getSingleEmployee(loginLevel.loginUserId);
  //   loadSingleBatchFamily(loginLevel.loginUserId);
  //   loadSingleBatchEducation(loginLevel.loginUserId);
  //   loadSingleBatchExperience(loginLevel.loginUserId);
  // }, []);

  return (
    <div>
      <CssBaseline />

      <div className={classes.appBarSpacer}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={8} lg={9}> */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Link to="/home">
                  <div>
                    <ArrowBackIcon fontSize="large" color="primary" />
                  </div>
                </Link>
                <div>
                  {/* <ToolbarHeader title={title} /> */}

                  <EmployeeViewStaff />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(4),
    border: "1px solid",
  },
  paper: {
    padding: theme.spacing(2),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
  },
  fixedHeight: {
    height: 800,
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

export default SingleEmployeeStaff;
