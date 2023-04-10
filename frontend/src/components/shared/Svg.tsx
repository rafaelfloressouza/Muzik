import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactElement, useState } from "react";
import styled from "styled-components";

type Props = {
  svgFileUrl?: string;
  svgMui?: OverridableComponent<SvgIconTypeMap<{}, "svg">> | undefined;
  svgWidth?: string;
  svgHeight?: string;
  svgBorderRadius?: string;
  label?: string;
  colSpace?: string;
  color?: string;
  hoverColor?: string;
  noChangeColorSvg?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export default function Svg({
  svgFileUrl,
  svgMui,
  svgWidth = "28px",
  svgHeight = "28px",
  svgBorderRadius = "0",
  label = "",
  colSpace = "0.8rem",
  color = "white",
  hoverColor = "white",
  noChangeColorSvg = false,
  selected = false,
  onClick,
}: Props): ReactElement {
  const SvgMuiComponent = svgMui;

  const [curColor, setCurColor] = useState(color);

  // Helpers
  const getSvgColor = (): string => {
    if (selected) {
      return hoverColor;
    } else {
      return noChangeColorSvg ? color : curColor;
    }
  };

  return (
    <>
      {(svgFileUrl || svgMui) && !(svgFileUrl && svgMui) && (
        <SvgContainer
          className="svg"
          width={svgWidth}
          height={svgHeight}
          borderRadius={svgBorderRadius}
          textColor={selected ? hoverColor : curColor}
          svgColor={getSvgColor()}
          colSpace={colSpace}
          onMouseEnter={() => setCurColor(hoverColor)}
          onMouseLeave={() => setCurColor(color)}
          onClick={onClick}
        >
          {svgFileUrl && <object className="file-svg" data={svgFileUrl} />}
          {SvgMuiComponent && <SvgMuiComponent className="mui-svg" />}
          {label && <span>{label}</span>}
        </SvgContainer>
      )}
    </>
  );
}

const SvgContainer = styled.div<{
  width: string;
  height: string;
  borderRadius: string;
  textColor: string;
  svgColor: string;
  colSpace: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${(props) => props.colSpace};

  &:hover {
    cursor: pointer;
  }

  & .file-svg {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: ${(props) => props.borderRadius};
    fill: ${(props) => props.svgColor};

    &:hover {
      cursor: pointer;
    }
  }

  & .mui-svg {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: ${(props) => props.borderRadius};
    fill: ${(props) => props.svgColor};
    transition: ease-in-out 0.1s;

    &:hover {
      cursor: pointer;
    }
  }

  & span {
    color: ${(props) => props.textColor};
    transition: ease-in-out 0.1s;
  }
`;
