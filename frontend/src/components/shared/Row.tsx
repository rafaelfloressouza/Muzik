import { ReactElement } from "react";
import styled from "styled-components";
import { ITextStyle } from "../../utils/types";

type Props = {
  itemSep?: string;
  children?: ReactElement | ReactElement[];
  flexDir?: "row" | "column";
  justifyContent?: string;
  titleLeftStyle?: ITextStyle;
  titleRightStyle?: ITextStyle;
};

export default function Row({
  itemSep = "1.5rem",
  children,
  flexDir = "row",
  justifyContent = "space-between",
  titleLeftStyle,
  titleRightStyle,
}: Props): ReactElement {
  return (
    <RowContainer
      titleLeftStyle={titleLeftStyle}
      titleRightStyle={titleRightStyle}
    >
      {titleLeftStyle?.text && (
        <div className="title-container">
          <span className="title-left">{titleLeftStyle?.text}</span>
          {titleRightStyle?.text && (
            <span className="title-right">{titleRightStyle.text}</span>
          )}
        </div>
      )}
      <CRow itemSep={itemSep} justifyContent={justifyContent} flexDir={flexDir}>
        {children}
      </CRow>
    </RowContainer>
  );
}

const RowContainer = styled.div<{
  titleLeftStyle?: ITextStyle;
  titleRightStyle?: ITextStyle;
}>`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  width: 100%;

  & .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & .title-left {
      font-size: ${(props) => props.titleLeftStyle?.size ?? "1.4rem"};
      color: ${(props) => props.titleLeftStyle?.color ?? "white"};
      font-weight: bold;
    }

    & .title-right {
      color: ${(props) => props?.titleRightStyle?.color};
      font-size: ${(props) => props?.titleRightStyle?.size ?? "0.85rem"};
      font-weight: bold;
      transition: ease-in-out 0.1s;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const CRow = styled.div<{
  itemSep: string;
  justifyContent: string;
  flexDir: string;
}>`
  width: 100%;
  column-gap: ${(props) => (props.flexDir === "row" ? props.itemSep : "0")};
  row-gap: ${(props) => (props.flexDir === "column" ? props.itemSep : "0")};
  display: flex;
  flex-direction: ${(props) => props.flexDir};
  justify-content: ${(props) => props.justifyContent};
`;
