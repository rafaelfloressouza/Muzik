import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Tooltip from "./Tooltip";
import {
  IContainerProps,
  ISvgProps,
  ITextProps,
  ITooltipProps,
  Ordering,
} from "../../../utils/types";
import { Svg } from "./Svg";

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

export default function StandardButton({
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
        ref={buttonProps?.refEl ?? null}
        buttonProps={buttonProps}
        textProps={textProps}
        ordering={ordering}
        colGap={colGap}
        onClick={() => buttonProps?.onClick?.()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Svg
          svgProps={{
            ...svgProps,
            onClick: () => svgProps?.onClick?.(),
            fill:
              hovered && !noChangeColorSvg
                ? svgProps?.hoverFill ?? theme?.senary()
                : svgProps?.fill ?? theme?.quinary(),
          }}
        />
        {textProps?.text && <p className="btn-txt">{textProps?.text}</p>}
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
  height: ${(props) => props.buttonProps?.height ?? "auto"};
  background-color: ${(props) => props?.buttonProps?.bgColor};
  padding: ${(props) => props?.buttonProps?.padding};
  border-radius: ${(props) => props?.buttonProps?.borderRadius ?? "0"};
  color: ${(props) =>
    props?.buttonProps?.selected
      ? props?.buttonProps.selectedBgColor
      : props?.textProps?.color};
  font-size: ${(props) => props?.textProps?.size};
  font-weight: ${(props) => props?.textProps?.weight};
  box-shadow: ${(props) => props?.buttonProps?.boxShadow};
  transition: ease-in-out 0.1s;
  border: ${(props) => props?.buttonProps?.border};
  margin: ${(props) => props?.buttonProps?.margin};
  visibility: ${(props) => props?.buttonProps?.visibility};
  pointer-events: ${(props) => props.buttonProps?.pointerEvents};
  opacity: ${(props) => props.buttonProps?.opacity};
  white-space: nowrap;

  & .btn-txt {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background-color: ${(props) =>
      props.buttonProps?.hoverBgColor
        ? props.buttonProps?.hoverBgColor
        : props.buttonProps?.bgColor};
    color: ${(props) => props.textProps?.hoverColor};
    cursor: ${(props) => props?.buttonProps?.hoverCursor ?? "pointer"};
    transform: ${(props) =>
      props.buttonProps?.animate ? "scale(1.05)" : "none"};
    text-decoration: ${(props) => props.textProps?.hoverDecoration};
    border: ${(props) => props?.buttonProps?.hoverBorder};
  }
`;
