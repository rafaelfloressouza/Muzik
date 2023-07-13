import { ReactElement } from "react";
import { ISvgProps } from "../../../utils/types";
import styled from "styled-components";

type Props = {
  svgProps?: ISvgProps;
};

export function Svg({
  svgProps = { selected: false, width: "25px", height: "25px" },
}: Props): ReactElement {
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
            onClick={() => svgProps?.onClick?.()}
          >
            {svgProps?.fileUrl && (
              <object
                onClick={() => svgProps?.onClick?.()}
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
  display: flex;
  & .file-svg,
  .mui-svg {
    width: ${(props) => props.svgProps.width};
    height: ${(props) => props.svgProps.height};
    border-radius: ${(props) => props.svgProps.borderRadius};
    fill: ${(props) =>
      props?.svgProps?.selected
        ? props.svgProps.hoverFill
        : props.svgProps.fill};
    transition: ease-in-out 0.1s;
    background-color: ${(props) => props.svgProps.bgColor};
    padding: ${(props) => props.svgProps?.padding};
    box-shadow: ${(props) => props.svgProps?.boxShadow};
    opacity: ${(props) => props.svgProps?.opacity};

    &:hover {
      fill: ${(props) => props.svgProps.hoverFill ?? props.svgProps?.fill};
      transform: ${(props) =>
        props.svgProps?.animate ? "scale(1.05)" : "none"};
      cursor: ${(props) => props.svgProps.hoverCursor};
    }
  }
`;
