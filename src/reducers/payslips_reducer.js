import {
  SET_EDITPAYSLIPID,
  SET_ISPAYSLIPEDITING_ON,
  SET_ISPAYSLIPEDITING_OFF,
  SET_PAYSLIP_PERIOD,
  SET_PAYSLIP_ENDMONTHDATE,
  SET_PAYSLIPEARNING_AMOUNT,
  SET_PAYSLIPDEDUCTION_AMOUNT,
  SET_SINGLEPAYSLIP,
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

const payslips_reducer = (state, action) => {
  // set payslips variables
  if (action.type === SET_PAYSLIP_PERIOD) {
    return { ...state, payslip_period: action.payload };
  }
  if (action.type === SET_PAYSLIP_ENDMONTHDATE) {
    return { ...state, payslip_endmonthdate: action.payload };
  }
  if (action.type === SET_EDITPAYSLIPID) {
    return { ...state, editPayslipID: action.payload };
  }
  if (action.type === SET_PAYSLIPEARNING_AMOUNT) {
    return { ...state, payslip_earning_amount: action.payload };
  }
  if (action.type === SET_PAYSLIPDEDUCTION_AMOUNT) {
    return { ...state, payslip_deduction_amount: action.payload };
  }

  if (action.type === SET_ISPAYSLIPEDITING_ON) {
    return { ...state, isPayslipEditing: true };
  }
  if (action.type === SET_ISPAYSLIPEDITING_OFF) {
    return { ...state, isPayslipEditing: false };
  }
  if (action.type === RESET_SINGLE_PAYSLIP) {
    return { ...state, single_payslip: {} };
  }
  // get payslips
  if (action.type === GET_PAYSLIPS_BEGIN) {
    return { ...state, payslips_loading: true };
  }
  if (action.type === GET_PAYSLIPS_SUCCESS) {
    return { ...state, payslips_loading: false, payslips: action.payload };
  }
  if (action.type === GET_PAYSLIPS_ERROR) {
    return { ...state, payslips_loading: false, payslips_error: true };
  }

  // add payslips
  if (action.type === ADD_PAYSLIP_BEGIN) {
    return { ...state, add_payslip_loading: true };
  }
  if (action.type === ADD_PAYSLIP_SUCCESS) {
    return {
      ...state,
      add_payslips_loading: false,
      payslips: action.payload,
    };
  }
  if (action.type === ADD_PAYSLIP_ERROR) {
    return { ...state, payslips_loading: false, add_payslip_error: true };
  }
  // update payslips
  if (action.type === UPDATE_PAYSLIP_BEGIN) {
    return { ...state, update_payslip_loading: true };
  }
  if (action.type === UPDATE_PAYSLIP_SUCCESS) {
    return {
      ...state,
      payslips_loading: false,
      single_payslip: action.payload,
    };
  }
  if (action.type === UPDATE_PAYSLIP_ERROR) {
    return {
      ...state,
      update_payslip_loading: false,
      update_payslip_error: true,
    };
  }

  // delete payslips
  if (action.type === DELETE_PAYSLIP_BEGIN) {
    return {
      ...state,
      delete_payslip_loading: true,
      delete_payslip_error: false,
    };
  }

  if (action.type === DELETE_PAYSLIP_SUCCESS) {
    return {
      ...state,
      delete_payslip_loading: false,
      delete_payslip_error: false,
    };
  }
  if (action.type === DELETE_PAYSLIP_ERROR) {
    return {
      ...state,
      delete_payslip_loading: false,
      delete_payslip_error: true,
    };
  }

  //single payslips
  if (action.type === GET_SINGLE_PAYSLIP_BEGIN) {
    return {
      ...state,
      single_payslip_loading: true,
      single_payslip_error: false,
    };
  }
  if (action.type === GET_SINGLE_PAYSLIP_SUCCESS) {
    return {
      ...state,
      single_payslip_loading: false,
      single_payslip: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PAYSLIP_ERROR) {
    return {
      ...state,
      single_payslip_loading: false,
      single_payslip_error: true,
    };
  }

  //single batch payslips
  if (action.type === GET_SINGLEBATCH_PAYSLIP_BEGIN) {
    return {
      ...state,
      singlebatch_payslip_loading: true,
      singlebatch_payslip_error: false,
    };
  }
  if (action.type === GET_SINGLEBATCH_PAYSLIP_SUCCESS) {
    return {
      ...state,
      singlebatch_payslip_loading: false,
      singlebatchpayslip: action.payload,
    };
  }
  if (action.type === GET_SINGLEBATCH_PAYSLIP_ERROR) {
    return {
      ...state,
      singlebatch_payslip_loading: false,
      singlebatch_payslip_error: true,
    };
  }

  // ------ payslip earnings
  // get payslip earning
  if (action.type === GET_PAYSLIPEARNINGS_BEGIN) {
    return { ...state, payslipearnings_loading: true };
  }
  if (action.type === GET_PAYSLIPEARNINGS_SUCCESS) {
    return {
      ...state,
      payslipearnings_loading: false,
      payslipearnings: action.payload,
    };
  }
  if (action.type === GET_PAYSLIPEARNINGS_ERROR) {
    return {
      ...state,
      payslipearnings_loading: false,
      payslipearnings_error: true,
    };
  }

  // add payslip earning
  if (action.type === ADD_PAYSLIPEARNING_BEGIN) {
    return { ...state, add_payslipearning_loading: true };
  }
  if (action.type === ADD_PAYSLIPEARNING_SUCCESS) {
    return {
      ...state,
      add_payslipearnings_loading: false,
      payslipearnings: action.payload,
    };
  }
  if (action.type === ADD_PAYSLIPEARNING_ERROR) {
    return {
      ...state,
      payslipearnings_loading: false,
      add_payslipearning_error: true,
    };
  }
  // update payslip earning
  if (action.type === UPDATE_PAYSLIPEARNING_BEGIN) {
    return { ...state, update_payslipearning_loading: true };
  }
  if (action.type === UPDATE_PAYSLIPEARNING_SUCCESS) {
    return {
      ...state,
      payslipearnings_loading: false,
      single_payslipearning: action.payload,
    };
  }
  if (action.type === UPDATE_PAYSLIPEARNING_ERROR) {
    return {
      ...state,
      update_payslipearning_loading: false,
      update_payslipearning_error: true,
    };
  }

  // delete payslip earning
  if (action.type === DELETE_PAYSLIPEARNING_BEGIN) {
    return {
      ...state,
      delete_payslipearning_loading: true,
      delete_payslipearning_error: false,
    };
  }

  if (action.type === DELETE_PAYSLIPEARNING_SUCCESS) {
    return {
      ...state,
      delete_payslipearning_loading: false,
      delete_payslipearning_error: false,
    };
  }
  if (action.type === DELETE_PAYSLIPEARNING_ERROR) {
    return {
      ...state,
      delete_payslipearning_loading: false,
      delete_payslipearning_error: true,
    };
  }

  //single payslip earning
  if (action.type === GET_SINGLE_PAYSLIPEARNING_BEGIN) {
    return {
      ...state,
      single_payslipearning_loading: true,
      single_payslipearning_error: false,
    };
  }
  if (action.type === GET_SINGLE_PAYSLIPEARNING_SUCCESS) {
    return {
      ...state,
      single_payslipearning_loading: false,
      single_payslipearning: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PAYSLIPEARNING_ERROR) {
    return {
      ...state,
      single_payslipearning_loading: false,
      single_payslipearning_error: true,
    };
  }

  // ..........payslip deductions
  // get payslip deduction
  if (action.type === GET_PAYSLIPDEDUCTIONS_BEGIN) {
    return { ...state, payslipdeductions_loading: true };
  }
  if (action.type === GET_PAYSLIPDEDUCTIONS_SUCCESS) {
    return {
      ...state,
      payslipdeductions_loading: false,
      payslipdeductions: action.payload,
    };
  }
  if (action.type === GET_PAYSLIPDEDUCTIONS_ERROR) {
    return {
      ...state,
      payslipdeductions_loading: false,
      payslipdeductions_error: true,
    };
  }

  // add payslip deduction
  if (action.type === ADD_PAYSLIPDEDUCTION_BEGIN) {
    return { ...state, add_payslipdeduction_loading: true };
  }
  if (action.type === ADD_PAYSLIPDEDUCTION_SUCCESS) {
    return {
      ...state,
      add_payslipdeductions_loading: false,
      payslipdeductions: action.payload,
    };
  }
  if (action.type === ADD_PAYSLIPDEDUCTION_ERROR) {
    return {
      ...state,
      payslipdeductions_loading: false,
      add_payslipdeduction_error: true,
    };
  }
  // update payslip deduction
  if (action.type === UPDATE_PAYSLIPDEDUCTION_BEGIN) {
    return { ...state, update_payslipdeduction_loading: true };
  }
  if (action.type === UPDATE_PAYSLIPDEDUCTION_SUCCESS) {
    return {
      ...state,
      payslipdeductions_loading: false,
      single_payslipdeduction: action.payload,
    };
  }
  if (action.type === UPDATE_PAYSLIPDEDUCTION_ERROR) {
    return {
      ...state,
      update_payslipdeduction_loading: false,
      update_payslipdeduction_error: true,
    };
  }

  // delete payslip deduction
  if (action.type === DELETE_PAYSLIPDEDUCTION_BEGIN) {
    return {
      ...state,
      delete_payslipdeduction_loading: true,
      delete_payslipdeduction_error: false,
    };
  }

  if (action.type === DELETE_PAYSLIPDEDUCTION_SUCCESS) {
    return {
      ...state,
      delete_payslipdeduction_loading: false,
      delete_payslipdeduction_error: false,
    };
  }
  if (action.type === DELETE_PAYSLIPDEDUCTION_ERROR) {
    return {
      ...state,
      delete_payslipdeduction_loading: false,
      delete_payslipdeduction_error: true,
    };
  }

  //single payslip deduction
  if (action.type === GET_SINGLE_PAYSLIPDEDUCTION_BEGIN) {
    return {
      ...state,
      single_payslipdeduction_loading: true,
      single_payslipdeduction_error: false,
    };
  }
  if (action.type === GET_SINGLE_PAYSLIPDEDUCTION_SUCCESS) {
    return {
      ...state,
      single_payslipdeduction_loading: false,
      single_payslipdeduction: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PAYSLIPDEDUCTION_ERROR) {
    return {
      ...state,
      single_payslipdeduction_loading: false,
      single_payslipdeduction_error: true,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default payslips_reducer;
