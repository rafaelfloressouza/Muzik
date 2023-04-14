import { ReactElement } from "react";
import styled from "styled-components";
import { ISvgProps } from "../../../utils/types";

type Props = {
  svgProps?: ISvgProps;
  noChangeColorSvg?: boolean;
  refEl?: React.MutableRefObject<HTMLDivElement | null>;
};

export default function Svg({
  svgProps = { selected: false },
}: Props): ReactElement {
  // Constants
  const SvgMuiComponent = svgProps?.muiComponent;

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
              <object className="file-svg" data={svgProps.fileUrl} />
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
    padding: ${(props) => props.svgProps.padding};

    &:hover {
      cursor: pointer;
      fill: ${(props) => props.svgProps.hoverFill ?? props.svgProps?.fill};
      transform: ${(props) =>
        props.svgProps?.animate ? "scale(1.05)" : "none"};
    }
  }
`;
