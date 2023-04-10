import { ReactElement, useState } from "react";
import { text } from "stream/consumers";
import styled from "styled-components";

export interface IElement {
  id: string | number;
  name: string;
}

type Props = {
  elements: IElement[];
  textColor: string;
  bgColor: string;
  bgHoverColor: string;
  bgColorSelected: string;
  onClick: (element: IElement) => void;
};

export default function ButtonGroup({
  elements,
  textColor,
  bgColor,
  bgHoverColor,
  bgColorSelected,
  onClick,
}: Props): ReactElement {
  const [selectedElId, setSelectedElId] = useState<string | number | null>(
    elements && elements.length > 0 ? elements[0].id : null
  );

  // Handlers
  const buttonClick = (el: IElement) => {
    setSelectedElId(el.id);
    onClick(el);
  };

  return (
    <ButtonGroupContainer className="btn-group">
      {elements.map((el: IElement) => {
        return (
          <Button
            key={el.id}
            textColor={textColor}
            bgColor={selectedElId === el.id ? bgColorSelected : bgColor}
            bgHoverColor={
              selectedElId == el.id ? bgColorSelected : bgHoverColor
            }
            onClick={() => buttonClick(el)}
          >
            {el.name}
          </Button>
        );
      })}
    </ButtonGroupContainer>
  );
}

const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  align-items: center;
`;

const Button = styled.div<{
  textColor: string;
  bgColor: string;
  bgHoverColor: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  font-size: 0.78rem;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  color: ${(props) => props.textColor};
  margin-right: 2.2%;
  transition: none;

  &:hover {
    background-color: ${(props) => props.bgHoverColor};
    cursor: pointer;
  }
`;
