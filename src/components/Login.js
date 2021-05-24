import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Avatar,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

import img from "../assets/appsmithslogo.png";
import SigninForm from "./SigninForm";
import DashboardAdmin from "./DashboardAdmin";

const Login = ({ setLogin }) => {
  let history = useHistory();
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(true);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    return <DashboardAdmin />;
  };

  return (
    <div className={classes.app} style={{ backgroundColor: "lightcyan" }}>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Signin
      </Button> */}
      <Card className={classes.card}>
        <CardHeader
          //  avatar={
          //    <Avatar aria-label="recipe" className={classes.avatar}>
          //      L
          //    </Avatar>
          //  }
          className={classes.cardHeader}
          title="AppSmiths"
          titleTypographyProps={{ variant: "h3" }}
          subheader="Sutera Energy Solutions"
          subheaderTypographyProps={{ variant: "h4" }}
          style={{
            textAlign: "center",
            fontSize: 60,
            backgroundColor: "paleturquoise",
          }}
        />
        {/* <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        /> */}
        <Divider className={classes.divider} />
        <CardContent style={{ backgroundColor: "snow" }}>
          <Typography
            gutterBottom
            variant="h4"
            component="h3"
            className={classes.typography}
            style={{ textAlign: "center" }}
          >
            Login
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            component="h3"
            style={{ textAlign: "center" }}
          >
            Access to Admin dashboard
          </Typography>
          <SigninForm setLogin={setLogin} />
        </CardContent>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  app: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  card: {
    position: "relative",
    width: "400px",
    color: "red",
    //borderStyle: "solid",
    //borderColor: "blue",
    boxShadow:
      "rgba(255, 0, 0, 0.117647) 0px 1px 6px, rgba(255, 0, 0, 0.117647) 0px 1px 4px",
  },
  cardHeader: {
    display: "flex",
    paddingBottom: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  typography: {
    flexGrow: 1,
    align: "center",
  },
  media: {
    margin: "-70px auto 0",
    width: "80%",
    height: 300,
    borderRadius: "4px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
    zIndex: 1000,
    paddingTop: "56.25%",
  },
  divider: {
    // Theme Color, or use css color in quote
    background: theme.palette.divider,
    padding: 4,
  },
}));

export default Login;
