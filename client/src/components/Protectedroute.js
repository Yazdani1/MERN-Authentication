import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import Nav from "../Nav";
import Dashboard from "./dashboard/Dashboard";

function ProtectedRoute(props) {
  const history = useHistory();

  let Cmprops = props.procomp;

  useEffect(() => {
    if (!localStorage.getItem("tokenLogin")) {
      history.push("/signin");
    } else {
      history.push("/");
    }
  }, []);
  return (
    <div>
      <Nav />
      <Cmprops />
      <Dashboard/>

    </div>
  );
}
export default ProtectedRoute;
