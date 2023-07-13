import { ReactElement, useContext } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ThemeContext } from "../../../contexts/ThemeContext";
import StandardButton from "./StandardButton";
import { IContainerProps, ISvgProps, ITextProps } from "../../../utils/types";

type Props = {
  buttonProps?: IContainerProps;
  textProps?: ITextProps;
  svgProps?: ISvgProps;
};

export function PlayButton({
  svgProps = {
    muiComponent: PlayArrowIcon,
    height: "32px",
    width: "32px",
    padding: "8px",
    animate: true,
    borderRadius: "50%",
    boxShadow: "0px 5px 5px 1px rgb(0, 0, 0, 0.2)",
  },
  textProps,
}: Props): ReactElement {
  const theme = useContext(ThemeContext);
  return (
    <StandardButton
      svgProps={{
        ...svgProps,
        muiComponent: PlayArrowIcon,
        fill: theme?.septenary(),
        hoverFill: theme?.septenary(),
        bgColor: theme?.primary(),
      }}
      textProps={{
        text: textProps?.text,
        color: theme?.senary(),
        size: "1.3rem",
        weight: "bold",
      }}
    />
  );
}
