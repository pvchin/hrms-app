import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
import DashboardMain from "./components/DashboardMain";
import Main from "./components/Main"

const App = () => {
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <React.Suspense fallback={<h1>Loading profile...</h1>}>
          {/* <DashboardMain /> */}
          <Main />
        </React.Suspense>
      </div>
      <Switch checked={darkState} onChange={handleThemeChange} />
    </ThemeProvider>
  );
};

export default App;
