import { atom } from "recoil";

export const loginLevelState = atom({
  key: "loginLevelState",
  default: {
    loginUserId: "",
    loginLevel: "Staff",
    loginUser: "",
    login: false,
    loginEmail: "",
    leave_bal: 0,
    siteallows_fee: 0,
    perdiem_fee: 0,
  },
});

export const payPeriodState = atom({
  key: "payPeriodState",
  default: "",
});

export const payPeriodEndMonthState = atom({
  key: "payPeriodEndMonthState",
  default: "",
});

export const payPeriodEmpIdState = atom({
  key: "payPeriodEmpIdStateState",
  default: "",
});

export const allowsDataState = atom({
  key: "allowsDataState",
  default: [],
});

export const allowsDataDetlsState = atom({
  key: "allowsDataDetlsState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const allowsPeriodState = atom({
  key: "allowsPeriodState",
  default: "",
});

export const empidState = atom({
  key: "empidState",
  default: "",
});

export const deptDataState = atom({
  key: "deptDataState",
  default: [],
});

export const payEarningDataState = atom({
  key: "payEarningDataState",
  default: [],
});

export const payDeductionDataState = atom({
  key: "payDeductionDataState",
  default: [],
});

export const payPeriodIdState = atom({
  key: "payPeriodIdState",
  default: "",
});

export const payrunState = atom({
  key: "payrunState",
  default: {
    payfreq: "",
    fromdate: null,
    todate: null,
    paydate: null,
    period: "",
    payrun: "",
    totalwages: 0,
    totaltap: 0,
    totalscp: 0,
    totalallows: 0,
    totaldeducts: 0,
    totalpayroll: 0,
  },
});

export const payrundataState = atom({
  key: "payrundataState",
  default: {
    payfreq: "",
    fromdate: null,
    todate: null,
    paydate: null,
    period: "",
  },
});

export const paydataState = atom({
  key: "paydataState",
  default: {},
});
