import { ReactElement } from "react";
import styled from "styled-components";

type Props = {
  fileUrl: string;
  width?: string;
  height?: string;
  borderRadius?: string;
};

export default function Svg({
  fileUrl,
  width = "28px",
  height = "28px",
  borderRadius = "0",
}: Props): ReactElement {
  return (
    <SvgContainer
      data={fileUrl}
      width={width}
      height={height}
      borderRadius={borderRadius}
    />
  );
}

const SvgContainer = styled.object<{
  width: string;
  height: string;
  borderRadius: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  padding: 2px;

  &:hover {
    cursor: pointer;
  }
`;
