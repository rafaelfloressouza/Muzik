import { ReactElement } from "react";
import styled from "styled-components";
import { IContainerProps, ITextProps } from "../../../utils/types";

export interface IColumn {
  items?: ReactElement[];
  // columnProps?: IContainerProps;
  headerProps?: ITextProps;
}

type Props = {
  tableProps?: IContainerProps;
  rowProps?: IContainerProps;
  columnProps?: IContainerProps[];
  columns?: IColumn[];
  autoWidth?: boolean;
};

export default function Table({
  tableProps,
  rowProps,
  columnProps,
  columns = [],
  autoWidth = true,
}: Props): ReactElement {
  // Helpers
  const computeWidth = (columnProps: IContainerProps | null) => {
    console.log("columnProps.width: " + columnProps);

    if (!columnProps) return "100%";
    const doAutoWidth = autoWidth || !columnProps || !columnProps?.width;
    const padding: number = (columnProps?.padding as number) ?? 0;

    console.log("columnProps.width: " + columnProps?.width);

    if (doAutoWidth) {
      return (100 - columns.length * 2 * padding) / columns.length + "%";
    } else {
      return columnProps?.width;
    }
  };

  console.log(columnProps);

  return (
    <TableContainer tableProps={tableProps}>
      {columns.map((column: IColumn) => {
        return (
          <Row rowProps={rowProps}>
            {column.items?.map((el: ReactElement, idx: number) => (
              <>
                {idx === 0 && column.headerProps && (
                  <Header headerProps={column.headerProps}>
                    {column.headerProps?.text}
                  </Header>
                )}
                <Column
                  columnProps={{
                    ...(columnProps &&
                    columnProps[idx] &&
                    idx < columnProps.length
                      ? columnProps[idx]
                      : {}),
                    width: computeWidth(
                      !columnProps || idx >= columnProps?.length
                        ? null
                        : columnProps[idx]
                    ),
                  }}
                >
                  {el}
                </Column>
              </>
            ))}
          </Row>
        );
      })}
    </TableContainer>
  );
}

const TableContainer = styled.div<{ tableProps?: IContainerProps }>`
  display: flex;
  flex-direction: column;
  width: ${(props) =>
    props.tableProps?.width ??
    `${100 - ((props.tableProps?.padding ?? 0) as number)}%`};
  height: ${(props) => props.tableProps?.height};
  padding: ${(props) => props.tableProps?.padding};
  margin: ${(props) => props.tableProps?.margin};
`;

const Header = styled.p<{ headerProps?: ITextProps }>`
  display: block;
  color: ${(props) => props.headerProps?.color ?? "white"};
  font-size: ${(props) => props.headerProps?.size ?? "2rem"};
  margin: ${(props) => props.headerProps?.margin};
  font-weight: ${(props) => props.headerProps?.weight};
`;

const Row = styled.div<{
  rowProps?: IContainerProps;
}>`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.rowProps?.bgColor};
  transition: ease-in-out 0.1s;
  border-radius: ${(props) => props.rowProps?.borderRadius};

  &:hover {
    background-color: ${(props) => props.rowProps?.hoverBgColor};
  }
`;

const Column = styled.div<{ columnProps?: IContainerProps }>`
  display: flex;
  width: ${(props) => props.columnProps?.width};
  align-items: center;
  justify-content: ${(props) => props.columnProps?.justifyContent};
`;

export function Item({
  containerProps,
}: {
  containerProps?: IContainerProps;
}): ReactElement {
  return <ItemContainer containerProps={containerProps}>Hello</ItemContainer>;
}

const ItemContainer = styled.div<{ containerProps?: IContainerProps }>`
  display: block;
  padding: 2%;
`;
