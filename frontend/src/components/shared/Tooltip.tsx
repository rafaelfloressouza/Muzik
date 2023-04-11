import { ReactElement } from "react";
import * as Material from "@mui/material";

type Props = {
  title?: string;
  placement?:
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start"
    | undefined;
  bgColor?: string;
  textColor?: string;
  children: ReactElement<any, any>;
};

export default function Tooltip({
  title = "",
  placement = "top",
  bgColor = "white",
  textColor = "white",
  children,
}: Props): ReactElement {
  return (
    <Material.Tooltip
      TransitionComponent={Material.Grow}
      title={title ?? ""}
      placement={placement}
      enterDelay={450}
      leaveDelay={0}
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            color: textColor,
            backgroundColor: bgColor,
            fontSize: "0.80rem",
            boxShadow: "0px 5px 50px 5px black",
            padding: "10px",
          },
        },
      }}
    >
      {children}
    </Material.Tooltip>
  );
}
