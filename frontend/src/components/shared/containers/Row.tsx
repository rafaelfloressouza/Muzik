import { ReactElement } from "react";
import styled from "styled-components";
import { ITextProps } from "../../../utils/types";

// https://travishorn.com/responsive-grid-in-2-minutes-with-css-grid-layout-4842a41420fe
type Props = {
  itemSep?: string;
  children?: ReactElement | ReactElement[];
  flexDir?: "row" | "column";
  justifyContent?: string;
  titleLeftProps?: ITextProps;
  titleRightProps?: ITextProps;
};

export default function Row({
  itemSep = "1.5rem",
  children,
  flexDir = "row",
  justifyContent = "space-between",
}: Props): ReactElement {
  return (
    <CRow itemSep={itemSep} justifyContent={justifyContent} flexDir={flexDir}>
      {children}
    </CRow>
  );
}

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
