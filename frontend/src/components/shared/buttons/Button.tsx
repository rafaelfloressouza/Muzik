import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Tooltip from "../others/Tooltip";
import Svg from "../others/Svg";
import {
  IContainerProps,
  ISvgProps,
  ITextProps,
  ITooltipProps,
  Ordering,
} from "../../../utils/types";

type Props = {
  buttonProps?: IContainerProps;
  textProps?: ITextProps;
  svgProps?: ISvgProps;
  tooltipProps?: ITooltipProps;
  ordering?: Ordering;
  colGap?: string;
  className?: string;
  id?: string;
};

export default function Button({
  buttonProps,
  textProps,
  svgProps,
  tooltipProps,
  ordering = Ordering.BeforeText,
  colGap = "12px",
  className = "",
  id = "",
}: Props): ReactElement {
  const [hovered, setHovered] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  return (
    <Tooltip tooltipProps={tooltipProps}>
      <ButtonContainer
        id={id}
        className={`${className} btn`}
        buttonProps={buttonProps}
        textProps={textProps}
        ordering={ordering}
        colGap={colGap}
        onClick={buttonProps?.onClick}
        onMouseEnter={() => {
          setHovered(true);
          console.log("hovered");
        }}
        onMouseLeave={() => {
          setHovered(false);
          console.log("not hovered");
        }}
      >
        <Svg
          svgProps={{
            ...svgProps,
            fill: hovered
              ? svgProps?.hoverFill ?? theme?.senary()
              : svgProps?.fill ?? theme?.quinary(),
          }}
        />
        {textProps?.text}
      </ButtonContainer>
    </Tooltip>
  );
}

const ButtonContainer = styled.div<{
  buttonProps?: IContainerProps;
  textProps?: ITextProps;
  ordering: Ordering;
  colGap: string;
}>`
  display: flex;
  flex-direction: ${(props) =>
    props.ordering === Ordering.BeforeText ? "row" : "row-reverse"};
  align-items: center;
  column-gap: ${(props) => props.colGap};
  width: ${(props) => props.buttonProps?.width ?? "auto"};
  height: ${(props) => props.buttonProps?.width ?? "auto"};
  background-color: ${(props) => props?.buttonProps?.bgColor};
  padding: ${(props) => props?.buttonProps?.padding};
  border-radius: ${(props) => props?.buttonProps?.borderRadius ?? "0"};
  color: ${(props) => props?.textProps?.color};
  font-size: ${(props) => props?.textProps?.size};
  font-weight: ${(props) => props?.textProps?.weight};
  transition: ease-in-out 0.1s;

  &:hover {
    background-color: ${(props) =>
      props.buttonProps?.hoverBgColor
        ? props.buttonProps?.hoverBgColor
        : props.buttonProps?.bgColor};
    color: ${(props) => props.textProps?.hoverColor};
    cursor: pointer;
    transform: ${(props) =>
      props.buttonProps?.animate ? "scale(1.05)" : "none"};
  }
`;

type PlayButtonProps = {
  buttonProps: IContainerProps;
  textProps: ITextProps;
  svgProps: ISvgProps;
};

export function PlayButton({
  buttonProps = {
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    padding: "9px",
    animate: true,
  },
  svgProps = {
    muiComponent: PlayArrowIcon,
  },
}: PlayButtonProps): ReactElement {
  const theme = useContext(ThemeContext);
  return (
    <Button
      buttonProps={{ bgColor: theme?.primary(), ...buttonProps }}
      svgProps={{
        muiComponent: PlayArrowIcon,
        fill: theme?.septenary(),
        hoverFill: theme?.septenary(),
        ...svgProps,
      }}
    />
  );
}
