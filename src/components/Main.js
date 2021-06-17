import React, { useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import LoginForm from "./LoginForm";
import DashboardMain from "./DashboardMain";
import DashboardStaff from "./DashboardStaff";
import DashboardAdmin from "./DashboardAdmin";
import DashboardAdminManager from "./DashboardAdminManager";
import DashboardManager from "./DashboardManager";
import { loginLevelState } from "./data/atomdata";

const Main = () => {
  
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

  const SwitchCase = () => {
    //console.log(loginLevel);
    switch (loginLevel.loginLevel) {
      case "Staff":
        return <DashboardStaff />;
      case "Admin":
        return <DashboardAdmin />;
      case "AdminManager":
        return <DashboardAdminManager />;
      case "Manager":
        return <DashboardManager />;
      default:
        return "You are not authorised user!";
    }
  };

  if (!loginLevel.login) {
    return <LoginForm />;
  }
  return (
    <div>
      <SwitchCase />
    </div>
  );
};

export default Main;
