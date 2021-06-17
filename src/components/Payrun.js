import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAsync } from "react-async";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  Checkbox,
  Paper,
  Grid,
  Icon,
  Divider,
  TextField,
  MenuItem,
  FormControlLabel,
} from "@material-ui/core";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { employees_url } from "../utils/constants";
import { useEmployeesContext } from "../context/employees_context";
import { usePayslipsContext } from "../context/payslips_context";
import { payrunState, payPeriodIdState, paydataState } from "./data/atomdata";

const drawerWidth = 240;
const url = "https://course-api.com/react-tabs-project";

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
    cellStyle: {
      width: 280,
      maxWidth: 280,
    },
  },
];

const Payrun = () => {
  let history = useHistory();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loadPaybatch, setLoadPaybatch] = useState(false);
  const { loadEmployees, employees, employees_loading } = useEmployeesContext();
  const {
    addPayrun,
    getPayrun,
    payrun,
    addPayslip,
    payrun_loading,
    payslipsdata,
    setPayslipsData,
    resetPayslipsData,
    singlebatchpayslip,
    singlebatch_payslip_loading,
    singlebatch_payslip_error,
    getSingleBatchPayslip,
  } = usePayslipsContext();
  const [input, setInput] = useRecoilState(payrunState);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [isPayrunExist, setIsPayrunExist] = useState(false);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString("en-GB", options);
  }

  function formatPayrun() {
    const yy =
      input.fromdate.substring(0, 4) + "-" + input.fromdate.substring(5, 7);
    const mm = input.fromdate.substring(5, 7);
    const d = input.fromdate;
    console.log("payrun", payrun);
  }

  const payrunExists = (data) => {
    return payrun.some(function (el) {
      return el.payrun === data;
    });
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePayrunSubmit = (e) => {
    e.preventDefault();

    const period =
      formatDate(input.fromdate) + " - " + formatDate(input.todate);
    const payrundata =
      input.fromdate.substring(0, 4) + "-" + input.fromdate.substring(5, 7);
    setInput({ ...input, period: period, payrun: payrundata });
    formatPayrun();

    const isExist = payrunExists(payrundata);
    console.log("isExist", isExist);
    if (isExist) {
      console.log("exist", payrundata);
      setIsPayrunExist(true);
      setAlert(true);
    } else {
      console.log("add");
      add_Payrun();
      setIsPayrunExist(false);
      setAlert(false);
      setLoadPaybatch(true);
    }
  };

  const checkSelectedEmployees = (period, payrun) => {
    let items = [];
    let payitems = [];
    resetPayslipsData();
    const paydata = singlebatchpayslip.map((e) => e.name) || [];
    {
      employees &&
        employees.forEach((emp, index) => {
          if (emp.tableData.checked) {
            const {
              id,
              name,
              bank_name,
              bank_acno,
              basic_salary,
              nett_pay,
              tap_acno,
              tap_amount,
              scp_acno,
              scp_amount,
            } = emp;
            const data = {
              name: name,
              period: period,
              date: input.pay_date,
              payrun: payrun,
              wages: basic_salary,
              nett_pay: nett_pay,
              bank_name: bank_name,
              bank_acno: bank_acno,
              tap_acno: tap_acno,
              tap_amount: tap_amount,
              scp_acno: scp_acno,
              scp_amount: scp_amount,
              empid: id,
              status: "Pending",
              allows_type1: "Basic Salary",
              allows_type1amt: basic_salary,
              allows_type2: "Site Allowances",
              allows_type2amt: 0,
              allows_type3: "Expenses Claims",
              allows_type3amt: 0,
              allows_type4: " ",
              allows_type4amt: 0,
              allows_type5: " ",
              allows_type5amt: 0,
              allows_type6: " ",
              allows_type6amt: 0,
              allows_type7: " ",
              allows_type7amt: 0,
              allows_type8: " ",
              allows_type8amt: 0,
              deducts_type1: " ",
              deducts_type1amt: 0,
              deducts_type2: " ",
              deducts_type2amt: 0,
              deducts_type3: " ",
              deducts_type3amt: 0,
              deducts_type4: " ",
              deducts_type4amt: 0,
              deducts_type5: " ",
              deducts_type5amt: 0,
              deducts_type6: " ",
              deducts_type6amt: 0,
              deducts_type7: " ",
              deducts_type7amt: 0,
              deducts_type8: " ",
              deducts_type8amt: 0,
            };
            if (paydata) {
              const res = paydata.includes(emp.name);
              if (!res) {
                addPayslip({ ...data });
              }
            } else {
              addPayslip({ ...data });
            }
          }
        });
    }
  };

  const handleNext = () => {
    history.push("/payrunbatch");
  };

  const add_Payrun = () => {
    //update payrun
    addPayrun({
      pay_freq: input.payfreq,
      from_date: input.fromdate,
      to_date: input.todate,
      pay_date: input.paydate,
      period: input.period,
      payrun: input.payrun,
    });
    getPayrun();
  };

  useEffect(() => {
    loadEmployees();
    getPayrun();
  }, []);

  useEffect(() => {
    getSingleBatchPayslip(input.payrun);
    if (singlebatchpayslip) {
      checkSelectedEmployees(input.period, input.payrun);
      setLoadPaybatch(false);
    }
  }, [loadPaybatch]);

  //   useEffect(() => {
  //     if (input.period && input.payrun) {
  //       //add_Payrun();

  //       setAlert(true);
  //     }
  //   }, [input]);

  return (
    <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
      <section className={classes.section}>
        <Grid
          direction="row"
          container
          spacing={1}
          style={{ border: "1px solid white" }}
        >
          <Grid container item sm={3} direction="column" align="left">
            <article className={classes.jobinfo}>
              <h2>Pay Run</h2>
              <form onSubmit={handlePayrunSubmit}>
                <div>
                  <TextField
                    label="Pay Frequency"
                    variant="filled"
                    required
                    style={{ width: 250 }}
                    name="payfreq"
                    value={input.payfreq}
                    onChange={(e) => handleChange(e)}
                    select
                  >
                    {/* <MenuItem value="Weekly">Weekly</MenuItem> */}
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </TextField>
                </div>
                <div>
                  <TextField
                    label="From Date"
                    variant="filled"
                    name="fromdate"
                    type="date"
                    value={input.fromdate}
                    required
                    style={{ width: 250 }}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="To Date"
                    variant="filled"
                    type="date"
                    name="todate"
                    value={input.todate}
                    required
                    onChange={(e) => handleChange(e)}
                    style={{ width: 250 }}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Payment Date"
                    variant="filled"
                    type="date"
                    name="paydate"
                    value={input.paydate}
                    required
                    style={{ width: 250 }}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Submit <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                  {alert && !isPayrunExist && (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleNext}
                    >
                      Next <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                  )}
                </div>
                <div>
                  {alert && !isPayrunExist && !singlebatch_payslip_loading && (
                    <h3>New Payrun being added!</h3>
                  )}
                  {alert && isPayrunExist && (
                    <h3>This payrun already existed!</h3>
                  )}
                </div>
                <div>
                  {error && <h3>This Payrun period already existed!</h3>}
                </div>
              </form>
            </article>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            style={{ background: "white" }}
          />
          <Grid container item sm={8} align="right">
            <MaterialTable
              columns={columns}
              data={employees}
              title="Payrun History"
              options={{
                filtering: false,
                search: false,
                toolbar: false,
                selection: true,
                headerStyle: {
                  backgroundColor: "orange",
                  color: "primary",
                },
                showTitle: false,
              }}
            />
          </Grid>
        </Grid>
      </section>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,250px)",
    gridAutoRows: "10px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    justifyContent: "center",
    backgroundColor: "primary",
  },
  fixedHeight: {
    height: 800,
  },
  paper: {
    padding: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "black",
  },
  card: {
    backgroundColor: "black",
  },
  section: {
    width: "95vw",
    margin: "5rem auto",
    maxWidth: "var(--max-width)",
  },
  underline: {
    width: "5rem",
    height: "0.25rem",
    marginBottom: "1.25rem",
    background: "var(--clr-primary-5)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginbottom: "4rem",
    textAlign: "center",
  },
  jobscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  jobbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    letterSpacing: "var(--spacing)",
    margin: "0 0.5rem",
    transition: "var(--transition)",
    cursor: "pointer",
    padding: "0.25rem 0",
    lineHeight: "1",
    outlineColor: "var(--clr-primary-10)",
    "&:hover": {
      color: "var(--clr-primary-5)",
      boxShadow: "0 2px var(--clr-primary-5)",
    },
  },
  activebtn: {
    color: "var(--clr-primary-5)",
    boxShadow: "0 2px var(--clr-primary-5)",
  },
  jobinfo: {
    fontWeight: "400",
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default Payrun;
