import { ReactElement, useContext, useRef, useState } from "react";
import styled from "styled-components";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { PageType } from "../../../App";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import Button from "../buttons/Button";
import ButtonGroup, { IButtonProps } from "../buttons/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SearchbarDark } from "../others/Searchbar";
import Sorter from "../others/Sorter";
import { IContainerProps, ITextProps } from "../../../utils/types";
import Menu, { MenuItemType } from "../others/Menu";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

type Props = {
  width: string;
  page: PageType;
  pageSelected?: (page: PageType) => void;
  playlistSelected?: () => void;
  sidebarCollapsed?: (collapsed: boolean) => void;
  sidebarExpanded?: (collapsed: boolean) => void;
  createPlaylist?: () => void;
};

export default function Sidebar({
  width,
  page,
  pageSelected = () => {},
  playlistSelected = () => {},
  sidebarCollapsed = (collapsed: boolean) => {},
  sidebarExpanded = (collapsed: boolean) => {},
  createPlaylist = () => {},
}: Props): ReactElement {
  // Constants
  const topButtons = [
    { muiComponent: HomeRoundedIcon, pageType: PageType.Home },
    {
      muiComponent: SearchOutlinedIcon,
      pageType: PageType.Search,
    },
  ];
  const bottomButtons = [
    {
      muiComponent: LibraryBooksOutlinedIcon,
      pageType: PageType.YourLibrary,
    },
  ];
  const categories = [
    { id: 1, name: "Playlists" },
    { id: 2, name: "Podcasts & Shows" },
    { id: 3, name: "Albums" },
    { id: 4, name: "Artists" },
  ];

  // State
  const [searchText, setSearchText] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [plusBtnMenuOpened, setPlusBtnMenuOpened] = useState<boolean>(false);

  // Refs
  const plustBtnRef = useRef<HTMLDivElement | null>(null);

  // Contexts
  const theme = useContext(ThemeContext);

  const getLibraryItems = () => {
    const playlists = [];
    for (let i = 0; i < 40; i++) {
      playlists.push(
        <LibraryItem
          key={i}
          itemProps={{ hoverBgColor: theme?.secondary() }}
          titleProps={{
            color: theme?.senary(),
            weight: "bold",
            size: "0.9rem",
          }}
          subtitleProps={{ color: theme?.quinary() }}
          isArtist={i % 2 != 0}
        >
          <img src="/images/test-img.png" />
          {!isCollapsed && (
            <div className="item-info">
              <span className="item-title">
                {i % 2 == 0 ? "Electronic Music" : "Vance Joy"}
              </span>
              <span className="item-subtitle">
                {i % 2 === 0 ? "Playlist * Rafael" : "Artist"}
              </span>
            </div>
          )}
        </LibraryItem>
      );
    }
    return playlists;
  };

  const getButton = (
    muiComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    pageType: PageType,
    key: number,
    ignoreOnClick: boolean = false,
    customOnClick?: () => void
  ) => {
    return (
      <Button
        key={key}
        buttonProps={{
          onClick: () => {
            if (customOnClick) customOnClick();
            if (!ignoreOnClick) pageSelected(pageType);
          },
          selected: page === pageType,
          justifyContent: isCollapsed ? "center" : "",
          height: "38px",
        }}
        svgProps={{
          muiComponent: muiComponent,
          fill: theme?.quinary(),
          hoverFill: theme?.senary(),
          height: "30px",
          width: "30px",
          selected: page === pageType,
        }}
        textProps={{
          text: pageType,
          color: theme?.quinary(),
          hoverColor: theme?.senary(),
          weight: "bold",
          size: "0.90rem",
        }}
      />
    );
  };

  const getAddBtnMenu = () => {
    return (
      <Menu
        open={plusBtnMenuOpened}
        menuProps={{ refEl: plustBtnRef, width: "205px" }}
        listenForClickAway={true}
        menuItemProps={[
          {
            itemProps: {
              flexDir: "row-reverse",
              justifyContent: "left",
              colGap: "0.5rem",
              onClick: () => createPlaylist(),
            },
            textProps: { text: "Create a new playlist", size: "0.85rem" },
            iconProps: {
              muiComponent: LibraryMusicOutlinedIcon,
              width: "22px",
              height: "22px",
              fill: theme?.senary(),
            },
            type: MenuItemType.WithIcon,
          },
          {
            itemProps: {
              flexDir: "row-reverse",
              justifyContent: "left",
              colGap: "0.5rem",
            },
            textProps: { text: "Create a playlist folder", size: "0.85rem" },
            iconProps: {
              muiComponent: FolderOpenOutlinedIcon,
              width: "22px",
              height: "22px",
              fill: theme?.senary(),
            },
            type: MenuItemType.WithIcon,
          },
        ]}
        setOpen={(open: boolean) => setPlusBtnMenuOpened(open)}
      />
    );
  };

  return (
    <>
      <SidebarContainer width={width}>
        <TopContainer
          color={theme?.quinary() ?? ""}
          hoverColor={theme?.senary() ?? ""}
          bgColor={theme?.tertiary() ?? ""}
          isCollapsed={isCollapsed}
        >
          {topButtons.map((el, idx) => {
            return getButton(
              el.muiComponent,
              isCollapsed ? PageType.Empty : el.pageType,
              idx
            );
          })}
        </TopContainer>
        <BottomContainer
          color={theme?.quinary() ?? ""}
          hoverColor={theme?.senary() ?? ""}
          bgColor={theme?.tertiary() ?? ""}
          isCollapsed={isCollapsed}
        >
          <div className="top">
            <div className="top-1">
              {bottomButtons.map((el, idx) => {
                return getButton(
                  el.muiComponent,
                  isCollapsed ? PageType.Empty : el.pageType,
                  idx,
                  true,
                  () => {
                    setIsCollapsed(!isCollapsed);
                    setIsExpanded(false);
                    sidebarCollapsed(!isCollapsed);
                  }
                );
              })}
              {!isCollapsed && (
                <div className="top-1-1">
                  <Button
                    svgProps={{
                      muiComponent: AddIcon,
                      height: "22px",
                      width: "22px",
                    }}
                    buttonProps={{
                      refEl: plustBtnRef,
                      height: "22px",
                      width: "22px",
                      padding: "3px",
                      borderRadius: "100%",
                      hoverCursor: "pointer",
                      hoverBgColor: theme?.secondary(0.7),
                      justifyContent: "center",
                      onClick: () => setPlusBtnMenuOpened(!plusBtnMenuOpened),
                    }}
                  />
                  {isExpanded && (
                    <Button
                      svgProps={{
                        muiComponent: GridViewOutlinedIcon,
                        height: "20px",
                        width: "20px",
                        hoverFill: theme?.senary(),
                      }}
                      buttonProps={{
                        height: "20px",
                        width: "20px",
                        hoverCursor: "pointer",
                        justifyContent: "center",
                        onClick: () => setIsGridView(!isGridView),
                      }}
                    />
                  )}
                  <Button
                    svgProps={{
                      muiComponent: isExpanded
                        ? ArrowBackIcon
                        : ArrowForwardIcon,
                      height: "22px",
                      width: "22px",
                    }}
                    buttonProps={{
                      height: "22px",
                      width: "22px",
                      padding: "3px",
                      borderRadius: "100%",
                      hoverCursor: "pointer",
                      hoverBgColor: theme?.secondary(0.7),
                      justifyContent: "center",
                      onClick: () => {
                        setIsExpanded(!isExpanded);
                        setIsCollapsed(false);
                        sidebarExpanded(!isExpanded);
                      },
                    }}
                  />
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ButtonGroup
                containerProps={{
                  bgColor: theme?.tertiary(),
                }}
                elements={categories.map(
                  ({
                    id,
                    name,
                  }: {
                    id: string | number;
                    name: string;
                  }): IButtonProps => {
                    return {
                      id: id,
                      name: name,
                      textProps: {
                        color: theme?.senary(),
                        selectedColor: theme?.tertiary(),
                        weight: "normal",
                        size: "0.8rem",
                      },

                      buttonProps: {
                        bgColor: theme?.senary(0.1),
                        hoverBgColor: theme?.senary(0.2),
                        selectedBgColor: theme?.senary(),
                        borderRadius: "50px",
                        padding: "8px 10px",
                        margin: "0 10px 0 0",
                        onClick: () => {},
                      },
                    };
                  }
                )}
              />
            )}
          </div>
          <div className="bottom">
            {!isCollapsed && (
              <div className="bottom-1">
                <SearchbarDark
                  expandLeft={false}
                  searchIn="Your Library"
                  onSearch={(searchTxt: string) => setSearchText(searchTxt)}
                  inputWidth={130}
                />
                <Sorter
                  items={[
                    { id: 0, text: "Recents" },
                    { id: 1, text: "Recently Added" },
                    { id: 2, text: "Alphabetical" },
                    { id: 3, text: "Creator" },
                  ]}
                  showSortBy={true}
                  onClick={() => {}}
                />
              </div>
            )}
            {getLibraryItems()}
          </div>
        </BottomContainer>
        {getAddBtnMenu()}
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
  padding: 0 0px 0px 8px;
`;

const TopContainer = styled.div<{
  color: string;
  hoverColor: string;
  bgColor: string;
  isCollapsed: boolean;
}>`
  display: flex;
  flex-direction: column;
  row-gap: 0.9rem;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  padding: 12px 20px;

  & #elipsis-btn {
    margin-bottom: 0px;
  }
`;

const BottomContainer = styled.div<{
  color: string;
  hoverColor: string;
  bgColor: string;
  isCollapsed: boolean;
}>`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  font-size: 0.85rem;
  color: ${(props) => props.color};
  margin-top: 8px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  overflow: hidden;

  & .top {
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
    padding: 15px 20px;
    box-shadow: black 0px 5px 15px -5px;

    & .top-1 {
      display: flex;
      justify-content: ${(props) =>
        props.isCollapsed ? "center" : "space-between"};

      & .top-1-1 {
        display: flex;
        column-gap: 1rem;
        align-items: center;
      }
    }
  }

  & .bottom {
    display: flex;
    flex-direction: column;
    z-index: 1;
    overflow-y: hidden;
    scrollbar-gutter: stable both-edges;

    & .bottom-1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    &:hover {
      overflow-y: auto;
    }
  }
`;

const LibraryItem = styled.span<{
  itemProps: IContainerProps;
  titleProps: ITextProps;
  subtitleProps: ITextProps;
  isArtist: boolean;
}>`
  display: flex;
  align-items: center;
  color: ${(props) => props.color};
  padding: 8px;
  z-index: 500;
  border-radius: 5px;
  column-gap: 0.8rem;

  & .item-info {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    .item-title {
      color: ${(props) => props.titleProps.color};
      font-size: ${(props) => props.titleProps.size};
      font-weight: ${(props) => props.titleProps.weight};
    }

    .item-subtitle {
      color: ${(props) => props.subtitleProps.color};
      font-size: ${(props) => props.subtitleProps.size};
    }
  }

  & img {
    height: 50px;
    width: 50px;
    border-radius: ${(props) => (props.isArtist ? "100%" : "3px")};
  }

  &:hover {
    background-color: ${(props) => props.itemProps.hoverBgColor};
    cursor: pointer;
  }
`;
