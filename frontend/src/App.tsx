import Sidebar from "./components/shared/containers/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import Bottombar from "./components/shared/containers/Bottombar";
import Home from "./components/Home";
import { ReactElement, useEffect, useState } from "react";
import Page from "./components/shared/containers/Page";
import * as Material from "@mui/material";
import YourLibrary, { CategoryType } from "./components/YourLibrary";
import SearchBase from "./components/search/SearchBase";
import Search from "./components/search/Search";

export enum PageType {
  Home = "Home",
  Search = "Search",
  YourLibrary = "Your Library",
  CreatePlaylist = "Create Playlist",
  LikedSongs = "Liked Songs",
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

export default function App() {
  // Constants
  const sideBarWidth = `245px`;
  const bottomBarHeight = `90px`;
  const topContainerHeight = `calc(100% - ${bottomBarHeight})`;
  const pageWidth = `calc(100% - ${sideBarWidth})`;
  const pageHeight = `calc(100% - ${bottomBarHeight})`;

  // State
  const [page, setPage] = useState(PageType.YourLibrary);
  const [scrollTop, setScrollTop] = useState(0);
  const [category, setCategory] = useState(CategoryType.Playlists);
  const [search, setSearch] = useState<string>("");

  // useEffects
  useEffect(() => {
    // Does not open browsers context menu
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
  const pageChange = (newPage: PageType) =>
    setPage(newPage === page ? page : newPage);

  const scrollChanged = (scrollTop: number) => setScrollTop(scrollTop);

  const categoryChange = (category: CategoryType) => setCategory(category);

  const onSearch = (text: string) => setSearch(text);

  // Helpers
  const getPageContent = (): ReactElement => {
    switch (page) {
      case PageType.Home:
        return <Home scrollChanged={scrollChanged} />;
      case PageType.Search:
        if (search) {
          return <Search scrollChanged={scrollChanged} />;
        } else {
          return <SearchBase scrollChanged={scrollChanged} />;
        }
      case PageType.YourLibrary:
        return (
          <YourLibrary scrollChanged={scrollChanged} category={category} />
        );
      case PageType.CreatePlaylist:
        return <></>;
      case PageType.LikedSongs:
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <AppContainer>
      <Material.ThemeProvider theme={muiTheme}>
        <ThemeProvider>
          <TopContainer height={topContainerHeight}>
            <Sidebar
              width={sideBarWidth}
              page={page}
              pageSelected={pageChange}
            />
            <Page
              width={pageWidth}
              height={pageHeight}
              children={getPageContent()}
              page={page}
              scrollTop={scrollTop}
              category={category}
              categoryChange={categoryChange}
              onSearch={onSearch}
            />
          </TopContainer>
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
