import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import Bottombar from "./components/BottomBar";
import { useMemo } from "react";
import Page from "./components/Page";
import * as Material from "@mui/material";
import useAppParams from "./hooks/useAppParams";
import useAppConfig from "./hooks/useAppConfig";

const muiTheme = Material.createTheme({
  typography: {
    fontFamily: [
      "Gotham Spotify",
      "Roboto",
      "Helvetica Neue",
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
  // Add some app configurations
  useAppConfig();

  // State
  const { sidebarCollapsed, sidebarExpanded } = useAppParams();

  // Helpers
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
    sidebarExpanded,
    sideBarWidthCollapsed,
    sideBarWidthExpandedDefault,
    sideBarWidth,
  ]);

  return (
    <AppContainer>
      <Material.ThemeProvider theme={muiTheme}>
        <ThemeProvider>
          {/* Contains the sidebar and the main body */}
          <TopContainer height={topContainerHeight}>
            <Sidebar width={finalSidebarWidth} />
            <Page width={finalPageWidth} height={pageHeight} />
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
