import { ReactElement } from "react";
import * as Material from "@mui/material";

export default function ButtonGroup(): ReactElement {
  return (
    <Material.ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Material.Button>One</Material.Button>
      <Material.Button>Two</Material.Button>
      <Material.Button>Three</Material.Button>
    </Material.ButtonGroup>
  );
}
