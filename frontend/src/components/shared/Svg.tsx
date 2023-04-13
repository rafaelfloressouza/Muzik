import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

export interface ITooltipStyle {
  bgColor?: string;
  tooltip?: string;
  tooltipPlacement?:
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | undefined;
}

export interface ISvgStyle {
  fileUrl?: string;
  muiComponent?: OverridableComponent<SvgIconTypeMap<{}, "svg">> | undefined;
  width?: string;
  height?: string;
  borderRadius?: string;
  color?: string;
  hoverColor?: string;
  bgColor?: string;
  padding?: string;
  animate?: boolean;
}

export interface ILabelStyle {
  label?: string;
  fontSize?: string;
  isBold?: boolean;
  color?: string;
  hoverColor?: string;
}

type Props = {
  tooltipStyle?: ITooltipStyle;
  svgStyle?: ISvgStyle;
  labelStyle?: ILabelStyle;
  colSpace?: string;
  noChangeColorSvg?: boolean;
  selected?: boolean;
  onClick?: () => void;
  refEl?: React.MutableRefObject<HTMLDivElement | null>;
};

export default function Svg({
  tooltipStyle,
  svgStyle,
  labelStyle,
  colSpace = "0.8rem",
  noChangeColorSvg = false,
  selected = false,
  onClick,
  refEl,
}: Props): ReactElement {
  const SvgMuiComponent = svgStyle?.muiComponent;

  const [curLabelColor, setCurLabelColor] = useState(
    labelStyle?.color ?? "white"
  );
  const [curSvgColor, setCurSvgColor] = useState(svgStyle?.color ?? "white");

  // Helpers
  const getSvgColor = (): string => {
    if (selected) {
      return svgStyle?.hoverColor ?? "white";
    } else {
      return noChangeColorSvg ? svgStyle?.color ?? "white" : curSvgColor;
    }
  };

  return (
    <>
      {(svgStyle?.fileUrl || svgStyle?.muiComponent) &&
        !(svgStyle?.fileUrl && svgStyle?.muiComponent) && (
          <Tooltip
            title={tooltipStyle?.tooltip}
            placement={tooltipStyle?.tooltipPlacement}
            bgColor={tooltipStyle?.bgColor}
          >
            <SvgContainer
              ref={refEl}
              className="svg"
              svgWidth={svgStyle.width ?? "28px"}
              svgHeight={svgStyle.height ?? "28px"}
              svgBorderRadius={svgStyle.borderRadius ?? "0"}
              svgPadding={svgStyle.padding ?? "0"}
              animate={svgStyle?.animate ?? false}
              labelColor={
                selected ? svgStyle?.hoverColor ?? "white" : curLabelColor
              }
              svgColor={getSvgColor()}
              svgBgColor={svgStyle?.bgColor ?? "transparent"}
              labelFontSize={labelStyle?.fontSize ?? "0.8rem"}
              isLabelBold={labelStyle?.isBold ?? false}
              colSpace={colSpace}
              onMouseEnter={() => {
                setCurSvgColor(svgStyle?.hoverColor ?? "white");
                setCurLabelColor(labelStyle?.hoverColor ?? "white");
              }}
              onMouseLeave={() => {
                setCurSvgColor(svgStyle?.color ?? "white");
                setCurLabelColor(labelStyle?.color ?? "white");
              }}
              onMouseDown={() => setCurSvgColor(svgStyle?.bgColor ?? "white")}
              onMouseUp={() => getSvgColor()}
              onClick={onClick}
            >
              {svgStyle?.fileUrl && (
                <object className="file-svg" data={svgStyle.fileUrl} />
              )}
              {SvgMuiComponent && <SvgMuiComponent className="mui-svg" />}
              {labelStyle?.label && <span>{labelStyle?.label}</span>}
            </SvgContainer>
          </Tooltip>
        )}
    </>
  );
}

const SvgContainer = styled.div<{
  svgWidth: string;
  svgHeight: string;
  svgBorderRadius: string;
  svgColor: string;
  svgBgColor: string;
  svgPadding: string;
  animate: boolean;

  labelColor: string;
  labelFontSize: string;
  isLabelBold: boolean;

  colSpace: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${(props) => props.colSpace};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  & .file-svg {
    width: ${(props) => props.svgWidth};
    height: ${(props) => props.svgHeight};
    border-radius: ${(props) => props.svgBorderRadius};
    fill: ${(props) => props.svgColor};
    transition: ease-in-out 0.1s;
    background-color: ${(props) => props.svgBgColor};
    padding: ${(props) => props.svgPadding};

    &:hover {
      cursor: pointer;
    }
  }

  & .mui-svg {
    width: ${(props) => props.svgWidth};
    height: ${(props) => props.svgHeight};
    border-radius: ${(props) => props.svgBorderRadius};
    fill: ${(props) => props.svgColor};
    transition: ease-in-out 0.1s;
    background-color: ${(props) => props.svgBgColor};
    padding: ${(props) => props.svgPadding};

    &:hover {
      cursor: pointer;
      transform: ${(props) => (props.animate ? "scale(1.05)" : "none")};
    }
  }

  & span {
    color: ${(props) => props.labelColor};
    transition: ease-in-out 0.1s;
    font-size: ${(props) => props.labelFontSize};
    font-weight: ${(props) => (props.isLabelBold ? "bold" : "normal")};
  }
`;
