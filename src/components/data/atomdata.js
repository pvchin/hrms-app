import { atom } from "recoil";

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
