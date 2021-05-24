import React, { useState } from "react";
import DashboardAdmin from "./components/DashboardAdmin";
import Login from "../src/components/Login";
import ModalDialog from "../src/components/ModalDialog";
import SigninForm from "../src/components/SigninForm";

const App = () => {
  const [login, setLogin] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setLogin(true);
  };

  return (
    <div>
      <SigninForm />
    </div>
  );
};

export default App;
