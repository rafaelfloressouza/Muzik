import { ReactElement, useContext, useRef, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ThemeContext } from "../contexts/ThemeContext";
import { PageType } from "../App";
import Svg from "./shared/Svg";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import Menu, { MenuItemType } from "./shared/Menu";

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
  // Constants
  const topButtons = [
    { muiComponent: HomeRoundedIcon, pageType: PageType.Home },
    {
      muiComponent: SearchOutlinedIcon,
      pageType: PageType.Search,
    },
    {
      muiComponent: LibraryBooksOutlinedIcon,
      pageType: PageType.YourLibrary,
    },
  ];

  const bottomButtons = [
    {
      muiComponent: AddBoxIcon,
      pageType: PageType.CreatePlaylist,
    },
    {
      muiComponent: LibraryBooksOutlinedIcon,
      pageType: PageType.LikedSongs,
    },
  ];

  // Contexts
  const theme = useContext(ThemeContext);

  const getPlaylists = () => {
    const playlists = [];
    for (let i = 0; i < 40; i++) {
      playlists.push(
        <PlayList
          key={i}
          color={theme?.quinary() ?? ""}
          hoverColor={theme?.senary() ?? ""}
        >
          Playlist #{i + 1}
        </PlayList>
      );
    }
    return playlists;
  };

  const getSvg = (
    muiComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    pageType: PageType,
    key: number
  ) => {
    return (
      <Svg
        key={key}
        svgStyle={{
          muiComponent: muiComponent,
          color: theme?.quinary(),
          hoverColor: theme?.senary(),
        }}
        labelStyle={{
          label: pageType,
          color: theme?.quinary(),
          hoverColor: theme?.senary(),
          isBold: true,
        }}
        noChangeColorSvg={true}
        onClick={() => pageSelected(pageType)}
        selected={page === pageType}
      />
    );
  };

  return (
    <>
      <SidebarContainer width={width}>
        <TopContainer
          color={theme?.quinary() ?? ""}
          hoverColor={theme?.senary() ?? ""}
        >
          <Svg
            svgStyle={{
              muiComponent: MoreHorizIcon,
              color: theme?.senary(),
            }}
            noChangeColorSvg={true}
          />
          <div className="top-buttons">
            {topButtons.map((el, idx) => {
              return getSvg(el.muiComponent, el.pageType, idx);
            })}
          </div>
          <div className="bottom-buttons">
            {bottomButtons.map((el, idx) => {
              return getSvg(el.muiComponent, el.pageType, idx);
            })}
          </div>
        </TopContainer>
        <Divider color={theme?.secondary() ?? ""} />
        <BottomContainer
          color={theme?.quinary() ?? ""}
          hoverColor={theme?.senary() ?? ""}
        >
          {getPlaylists()}
        </BottomContainer>
      </SidebarContainer>
    </>
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
  padding: 4% 10% 2% 10%;

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
  display: flex;
  flex-direction: column;
  height: calc(100% - 260px);
  overflow-y: hidden;
  font-weight: normal;
  font-size: 0.85rem;
  color: ${(props) => props.color};
  padding: 0 10%;

  &:hover {
    overflow-y: auto;
  }
`;

const PlayList = styled.span<{ color: string; hoverColor: string }>`
  color: ${(props) => props.color};
  padding: 10px 0;
  z-index: 500;

  &:hover {
    color: ${(props) => props.hoverColor};
    cursor: default;
  }
`;
