import { ReactElement, useContext } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Svg from "./Svg";
import { ThemeContext } from "../../contexts/ThemeContext";

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
      svgStyle={{
        muiComponent: PlayArrowIcon,
        borderRadius: "50%",
        bgColor: theme?.primary(),
        color: theme?.septenary(),
        hoverColor: theme?.septenary(),
        height: "30px",
        width: "30px",
        padding: "9px",
        animate: true,
      }}
      labelStyle={{
        label: label,
        fontSize: fontSize,
        isBold: isBold,
      }}
      colSpace="0.9rem"
    />
  );
}
