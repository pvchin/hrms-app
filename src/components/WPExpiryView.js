import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import {
  atom,
  selector,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
} from "recoil";
// import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// import { departmentsSelector } from "../helpers/Recoilhelpers";
import { wpexpiry_url } from "../utils/constants";
import { fetchDepartmentsSelector } from "./data/selectordata";

const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "Work Permit No",
    field: "workpermitno",
    editable: "never",
  },
  {
    title: "Work Permit Expiry",
    field: "workpermit_expirydate",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
];

export const onleavesdatastate = atom({
  key: "onleavesdatastate",
  default: [],
});

const fetchWPExpiryDetails = selector({
  key: "wpExpiryDetailsSelector",
  get: async ({ get }) => {
    try {
      const { data } = await axios.get(wpexpiry_url);
      const wpexpirydata = data;

      return data;
    } catch (error) {
      throw error;
    }
  },
});

const WPExpiryView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userdata, setUserdata] = useState([]);
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  const wpExpiryDetails = useRecoilValueLoadable(fetchWPExpiryDetails);
  const { state, contents } = wpExpiryDetails;

  console.log(wpExpiryDetails);
  if (wpExpiryDetails.state === "hasError") {
    return <div> There is Internet connection problem! </div>;
  }

  if (state === "loading") {
    return (
      <div>
        <h2>Loading....WP Expiry</h2>
      </div>
    );
  }

  if (state === "hasValue") {
    const editable = contents.map((r) => {
      return { ...r };
    });
    return (
      <div className={classes.root}>
        <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
          <MaterialTable
            columns={columns}
            data={editable}
            title="Work Permit Expiry in 90 Days"
            options={{
              filtering: false,
              search: false,
              toolbar: false,
              exportButton: true,
              headerStyle: {
                backgroundColor: "orange",
                color: "primary",
              },
              showTitle: false,
            }}
          />
        </div>
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

export default WPExpiryView;
