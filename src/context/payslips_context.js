import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/payslips_reducer";
import { payslips_url } from "../utils/constants";
import { payslipearnings_url } from "../utils/constants";
import { payslipdeductions_url } from "../utils/constants";

import {
  SET_EDITPAYSLIPID,
  SET_ISPAYSLIPEDITING_ON,
  SET_ISPAYSLIPEDITING_OFF,
  SET_PAYSLIP_PERIOD,
  SET_PAYSLIP_ENDMONTHDATE,
  SET_SINGLEPAYSLIP,
  SET_PAYSLIPEARNING_AMOUNT,
  SET_PAYSLIPDEDUCTION_AMOUNT,
  GET_PAYSLIPS_BEGIN,
  GET_PAYSLIPS_SUCCESS,
  GET_PAYSLIPS_ERROR,
  GET_SINGLE_PAYSLIP_BEGIN,
  GET_SINGLE_PAYSLIP_SUCCESS,
  GET_SINGLE_PAYSLIP_ERROR,
  GET_SINGLEBATCH_PAYSLIP_BEGIN,
  GET_SINGLEBATCH_PAYSLIP_SUCCESS,
  GET_SINGLEBATCH_PAYSLIP_ERROR,
  ADD_PAYSLIP_BEGIN,
  ADD_PAYSLIP_SUCCESS,
  ADD_PAYSLIP_ERROR,
  DELETE_PAYSLIP_BEGIN,
  DELETE_PAYSLIP_SUCCESS,
  DELETE_PAYSLIP_ERROR,
  UPDATE_PAYSLIP_BEGIN,
  UPDATE_PAYSLIP_SUCCESS,
  UPDATE_PAYSLIP_ERROR,
  RESET_SINGLE_PAYSLIP,
  GET_PAYSLIPEARNINGS_BEGIN,
  GET_PAYSLIPEARNINGS_SUCCESS,
  GET_PAYSLIPEARNINGS_ERROR,
  GET_SINGLE_PAYSLIPEARNING_BEGIN,
  GET_SINGLE_PAYSLIPEARNING_SUCCESS,
  GET_SINGLE_PAYSLIPEARNING_ERROR,
  ADD_PAYSLIPEARNING_BEGIN,
  ADD_PAYSLIPEARNING_SUCCESS,
  ADD_PAYSLIPEARNING_ERROR,
  DELETE_PAYSLIPEARNING_BEGIN,
  DELETE_PAYSLIPEARNING_SUCCESS,
  DELETE_PAYSLIPEARNING_ERROR,
  UPDATE_PAYSLIPEARNING_BEGIN,
  UPDATE_PAYSLIPEARNING_SUCCESS,
  UPDATE_PAYSLIPEARNING_ERROR,
  GET_PAYSLIPDEDUCTIONS_BEGIN,
  GET_PAYSLIPDEDUCTIONS_SUCCESS,
  GET_PAYSLIPDEDUCTIONS_ERROR,
  GET_SINGLE_PAYSLIPDEDUCTION_BEGIN,
  GET_SINGLE_PAYSLIPDEDUCTION_SUCCESS,
  GET_SINGLE_PAYSLIPDEDUCTION_ERROR,
  ADD_PAYSLIPDEDUCTION_BEGIN,
  ADD_PAYSLIPDEDUCTION_SUCCESS,
  ADD_PAYSLIPDEDUCTION_ERROR,
  DELETE_PAYSLIPDEDUCTION_BEGIN,
  DELETE_PAYSLIPDEDUCTION_SUCCESS,
  DELETE_PAYSLIPDEDUCTION_ERROR,
  UPDATE_PAYSLIPDEDUCTION_BEGIN,
  UPDATE_PAYSLIPDEDUCTION_SUCCESS,
  UPDATE_PAYSLIPDEDUCTION_ERROR,
} from "../actions";

const initialState = {
  isPayslipEditing: false,
  alertPayslip: { show: false, msg: "", type: "" },
  editPayslipID: null,
  payslips_loading: false,
  payslips_error: false,
  payslip_period: "",
  payslip_endmonthdate: "",
  payslip_earning_amount: 0,
  payslip_deduction_amount: 0,
  payslips: [],
  single_payslip_loading: false,
  single_payslip_error: false,
  single_payslip: {},
  singlebatch_payslip_loading: false,
  singlebatch_payslip_error: false,
  singlebatch_payslip: {},
  delete_payslip_loading: false,
  delete_payslip_error: false,
  update_payslip_loading: false,
  update_payslip_error: false,
  add_payslip_loading: false,
  add_payslip_error: false,
  // filterValue: "Female",
  // filterfield: "gender",
  // payslip earnings
  isPayslipEarningEditing: false,
  alertPayslipEarning: { show: false, msg: "", type: "" },
  editPayslipEarningID: null,
  payslipearnings_loading: false,
  payslipearnings_error: false,
  payslipearnings: [],

  single_payslipearning_loading: false,
  single_payslipearning_error: false,
  single_payslipearning: {},
  delete_payslipearning_loading: false,
  delete_payslipearning_error: false,
  update_payslipearning_loading: false,
  update_payslipearning_error: false,
  add_payslipearning_loading: false,
  add_payslipearning_error: false,
  // payslip deductions
  isPayslipDeductionEditing: false,
  alertPayslipDeduction: { show: false, msg: "", type: "" },
  editPayslipDeductionID: null,
  payslipdeductions_loading: false,
  payslipdeductions_error: false,
  payslipdeductions: [],
  single_payslipdeduction_loading: false,
  single_payslipdeduction_error: false,
  single_payslipdeduction: {},
  delete_payslipdeduction_loading: false,
  delete_payslipdeduction_error: false,
  update_payslipdeduction_loading: false,
  update_payslipdeduction_error: false,
  add_payslipdeduction_loading: false,
  add_payslipdeduction_error: false,
};

const PayslipsContext = React.createContext();

export const PayslipsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //....... payslip
  const loadPayslips = async () => {
    dispatch({ type: GET_PAYSLIPS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(payslips_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslips = await res.json();
      dispatch({ type: GET_PAYSLIPS_SUCCESS, payload: payslips });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPS_ERROR });
    }
  };

  const getSingleBatchPayslip = async (period) => {
    dispatch({ type: GET_SINGLEBATCH_PAYSLIP_BEGIN });
    try {
      const res = await fetch(`${payslips_url}?fv=${period}`);
      const singlebatchpayslip = await res.json();

      dispatch({
        type: GET_SINGLEBATCH_PAYSLIP_SUCCESS,
        payload: singlebatchpayslip,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLEBATCH_PAYSLIP_ERROR });
    }
  };

  const setIsPayslipEditingOn = () => {
    dispatch({ type: SET_ISPAYSLIPEDITING_ON });
  };

  const setIsPayslipEditingOff = () => {
    dispatch({ type: SET_ISPAYSLIPEDITING_OFF });
  };

  const resetSinglePayslip = () => {
    dispatch({ type: RESET_SINGLE_PAYSLIP });
  };

  const setPayslipEarningAmount = (value) => {
    dispatch({ type: SET_PAYSLIPEARNING_AMOUNT, payload: value });
  };
  const setPayslipDeductionAmount = (value) => {
    dispatch({ type: SET_PAYSLIPDEDUCTION_AMOUNT, payload: value });
  };

  const setPayslipPeriod = async (name) => {
    try {
      dispatch({ type: SET_PAYSLIP_PERIOD, payload: name });
    } catch (error) {
      dispatch(error);
    }
  };
  const setPayslipEndMonthDate = async (name) => {
    try {
      dispatch({ type: SET_PAYSLIP_ENDMONTHDATE, payload: name });
    } catch (error) {
      dispatch(error);
    }
  };

  const setEditPayslipID = async (id) => {
    try {
      dispatch({ type: SET_EDITPAYSLIPID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSinglePayslip = async (id) => {
    dispatch({ type: GET_SINGLE_PAYSLIP_BEGIN });
    try {
      const { data } = await axios.get(`${payslips_url}?id=${id}`);
      const singlepayslip = data;
      dispatch({ type: GET_SINGLE_PAYSLIP_SUCCESS, payload: singlepayslip });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PAYSLIP_ERROR });
    }
  };

  const addPayslip = async (data) => {
    const { id, name, from_date, to_date, reason, no_of_days, status } = data;
    //
    dispatch({ type: ADD_PAYSLIP_BEGIN });
    try {
      await fetch(payslips_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYSLIP_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYSLIP_ERROR });
    }
  };

  const updatePayslip = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYSLIP_BEGIN });
    try {
      await fetch(payslips_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYSLIP_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYSLIP_ERROR });
    }
  };

  const deletePayslip = async (id) => {
    dispatch({ type: DELETE_PAYSLIP_BEGIN });
    try {
      await fetch(payslips_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYSLIP_SUCCESS });
      loadPayslips();
    } catch (err) {
      dispatch({ type: DELETE_PAYSLIP_ERROR });
    }
  };

  //.... payslip earnings
  const loadPayslipEarnings = async () => {
    dispatch({ type: GET_PAYSLIPEARNINGS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(payslipearnings_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipearnings = await res.json();
      dispatch({ type: GET_PAYSLIPEARNINGS_SUCCESS, payload: payslipearnings });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPEARNINGS_ERROR });
    }
  };
  //.... payslip earnings
  const getSingleBatchPayslipEarnings = async (empid, period) => {
    dispatch({ type: GET_PAYSLIPEARNINGS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(
        `${payslipearnings_url}?fv=${empid}&period=${period}`
      );
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipearnings = await res.json();
      dispatch({ type: GET_PAYSLIPEARNINGS_SUCCESS, payload: payslipearnings });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPEARNINGS_ERROR });
    }
  };
  const addPayslipEarning = async (data) => {
    const { id, name, period, description, amount } = data;
    //
    dispatch({ type: ADD_PAYSLIPEARNING_BEGIN });
    try {
      await fetch(payslipearnings_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYSLIPEARNING_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYSLIPEARNING_ERROR });
    }
  };

  const updatePayslipEarning = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYSLIPEARNING_BEGIN });
    try {
      await fetch(payslipearnings_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYSLIPEARNING_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYSLIPEARNING_ERROR });
    }
  };

  const deletePayslipEarning = async (id) => {
    dispatch({ type: DELETE_PAYSLIPEARNING_BEGIN });
    try {
      await fetch(payslipearnings_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYSLIPEARNING_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYSLIPEARNING_ERROR });
    }
  };

  //.... payslip deductions
  const loadPayslipDeductions = async () => {
    dispatch({ type: GET_PAYSLIPDEDUCTIONS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(payslipdeductions_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipdeductions = await res.json();
      dispatch({
        type: GET_PAYSLIPDEDUCTIONS_SUCCESS,
        payload: payslipdeductions,
      });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPDEDUCTIONS_ERROR });
    }
  };
  const getSingleBatchPayslipDeductions = async (empid, period) => {
    dispatch({ type: GET_PAYSLIPDEDUCTIONS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(
        `${payslipdeductions_url}?fv=${empid}&period=${period}`
      );
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipdeductions = await res.json();
      dispatch({
        type: GET_PAYSLIPDEDUCTIONS_SUCCESS,
        payload: payslipdeductions,
      });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPDEDUCTIONS_ERROR });
    }
  };
  const addPayslipDeduction = async (data) => {
    const { id, name, period, description, amount } = data;
    //
    dispatch({ type: ADD_PAYSLIPDEDUCTION_BEGIN });
    try {
      await fetch(payslipdeductions_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYSLIPDEDUCTION_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYSLIPDEDUCTION_ERROR });
    }
  };

  const updatePayslipDeduction = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYSLIPDEDUCTION_BEGIN });
    try {
      await fetch(payslipdeductions_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYSLIPDEDUCTION_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYSLIPDEDUCTION_ERROR });
    }
  };

  const deletePayslipDeduction = async (id) => {
    dispatch({ type: DELETE_PAYSLIPDEDUCTION_BEGIN });
    try {
      await fetch(payslipdeductions_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYSLIPDEDUCTION_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYSLIPDEDUCTION_ERROR });
    }
  };

  return (
    <PayslipsContext.Provider
      value={{
        ...state,
        loadPayslips,
        addPayslip,
        updatePayslip,
        deletePayslip,
        getSinglePayslip,
        getSingleBatchPayslip,
        setEditPayslipID,
        setIsPayslipEditingOn,
        setIsPayslipEditingOff,
        loadPayslipEarnings,
        addPayslipEarning,
        updatePayslipEarning,
        deletePayslipEarning,
        getSingleBatchPayslipEarnings,
        setPayslipEarningAmount,
        loadPayslipDeductions,
        addPayslipDeduction,
        updatePayslipDeduction,
        deletePayslipDeduction,
        getSingleBatchPayslipDeductions,
        setPayslipDeductionAmount,
        resetSinglePayslip,
        setPayslipPeriod,
        setPayslipEndMonthDate,
      }}
    >
      {children}
    </PayslipsContext.Provider>
  );
};

export const usePayslipsContext = () => {
  return useContext(PayslipsContext);
};
