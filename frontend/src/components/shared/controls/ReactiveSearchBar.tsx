import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { IContainerProps, ITextProps } from "../../../utils/types";
import SearchIcon from "@mui/icons-material/Search";
import * as Material from "@mui/material";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  searchIn?: string;
  width?: number;
  inputWidth?: number;
  onSearch?: (searchTxt: string) => void;
  onClickAway?: boolean;
  expanded?: boolean;
  expandLeft?: boolean;
};

export function ReactiveSearchBar({
  searchIn = "Playlist",
  width = 0,
  inputWidth = 120,
  onClickAway = true,
  expanded = false,
  expandLeft = true,
  ...props
}: Props): ReactElement {
  // Content

  const [searchText, setSearchText] = useState("");
  const [containerWidth, setContainerWidth] = useState<number>(width);

  // Contexts
  const theme = useContext(ThemeContext);

  return (
    <>
      <Material.ClickAwayListener
        onClickAway={() => {
          if (onClickAway) setContainerWidth(0);
          setSearchText("");
        }}
      >
        <SearchbarDarkContainer
          searchbarProps={{
            width: containerWidth + "px",
            bgColor: theme?.senary(0.1),
          }}
          textProps={{
            color: theme?.quinary(),
          }}
          expanded={expanded}
          exapandLeft={expandLeft}
          inputWidth={inputWidth}
        >
          <div>
            <SearchIcon sx={{ color: theme?.quinary() ?? "" }} id="left-btn" />
            <input
              type={"text"}
              value={searchText}
              placeholder={`Search in ${searchIn}`}
              onChange={(ev) => {
                setSearchText(ev.target.value);
                props.onSearch?.(ev.target.value);
              }}
            />
            <CloseRoundedIcon
              sx={{
                color: theme?.quinary() ?? "",
                zIndex: "400",
                opacity: searchText.length > 0 ? 1 : 0,
              }}
              onClick={() => setSearchText("")}
            />
          </div>
          <SearchIcon
            sx={{
              color: theme?.quinary() ?? "",
              borderRadius: "50%",
              padding: "4px",
              transition: "ease-in-out 0.2s",
              zIndex: "200",
              opacity: containerWidth === 0 ? 1 : 0,
              "&:hover": {
                backgroundColor: theme?.senary(0.1),
                cursor: "pointer",
              },
            }}
            id="right-btn"
            onClick={() => setContainerWidth(inputWidth + 60)}
          />
        </SearchbarDarkContainer>
      </Material.ClickAwayListener>
    </>
  );
}

const SearchbarDarkContainer = styled.div<{
  searchbarProps: IContainerProps;
  textProps: ITextProps;
  expanded: boolean;
  exapandLeft: boolean;
  inputWidth: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.exapandLeft ? "right" : "left")};
  width: ${(props) => (props.expanded ? props.searchbarProps?.width : "180px")};
  position: relative;

  & div {
    display: flex;
    align-items: center;
    column-gap: 5px;
    border-radius: 5px;
    position: ${(props) => (props.expanded ? "relative" : "absolute")};
    width: ${(props) => props.searchbarProps?.width};
    opacity: ${(props) => (props.searchbarProps?.width !== "0px" ? 1 : 0)};
    transition: linear 0.2s;
    padding: 5px;
    background-color: ${(props) => props.searchbarProps.bgColor};
    overflow: hidden;
  }

  & input {
    background-color: transparent;
    border: none;
    width: ${(props) =>
      props.expanded
        ? `calc(${props.searchbarProps.width} - 60px)`
        : `${props.inputWidth}px`};
    font-size: 0.75rem;
    font-weight: bold;
    color: ${(props) => props.textProps?.color};

    &::placeholder {
      color: ${(props) => props.textProps?.color};
      font-size: 0.75rem;
      font-weight: bold;
    }

    &:focus {
      outline: none;
    }
  }
`;
