import { ReactElement, useContext } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ThemeContext } from "../contexts/ThemeContext";

type Props = {
  width: string;
};

export default function Sidebar({ width }: Props): ReactElement {
  const theme = useContext(ThemeContext);

  return (
    <SidebarContainer width={width}>
      <TopContainer
        color={theme?.quinary() ?? ""}
        hoverColor={theme?.senary() ?? ""}
      >
        <MoreHorizIcon sx={{ color: theme?.senary() }} onClick={() => {}} />
        <div className="top-buttons">
          <div className="btn-pair">
            <HomeRoundedIcon />
            <span>Home</span>
          </div>
          <div className="btn-pair">
            <SearchOutlinedIcon />
            <span>Search</span>
          </div>
          <div className="btn-pair">
            <LibraryBooksOutlinedIcon />
            <span>Your Library</span>
          </div>
        </div>
        <div className="bottom-buttons">
          <div className="btn-pair">
            <AddBoxIcon />
            <span>Create Playlist</span>
          </div>
          <div className="btn-pair">
            <LibraryBooksOutlinedIcon />
            <span>Liked Songs</span>
          </div>
        </div>
      </TopContainer>
      <Divider color={theme?.secondary() ?? ""} />
      <BottomContainer
        color={theme?.quinary() ?? ""}
        hoverColor={theme?.senary() ?? ""}
      >
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
        <p>Test5</p>
        <p>Test5</p>
        <p>Test</p>
        <p>Test2</p>
      </BottomContainer>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  background-color: rgb(0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  font-size: 0.85rem;
`;

const TopContainer = styled.div<{ color: string; hoverColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 260px;
  padding: 2% 10%;
  & .btn-pair {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${(props) => props.color};
    transition: ease-in-out 0.4s;
    margin-bottom: 10px;
    column-gap: 0.8rem;

    &:hover {
      color: ${(props) => props.hoverColor};
      cursor: pointer;
    }
  }

  & svg {
    color: ${(props) => props.color};
    width: 28px;
    height: 28px;
    transition: ease-in-out 0.4s;

    &:hover {
      color: ${(props) => props.hoverColor};
    }
  }
`;

const Divider = styled.div<{ color: string }>`
  width: 80%;
  height: 10px;
  border-top: ${(props) => `1px solid ${props.color}`};
  background-color: transparent;
  margin-left: auto;
  margin-right: auto;
`;

const BottomContainer = styled.div<{ color: string; hoverColor: string }>`
  height: calc(100% - 260px);
  overflow-y: hidden;
  font-weight: normal;
  font-size: 0.85rem;
  color: ${(props) => props.color};
  padding: 0 10%;

  &:hover {
    overflow-y: auto;
  }

  & p {
    color: ${(props) => props.color};
    margin: 18px 0;

    &:hover {
      color: ${(props) => props.hoverColor};
      cursor: default;
    }
  }
`;
