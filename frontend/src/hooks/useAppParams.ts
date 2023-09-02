import { AppContext } from "../contexts/AppContext";
import React from "react";

export default function useAppParams() {
  const appContext = React.useContext(AppContext);
  return { ...appContext };
}
