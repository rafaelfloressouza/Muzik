import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import Bottombar from "./components/Bottombar";
import Home from "./components/Home";
import { ReactElement, useState } from "react";
import Page from "./components/shared/Page";

export enum PageType {
  Home,
  Search,
  YourLibrary,
  CreatePlaylist,
  LikedSongs,
}

export default function App() {
  // Constants
  const sideBarWidth = `250px`;
  const bottomBarHeight = `90px`;
  const topContainerHeight = `calc(100% - ${bottomBarHeight})`;
  const pageWidth = `calc(100% - ${sideBarWidth})`;

  // State
  const [page, setPage] = useState(PageType.Home);

  // Handlers
  const pageChange = (newPage: PageType) => {
    if (newPage === page) return;
    setPage(newPage);
  };

  // Helpers
  const getPageContent = (): ReactElement => {
    switch (page) {
      case PageType.Home:
        return <Home />;
      case PageType.Search:
        return <></>;
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
      <ThemeProvider>
        <TopContainer height={topContainerHeight}>
          <Sidebar width={sideBarWidth} page={page} pageSelected={pageChange} />
          <Page
            width={pageWidth}
            children={getPageContent()}
            page={page}
          ></Page>
        </TopContainer>
        <Bottombar height={bottomBarHeight} />
      </ThemeProvider>
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
