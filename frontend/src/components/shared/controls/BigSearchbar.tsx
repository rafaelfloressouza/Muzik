import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "./StandardButton";

type Props = {
  onSearch?: (searchTxt: string) => void;
};

export function BigSearchBar({ onSearch }: Props): ReactElement {
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
          onSearch?.(e.target.value);
        }}
      />
      <Button
        className="cancel-btn"
        buttonProps={{
          pointerEvents: searchText ? "auto" : "none",
          onClick: () => {
            setSearchText("");
            onSearch?.("");
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
