import { ReactElement } from "react";
import styled from "styled-components";
import { SearchbarDark } from "../others/Searchbar";
import Sorter, { ISorterItem } from "../others/Sorter";

export enum TitleType {
  Plain,
  WithShowAll,
  WithFilters,
}

type Props = {
  title?: string;
  onSearch?: (text: string) => void;
  onSorting?: (el: ISorterItem) => void;
  sorterCategories?: ISorterItem[];
  type?: TitleType;
};

export default function Title({
  title,
  onSearch,
  onSorting,
  sorterCategories = [],
  type = TitleType.Plain,
}: Props): ReactElement {
  return (
    <TitleContainer>
      {type === TitleType.Plain && <div className="title-left ">{title}</div>}
      {type === TitleType.WithShowAll && (
        <>
          <div className="title-left ">{title}</div>
          <div className="title-right">{"Show All"}</div>
        </>
      )}
      {type === TitleType.WithFilters && (
        <>
          <div className="title-left ">{title}</div>
          <div className="filterings">
            <SearchbarDark onSearch={onSearch} />
            <Sorter
              items={sorterCategories}
              showSortBy={false}
              onClick={onSorting}
            />
          </div>
        </>
      )}
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & .title-left {
    font-size: 1.4rem;
    color: rgb(var(--senary));
    font-weight: bold;
  }

  & .title-right {
    color: rgb(var(--quinary));
    font-size: 0.85rem;
    font-weight: bold;
    transition: ease-in-out 0.1s;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  & .filterings {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;
