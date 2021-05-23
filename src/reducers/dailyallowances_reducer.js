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

const dailyallowances_reducer = (state, action) => {
  // set leaves variables
  if (action.type === SET_DAILYALLOWANCE_PERIOD) {
    return { ...state, dailyallowance_period: action.payload };
  }
  if (action.type === SET_EDITDAILYALLOWANCEID) {
    return { ...state, editDailyAllowanceID: action.payload };
  }

  if (action.type === SET_ISDAILYALLOWANCEEDITING_ON) {
    return { ...state, isDailyAllowanceEditing: true };
  }
  if (action.type === SET_ISDAILYALLOWANCEEDITING_OFF) {
    return { ...state, isDailyAllowanceEditing: false };
  }
  if (action.type === RESET_SINGLE_DAILYALLOWANCE) {
    return { ...state, single_dailyallowance: {} };
  }
  // get employees
  if (action.type === GET_DAILYALLOWANCES_BEGIN) {
    return { ...state, dailyallowances_loading: true };
  }
  if (action.type === GET_DAILYALLOWANCES_SUCCESS) {
    return {
      ...state,
      dailyallowances_loading: false,
      dailyallowances: action.payload,
    };
  }
  if (action.type === GET_DAILYALLOWANCES_ERROR) {
    return {
      ...state,
      dailyallowances_loading: false,
      dailyallowances_error: true,
    };
  }

  // add employee
  if (action.type === ADD_DAILYALLOWANCE_BEGIN) {
    return { ...state, add_dailyallowance_loading: true };
  }
  if (action.type === ADD_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      add_dailyallowances_loading: false,
      dailyallowances: action.payload,
    };
  }
  if (action.type === ADD_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      dailyallowances_loading: false,
      add_dailyallowance_error: true,
    };
  }
  // update employee
  if (action.type === UPDATE_DAILYALLOWANCE_BEGIN) {
    return { ...state, update_dailyallowance_loading: true };
  }
  if (action.type === UPDATE_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      dailyallowances_loading: false,
      single_dailyallowance: action.payload,
    };
  }
  if (action.type === UPDATE_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      update_dailyallowance_loading: false,
      update_dailyallowance_error: true,
    };
  }

  // delete employee
  if (action.type === DELETE_DAILYALLOWANCE_BEGIN) {
    return {
      ...state,
      delete_dailyallowance_loading: true,
      delete_dailyallowance_error: false,
    };
  }

  if (action.type === DELETE_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      delete_dailyallowance_loading: false,
      delete_dailyallowance_error: false,
    };
  }
  if (action.type === DELETE_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      delete_dailyallowance_loading: false,
      delete_dailyallowance_error: true,
    };
  }

  //single employee
  if (action.type === GET_SINGLE_DAILYALLOWANCE_BEGIN) {
    return {
      ...state,
      single_dailyallowance_loading: true,
      single_dailyallowance_error: false,
    };
  }
  if (action.type === GET_SINGLE_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      single_dailyallowance_loading: false,
      single_dailyallowance: action.payload,
    };
  }
  if (action.type === GET_SINGLE_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      single_dailyallowance_loading: false,
      single_dailyallowance_error: true,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default dailyallowances_reducer;
