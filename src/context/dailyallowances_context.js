import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/dailyallowances_reducer";
import { dailyallowances_url } from "../utils/constants";

import {
  SET_EDITDAILYALLOWANCEID,
  SET_ISDAILYALLOWANCEEDITING_ON,
  SET_ISDAILYALLOWANCEEDITING_OFF,
  SET_DAILYALLOWANCE_PERIOD,
  SET_SINGLEDAILYALLOWANCE,
  GET_DAILYALLOWANCES_BEGIN,
  GET_DAILYALLOWANCES_SUCCESS,
  GET_DAILYALLOWANCES_ERROR,
  GET_SINGLE_DAILYALLOWANCE_BEGIN,
  GET_SINGLE_DAILYALLOWANCE_SUCCESS,
  GET_SINGLE_DAILYALLOWANCE_ERROR,
  ADD_DAILYALLOWANCE_BEGIN,
  ADD_DAILYALLOWANCE_SUCCESS,
  ADD_DAILYALLOWANCE_ERROR,
  DELETE_DAILYALLOWANCE_BEGIN,
  DELETE_DAILYALLOWANCE_SUCCESS,
  DELETE_DAILYALLOWANCE_ERROR,
  UPDATE_DAILYALLOWANCE_BEGIN,
  UPDATE_DAILYALLOWANCE_SUCCESS,
  UPDATE_DAILYALLOWANCE_ERROR,
  RESET_SINGLE_DAILYALLOWANCE,
} from "../actions";

const initialState = {
  isDailyAllowanceEditing: false,
  alertDailyAllowance: { show: false, msg: "", type: "" },
  editDailyAllowanceID: null,
  dailyallowances_loading: false,
  dailyallowances_error: false,
  dailyallowances: [],
  single_dailyallowance_loading: false,
  single_dailyallowance_error: false,
  single_dailyallowance: {},
  delete_dailyallowance_loading: false,
  delete_dailyallowance_error: false,
  update_dailyallowance_loading: false,
  update_dailyallowance_error: false,
  add_dailyallowance_loading: false,
  add_dailyallowance_error: false,
  dailyallowance_period: "",
  // filterValue: "Female",
  // filterfield: "gender",
};

const DailyAllowancesContext = React.createContext();

export const DailyAllowancesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadDailyAllowances = async () => {
    dispatch({ type: GET_DAILYALLOWANCES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(dailyallowances_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const dailyallowances = await res.json();
      dispatch({ type: GET_DAILYALLOWANCES_SUCCESS, payload: dailyallowances });
    } catch (error) {
      dispatch({ type: GET_DAILYALLOWANCES_ERROR });
    }
  };

  const setIsDailyAllowanceEditingOn = () => {
    dispatch({ type: SET_ISDAILYALLOWANCEEDITING_ON });
  };

  const setIsDailyAllowanceEditingOff = () => {
    dispatch({ type: SET_ISDAILYALLOWANCEEDITING_OFF });
  };

  const resetSingleDailyAllowance = () => {
    dispatch({ type: RESET_SINGLE_DAILYALLOWANCE });
  };

  const setDailyAllowancePeriod = async (name) => {
    try {
      dispatch({ type: SET_DAILYALLOWANCE_PERIOD, payload: name });
    } catch (error) {
      dispatch(error);
    }
  };

  const setEditDailyAllowanceID = async (id) => {
    try {
      dispatch({ type: SET_EDITDAILYALLOWANCEID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSingleDailyAllowance = async (id) => {
    dispatch({ type: GET_SINGLE_DAILYALLOWANCE_BEGIN });
    try {
      const { data } = await axios.get(`${dailyallowances_url}?id=${id}`);
      const singledailyallowance = data;
      dispatch({
        type: GET_SINGLE_DAILYALLOWANCE_SUCCESS,
        payload: singledailyallowance,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_DAILYALLOWANCE_ERROR });
    }
  };

  const addDailyAllowance = async (data) => {
    const {
      id,
      name,
      period,
      location,
      manager_name,
      no_of_days,
      amount,
      status,
    } = data;
    //
    dispatch({ type: ADD_DAILYALLOWANCE_BEGIN });
    try {
      await fetch(dailyallowances_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_DAILYALLOWANCE_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_DAILYALLOWANCE_ERROR });
    }
  };

  const updateDailyAllowance = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_DAILYALLOWANCE_BEGIN });
    try {
      await fetch(dailyallowances_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_DAILYALLOWANCE_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_DAILYALLOWANCE_ERROR });
    }
  };

  const deleteDailyAllowance = async (id) => {
    dispatch({ type: DELETE_DAILYALLOWANCE_BEGIN });
    try {
      await fetch(dailyallowances_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_DAILYALLOWANCE_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_DAILYALLOWANCE_ERROR });
    }
  };
  return (
    <DailyAllowancesContext.Provider
      value={{
        ...state,
        loadDailyAllowances,
        addDailyAllowance,
        updateDailyAllowance,
        deleteDailyAllowance,
        getSingleDailyAllowance,
        setEditDailyAllowanceID,
        setIsDailyAllowanceEditingOn,
        setIsDailyAllowanceEditingOff,
        setDailyAllowancePeriod,
        resetSingleDailyAllowance,
      }}
    >
      {children}
    </DailyAllowancesContext.Provider>
  );
};

export const useDailyAllowancesContext = () => {
  return useContext(DailyAllowancesContext);
};
