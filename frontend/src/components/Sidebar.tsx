import { ReactElement, useContext } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ThemeContext } from "../contexts/ThemeContext";
import { PageType } from "../App";
import Svg from "./shared/Svg";

type Props = {
  width: string;
  page: PageType;
  pageSelected?: (page: PageType) => void;
  playlistSelected?: () => void;
};

export default function Sidebar({
  width,
  page,
  pageSelected = () => {},
  playlistSelected = () => {},
}: Props): ReactElement {
  const theme = useContext(ThemeContext);

  return (
    <SidebarContainer width={width}>
      <TopContainer
        color={theme?.quinary() ?? ""}
        hoverColor={theme?.senary() ?? ""}
      >
        <MoreHorizIcon sx={{ color: theme?.senary() }} onClick={() => {}} />
        <div className="top-buttons">
          <Svg
            svgStyle={{
              muiComponent: HomeRoundedIcon,
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            labelStyle={{
              label: "Home",
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            noChangeColorSvg={true}
            onClick={() => pageSelected(PageType.Home)}
            selected={page === PageType.Home}
          />
          <Svg
            svgStyle={{
              muiComponent: SearchOutlinedIcon,
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            labelStyle={{
              label: "Search",
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            noChangeColorSvg={true}
            onClick={() => pageSelected(PageType.Search)}
            selected={page === PageType.Search}
          />
          <Svg
            svgStyle={{
              muiComponent: LibraryBooksOutlinedIcon,
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            labelStyle={{
              label: "Your Library",
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            noChangeColorSvg={true}
            onClick={() => pageSelected(PageType.YourLibrary)}
            selected={page === PageType.YourLibrary}
          />
        </div>
        <div className="bottom-buttons">
          <Svg
            svgStyle={{
              muiComponent: AddBoxIcon,
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            labelStyle={{
              label: "Create Playlist",
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            onClick={() => pageSelected(PageType.CreatePlaylist)}
            selected={page === PageType.CreatePlaylist}
          />
          <Svg
            svgStyle={{
              muiComponent: LibraryBooksOutlinedIcon,
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            labelStyle={{
              label: "Liked Songs",
              color: theme?.quinary(),
              hoverColor: theme?.senary(),
            }}
            onClick={() => pageSelected(PageType.LikedSongs)}
            selected={page === PageType.LikedSongs}
          />
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

  & .svg {
    margin-bottom: 10px;
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
