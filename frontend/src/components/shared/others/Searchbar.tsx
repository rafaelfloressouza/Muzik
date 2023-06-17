import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { IContainerProps, ITextProps } from "../../../utils/types";
import SearchIcon from "@mui/icons-material/Search";
import * as Material from "@mui/material";
import { ThemeContext } from "../../../contexts/ThemeContext";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "../buttons/Button";

export default function SearchbarLight({
  onSearch,
}: {
  onSearch?: (searchTxt: string) => void;
}): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // State
  const [searchText, setSearchText] = useState("");

  return (
    <SearchbarContainer
      bgColor={theme?.secondary() ?? ""}
      placeholderColor={theme?.senary(0.3) ?? ""}
      textColor={theme?.senary() ?? ""}
    >
      <Button
        className="search-btn"
        buttonProps={{ pointerEvents: "none" }}
        svgProps={{
          muiComponent: SearchRoundedIcon,
          fill: theme?.senary(0.8),
          hoverFill: theme?.senary(),
          width: "25px",
          height: "25px",
        }}
      />
      <input
        type="text"
        value={searchText}
        placeholder="What do you want to listen to?"
        onChange={(e) => {
          setSearchText(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
      />
      <Button
        className="cancel-btn"
        buttonProps={{
          pointerEvents: searchText ? "auto" : "none",
          onClick: () => {
            setSearchText("");
            if (onSearch) onSearch("");
          },
        }}
        svgProps={{
          opacity: searchText ? "100%" : "0%",
          muiComponent: CloseRoundedIcon,
          fill: theme?.senary(),
        }}
      />
    </SearchbarContainer>
  );
}

const SearchbarContainer = styled.div<{
  bgColor: string;
  placeholderColor: string;
  textColor: string;
}>`
  position: relative;
  border-radius: 25px;
  border: 2px solid transparent;

  .search-btn {
    position: absolute;
    top: 9px;
    left: 10px;
  }

  .cancel-btn {
    position: absolute;
    top: 9px;
    right: 10px;
  }

  :focus-within {
    border: 2px solid white;
  }

  & input {
    border: none;
    overflow: hidden;
    font-size: 0.8rem;
    color: ${(props) => props.textColor};
    width: 100%;
    border-radius: 25px;
    height: 100%;
    background-color: ${(props) => props.bgColor};
    width: 16.8vw;
    max-width: 360px;
    min-width: 240px;
    padding: 14px 0;
    padding-left: 38px;
    font-weight: bold;

    &:hover {
      box-shadow: white 0px 0px 2px;
      background-color: rgb(255, 255, 255, 0.1);
    }

    &::placeholder {
      font-weight: normal;
      font-size: 0.85rem;
      color: ${(props) => props.placeholderColor};
    }
  }
`;

export function SearchbarDark({
  searchIn = "Playlist",
  width,
  inputWidth = 120,
  onSearch,
  onClickAway = true,
  expanded = false,
  expandLeft = true,
}: {
  searchIn?: string;
  width?: number;
  inputWidth?: number;
  onSearch?: (searchTxt: string) => void;
  onClickAway?: boolean;
  expanded?: boolean;
  expandLeft?: boolean;
}): ReactElement {
  // Content

  const [searchText, setSearchText] = useState("");
  const [containerWidth, setContainerWidth] = useState<number>(width ?? 0);

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
                if (onSearch) onSearch(ev.target.value);
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
