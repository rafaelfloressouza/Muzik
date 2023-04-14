import { ReactElement, useContext } from "react";
import * as Material from "@mui/material";
import { ITooltipProps } from "../../../utils/types";
import { ThemeContext } from "../../../contexts/ThemeContext";

type Props = {
  tooltipProps?: ITooltipProps;
  children: ReactElement<any, any>;
};

export default function Tooltip({
  tooltipProps = {
    textStyle: { color: "white", text: "" },
    placement: "top",
  },
  children,
}: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  return (
    <Material.Tooltip
      TransitionComponent={Material.Grow}
      title={tooltipProps?.textStyle?.text}
      placement={tooltipProps?.placement}
      enterDelay={700}
      leaveDelay={0}
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            color: tooltipProps?.textStyle?.color,
            backgroundColor:
              tooltipProps?.containerStyle?.bgColor ??
              theme?.secondary() ??
              "white",
            fontSize: "0.80rem",
            boxShadow: "0px 5px 20px 1px rgb(0,0,0, 0.2)",
            padding: "10px",
          },
        },
      }}
    >
      {children}
    </Material.Tooltip>
  );
}
