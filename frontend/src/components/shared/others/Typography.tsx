import { ReactElement } from "react";
import styled from "styled-components";
import { IContainerProps, ITextProps } from "../../../utils/types";

type Props = {
  containerProps?: IContainerProps;
  textProps?: ITextProps;
};

export default function Typography({
  containerProps,
  textProps,
}: Props): ReactElement {
  return (
    <TypographyContainer
      containerProps={containerProps}
      textProps={textProps}
      onClick={() => {
        if (containerProps?.onClick) containerProps?.onClick();
      }}
    >
      <p>{textProps?.text}</p>
    </TypographyContainer>
  );
}

const TypographyContainer = styled.div<{
  containerProps?: IContainerProps;
  textProps?: ITextProps;
}>`
  display: flex;
  width: ${(props) => props.containerProps?.width};
  height: ${(props) => props.containerProps?.height};
  padding: ${(props) => props.containerProps?.padding ?? 0};
  margin: ${(props) => props.containerProps?.margin ?? 0};
  justify-content: left;

  & p {
    color: ${(props) => props.textProps?.color};
    font-size: ${(props) => props.textProps?.size};
    font-weight: ${(props) => props.textProps?.weight};
    /* margin: ${(props) => props.textProps?.margin ?? 0}; */
    padding: 0;
    text-overflow: ellipsis;

    &:hover {
      color: ${(props) => props.textProps?.hoverColor};
      text-decoration: ${(props) => props.textProps?.hoverDecoration};
      cursor: ${(props) => props.textProps?.hoverCursor};
    }
  }
`;
