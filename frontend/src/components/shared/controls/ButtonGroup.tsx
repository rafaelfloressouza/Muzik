import { ReactElement, useState } from "react";
import styled from "styled-components";
import { IContainerProps, ITextProps } from "../../../utils/types";

export interface IButtonProps {
  id: string | number;
  name: string;
  buttonProps?: IContainerProps;
  textProps?: ITextProps;
}

type Props = {
  containerProps?: IContainerProps;
  elements: IButtonProps[];
};

export default function ButtonGroup({
  containerProps,
  elements,
}: Props): ReactElement {
  const [selectedElId, setSelectedElId] = useState<string | number | null>(
    elements && elements.length > 0 ? elements[0].id : null
  );

  // Handlers
  const buttonClick = (el: IButtonProps) => {
    setSelectedElId(el.id);
    if (el?.buttonProps?.onClick) el?.buttonProps?.onClick();
  };

  return (
    <ButtonGroupContainer className="btn-group" containerProps={containerProps}>
      {elements.map((el: IButtonProps) => {
        return (
          <Button
            key={el.id}
            buttonProps={{
              ...el.buttonProps,
              selected: selectedElId !== el.id,
            }}
            textProps={el.textProps}
            onClick={() => buttonClick(el)}
          >
            {el.name}
          </Button>
        );
      })}
    </ButtonGroupContainer>
  );
}

const ButtonGroupContainer = styled.div<{ containerProps?: IContainerProps }>`
  display: flex;
  flex-direction: row;
  align-items: left;
  background-color: ${(props) => props.containerProps?.bgColor};
  margin: ${(props) => props.containerProps?.margin};
  padding: ${(props) => props.containerProps?.padding};
`;

const Button = styled.div<{
  buttonProps?: IContainerProps;
  textProps?: ITextProps;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.buttonProps?.padding ?? "14px 16px"};
  font-size: ${(props) => props.textProps?.size ?? "0.78rem"};
  font-weight: ${(props) => props.textProps?.weight ?? "bold"};
  background-color: ${(props) =>
    props?.buttonProps?.selected
      ? props.buttonProps?.bgColor
      : props.buttonProps?.selectedBgColor};
  border-radius: ${(props) => props.buttonProps?.borderRadius ?? "5px"};
  color: ${(props) =>
    !props?.buttonProps?.selected
      ? props.textProps?.selectedColor
      : props.textProps?.color};
  margin: ${(props) => props.buttonProps?.margin};
  transition: none;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) =>
      !props?.buttonProps?.selected
        ? props.buttonProps?.selectedBgColor
        : props.buttonProps?.hoverBgColor};
    cursor: pointer;
  }
`;
