import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Tooltip from "../others/Tooltip";
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
  noChangeColorSvg?: boolean;
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
  noChangeColorSvg = false,
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Svg
          svgProps={{
            ...svgProps,
            fill:
              hovered && !noChangeColorSvg
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
  justify-content: ${(props) => props.buttonProps?.justifyContent};
  column-gap: ${(props) => props.colGap};
  width: ${(props) => props.buttonProps?.width ?? "auto"};
  height: ${(props) => props.buttonProps?.width ?? "auto"};
  background-color: ${(props) => props?.buttonProps?.bgColor};
  padding: ${(props) => props?.buttonProps?.padding};
  border-radius: ${(props) => props?.buttonProps?.borderRadius ?? "0"};
  color: ${(props) => props?.textProps?.color};
  font-size: ${(props) => props?.textProps?.size};
  font-weight: ${(props) => props?.textProps?.weight};
  box-shadow: ${(props) => props?.buttonProps?.boxShadow};
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

// Custom Svg

type SvgProps = {
  svgProps?: ISvgProps;
};

function Svg({
  svgProps = { selected: false, width: "25px", height: "25px" },
}: SvgProps): ReactElement {
  // Constants
  const SvgMuiComponent = Array.isArray(svgProps?.muiComponent)
    ? null
    : svgProps?.muiComponent;

  return (
    <>
      {(svgProps?.fileUrl || svgProps?.muiComponent) &&
        !(svgProps?.fileUrl && svgProps?.muiComponent) && (
          <SvgContainer
            className="svg"
            svgProps={svgProps}
            onClick={svgProps?.onClick}
          >
            {svgProps?.fileUrl && (
              <object
                className="file-svg"
                data={Array.isArray(svgProps.fileUrl) ? "" : svgProps.fileUrl}
              />
            )}
            {SvgMuiComponent && <SvgMuiComponent className="mui-svg" />}
          </SvgContainer>
        )}
    </>
  );
}

const SvgContainer = styled.div<{
  svgProps: ISvgProps;
}>`
  & .file-svg,
  .mui-svg {
    width: ${(props) => props.svgProps.width};
    height: ${(props) => props.svgProps.height};
    border-radius: ${(props) => props.svgProps.borderRadius};
    fill: ${(props) => props.svgProps.fill};
    transition: ease-in-out 0.1s;
    background-color: ${(props) => props.svgProps.bgColor};
    padding: ${(props) => props.svgProps?.padding};
    box-shadow: ${(props) => props.svgProps?.boxShadow};

    &:hover {
      cursor: pointer;
      fill: ${(props) => props.svgProps.hoverFill ?? props.svgProps?.fill};
      transform: ${(props) =>
        props.svgProps?.animate ? "scale(1.05)" : "none"};
    }
  }
`;

// Play Button

type PlayButtonProps = {
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
}: PlayButtonProps): ReactElement {
  const theme = useContext(ThemeContext);
  return (
    <Button
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
