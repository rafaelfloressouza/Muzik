import { ReactElement, useContext, useState } from "react";
import * as Material from "@mui/material";
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = {
  width?: string;
};

export default function Slider({ width = "100%" }: Props): ReactElement {
  const theme = useContext(ThemeContext);
  const [trackColor, setTrackColor] = useState(theme?.senary());
  const [thumbColor, setThumbColor] = useState("transparent");

  return (
    <Material.Slider
      onMouseEnter={() => {
        setTrackColor(theme?.primary() ?? "");
        setThumbColor(theme?.senary() ?? "");
      }}
      onMouseLeave={() => {
        setTrackColor(theme?.senary() ?? "");
        setThumbColor("transparent");
      }}
      sx={{
        width: width,
        color: theme?.quinary(),
        height: 4,

        "& .MuiSlider-track": {
          border: "none",
          backgroundColor: trackColor,
        },

        "& .MuiSlider-thumb": {
          height: 12,
          width: 12,
          backgroundColor: thumbColor,

          "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "none",
            cursor: "default",
          },

          "&:before": {
            display: "none",
          },
        },
      }}
    />
  );
}
