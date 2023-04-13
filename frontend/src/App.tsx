import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import Bottombar from "./components/Bottombar";
import Home from "./components/Home";
import { ReactElement, useEffect, useState } from "react";
import Page from "./components/shared/Page";
import * as Material from "@mui/material";
import Search from "./components/Search";

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
  const [page, setPage] = useState(PageType.Home);
  const [scrollTop, setScrollTop] = useState(0);

  // useEffects
  useEffect(() => {
    // Does not open browsers context menu
    const handleRightClick = (event: MouseEvent) => event.preventDefault();
    document.addEventListener("contextmenu", handleRightClick);
    return () => document.removeEventListener("contextmenu", handleRightClick);
  }, []);

  // Handlers
  const pageChange = (newPage: PageType) => {
    if (newPage === page) return;
    setPage(newPage);
  };

  const scrollChanged = (scrollTop: number) => {
    setScrollTop(scrollTop);
  };

  // Helpers
  const getPageContent = (): ReactElement => {
    switch (page) {
      case PageType.Home:
        return <Home scrollChanged={scrollChanged} />;
      case PageType.Search:
        return <Search />;
      case PageType.YourLibrary:
        return <></>;
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
            ></Page>
          </TopContainer>
          <Bottombar height={bottomBarHeight} />
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
