import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import Bottombar from "./components/BottomBar";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import Page from "./components/Page";
import * as Material from "@mui/material";
import Search from "./pages/Search";
import CreatePlaylist from "./pages/CreatePlaylist";
import { CategoryType } from "./pages/YourLibrary";
import SearchBase from "./pages/SearchBase";
import Home from "./pages/Home";

export enum PageType {
  Home = "Home",
  Search = "Search",
  YourLibrary = "Your Library",
  CreatePlaylist = "Create Playlist",
  LikedSongs = "Liked Songs",
  Empty = "",
}

const muiTheme = Material.createTheme({
  typography: {
    fontFamily: [
      "Gotham Spotify",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

// Constants
const sideBarWidth = `420px`;
const sideBarWidthCollapsed = `90px`;
const sideBarWidthExpandedDefault = `50vw`;
const bottomBarHeight = `90px`;
const topContainerHeight = `calc(100% - ${bottomBarHeight})`;
const pageWidth = `calc(100% - ${sideBarWidth})`;
const pageWidthSidebarCollapsed = `calc(100% - ${sideBarWidthCollapsed})`;
const pageWidthSidebarExpandedDefault = `calc(100% - ${sideBarWidthExpandedDefault})`;
const pageHeight = `calc(100% - ${bottomBarHeight})`;

export default function App() {
  // State
  const [page, setPage] = useState(PageType.Home);
  const [scrollTop, setScrollTop] = useState(0);
  const [category, setCategory] = useState(CategoryType.Playlists);
  const [search, setSearch] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

  // useEffects

  // Make browsers context meny not open on right click
  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => event.preventDefault();
    document.addEventListener("contextmenu", handleRightClick);
    return () => document.removeEventListener("contextmenu", handleRightClick);
  }, []);

  useEffect(() => {
    if (page !== PageType.Search) {
      setSearch("");
    }
  }, [page]);

  // Handlers

  const pageChange = useCallback(
    (newPage: PageType) => setPage(newPage === page ? page : newPage),
    [setPage, page]
  );

  const scrollChanged = useCallback(
    (scrollTop: number) => setScrollTop(scrollTop),
    [setScrollTop]
  );

  const categoryChange = useCallback(
    (category: CategoryType) => setCategory(category),
    [setCategory]
  );

  const onSearch = useCallback((text: string) => setSearch(text), [setSearch]);

  const onSidebarCollapsed = useCallback(
    (collapsed: boolean) => setSidebarCollapsed(collapsed),
    [setSidebarCollapsed]
  );

  const onSidebarExpanded = useCallback(
    (collapsed: boolean) => setSidebarExpanded(collapsed),
    [setSidebarExpanded]
  );

  const createPlaylist = useCallback(() => {
    setPage(PageType.CreatePlaylist);
  }, []);

  // Helpers
  const pageContent = useMemo((): ReactElement => {
    switch (page) {
      case PageType.Home:
        return <Home scrollChanged={scrollChanged} />;
      case PageType.Search:
        if (search) {
          return <Search scrollChanged={scrollChanged} />;
        } else {
          return <SearchBase scrollChanged={scrollChanged} />;
        }
      case PageType.CreatePlaylist:
        return <CreatePlaylist scrollChanged={scrollChanged} />;
      default:
        return <></>;
    }
  }, [page, search]);

  const finalPageWidth = useMemo((): string => {
    if (sidebarCollapsed) {
      return pageWidthSidebarCollapsed;
    } else if (sidebarExpanded) {
      return pageWidthSidebarExpandedDefault;
    } else {
      return pageWidth;
    }
  }, [
    sidebarCollapsed,
    pageWidthSidebarCollapsed,
    pageWidthSidebarExpandedDefault,
    sidebarExpanded,
    pageWidth,
  ]);

  const finalSidebarWidth = useMemo((): string => {
    if (sidebarCollapsed) {
      return sideBarWidthCollapsed;
    } else if (sidebarExpanded) {
      return sideBarWidthExpandedDefault;
    } else {
      return sideBarWidth;
    }
  }, [
    sidebarCollapsed,
    sideBarWidthCollapsed,
    sidebarExpanded,
    sideBarWidthExpandedDefault,
    sideBarWidth,
  ]);

  return (
    <AppContainer>
      <Material.ThemeProvider theme={muiTheme}>
        <ThemeProvider>
          {/* Contains the sidebar and the main body */}
          <TopContainer height={topContainerHeight}>
            <Sidebar
              width={finalSidebarWidth}
              page={page}
              pageSelected={pageChange}
              sidebarCollapsed={onSidebarCollapsed}
              sidebarExpanded={onSidebarExpanded}
              createPlaylist={createPlaylist}
            />
            <Page
              width={finalPageWidth}
              height={pageHeight}
              children={pageContent}
              page={page}
              scrollTop={scrollTop}
              category={category}
              categoryChange={categoryChange}
              onSearch={onSearch}
            />
          </TopContainer>
          {/* Contains the bottombar only */}
          <Bottombar bottombarProps={{ height: bottomBarHeight }} />
        </ThemeProvider>
      </Material.ThemeProvider>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const TopContainer = styled.div<{ height: string }>`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.height};
  width: 100%;
`;
