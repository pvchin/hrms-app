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
import { onleaves_url } from "../utils/constants";
import { fetchDepartmentsSelector } from "./data/selectordata";

const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "From Data",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "To Data",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
];

export const onleavesdatastate = atom({
  key: "onleavesdatastate",
  default: [],
});

const fetchOnLeavesDetails = selector({
  key: "onLeaveDetailsSelector",
  get: async ({ get }) => {
    try {
      const { data } = await axios.get(onleaves_url);
      const onleavesdata = data;

      return data;
    } catch (error) {
      throw error;
    }
  },
});

const OnLeavesView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userdata, setUserdata] = useState([]);
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  const onLeavesDetails = useRecoilValueLoadable(fetchOnLeavesDetails);
  const { state, contents } = onLeavesDetails;

  console.log(onLeavesDetails);
  if (onLeavesDetails.state === "hasError") {
    return <div> There is Internet connection problem! </div>;
  }

  if (state === "loading") {
      return <div>
          <h2>Loading....On Leaves</h2>
          </div>;
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
            title="Staffs On Leave within 30 Days"
            options={{
              search: false,
              toolbar: false,
            }}
            options={{
              filtering: false,
              search: false,
              toolbar: false,
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

export default OnLeavesView;
