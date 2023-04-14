import { ReactElement, useContext } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Svg from "../others/Svg";
import { ThemeContext } from "../../../contexts/ThemeContext";

type Props = {
  label?: string;
  fontSize?: string;
  isBold?: boolean;
};

export default function PlayButton({
  label,
  fontSize,
  isBold,
}: Props): ReactElement {
  const theme = useContext(ThemeContext);
  return (
    <Svg
      svgProps={{
        muiComponent: PlayArrowIcon,
        borderRadius: "50%",
        bgColor: theme?.primary(),
        fill: theme?.septenary(),
        hoverFill: theme?.septenary(),
        height: "30px",
        width: "30px",
        padding: "9px",
        animate: true,
      }}
      // labelStyle={{
      //   text: label,
      //   size: fontSize,
      //   weight: isBold ? "bold" : "normal",
      // }}
      // colSpace="0.9rem"
    />
  );
}
