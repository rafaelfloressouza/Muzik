import { ReactElement, useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styled from "styled-components";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function SearchbarLight(): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // State
  const [searchText, setSearchText] = useState("");

  return (
    <SearchbarContainer
      bgColor={theme?.senary() ?? ""}
      placeholderColor={theme?.quaternary(0.8) ?? ""}
      textColor={theme?.secondary() ?? ""}
    >
      <SearchRoundedIcon sx={{ color: theme?.secondary() }} />
      <input
        type="text"
        value={searchText}
        placeholder="What do you want to listen to?"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && (
        <CloseRoundedIcon
          sx={{ color: theme?.secondary() }}
          onClick={() => setSearchText("")}
        />
      )}
    </SearchbarContainer>
  );
}

const SearchbarContainer = styled.div<{
  bgColor: string;
  placeholderColor: string;
  textColor: string;
}>`
  display: flex;
  justify-content: space-between;
  column-gap: 0.5rem;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 25px;
  padding: 5px;
  width: 18.5vw;
  max-width: 360px;
  min-width: 240px;

  & svg {
    height: 30px;
    width: 30px;
  }

  & input {
    border: none;
    overflow: hidden;
    font-size: 0.8rem;
    color: ${(props) => props.textColor};
    width: 100%;
    border-radius: 30px;

    &::placeholder {
      font-size: 0.85rem;
      color: ${(props) => props.placeholderColor};
    }

    &:focus {
      outline: none;
    }
  }
`;
