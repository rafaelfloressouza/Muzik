import { ReactElement } from "react";
import styled from "styled-components";
import { IContainerStyle, ITextStyle } from "../../utils/types";

type Props = {
  buttonStyle: IContainerStyle;
  textStyle?: ITextStyle;
  onClick?: () => void;
};

export default function Button({
  buttonStyle,
  textStyle,
  onClick,
}: Props): ReactElement {
  return (
    <ButtonContainer
      buttonStyle={buttonStyle}
      textStyle={textStyle}
      onClick={onClick}
    >
      {textStyle?.text}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div<{
  buttonStyle: IContainerStyle;
  textStyle?: ITextStyle;
}>`
  width: ${(props) => props.buttonStyle?.width ?? "auto"};
  height: ${(props) => props.buttonStyle?.width ?? "auto"};
  background-color: ${(props) => props?.buttonStyle?.bgColor};
  padding: ${(props) => props?.buttonStyle?.padding};
  border-radius: ${(props) => props?.buttonStyle?.borderRadius ?? "0"};
  color: ${(props) => props?.textStyle?.color};
  font-size: ${(props) => props?.textStyle?.size};
  font-weight: ${(props) => props?.textStyle?.weight};

  &:hover {
    background-color: ${(props) =>
      props.buttonStyle.hoverBgColor
        ? props.buttonStyle.hoverBgColor
        : props.buttonStyle.bgColor};
    cursor: pointer;
    transform: scale(1.05);
  }
`;
