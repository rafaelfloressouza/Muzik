import { ReactElement, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { ThemeContext } from "../contexts/ThemeContext";
import useAppParams from "../hooks/useAppParams";
import { PageType } from "../utils/types";
import Home from "../pages/Home";
import Search from "../pages/Search";
import SearchBase from "../pages/SearchBase";
import CreatePlaylist from "../pages/CreatePlaylist";

type Props = {
  width: string;
  height?: string;
};

export default function Page({ width, height = "100%" }: Props): ReactElement {
  // Constant
  const navbarHeight = `60px`;

  // State
  const { page } = useAppParams();
  const [search, setSearch] = useState<string>("");
  const [scrollTop, setScrollTop] = useState<number>(0);

  // Contexts
  const theme = useContext(ThemeContext);

  // Helpers
  const pageContent = useMemo((): ReactElement => {
    switch (page) {
      case PageType.Home:
        return <Home scrollChanged={(val) => setScrollTop(val)} />;
      case PageType.Search:
        if (search) {
          return <Search scrollChanged={(val) => setScrollTop(val)} />;
        } else {
          return <SearchBase scrollChanged={(val) => setScrollTop(val)} />;
        }
      case PageType.CreatePlaylist:
        return <CreatePlaylist scrollChanged={(val) => setScrollTop(val)} />;
      default:
        return <></>;
    }
  }, [page, search]);

  const navbarColor = useMemo(() => {
    if (page == PageType.Search) return theme?.tertiary();
    if (!scrollTop || scrollTop < 100) {
      return "transparent";
    } else if (scrollTop < 150) {
      return theme?.nonary(0.3) ?? "";
    } else if (scrollTop < 200) {
      return theme?.nonary(0.5) ?? "";
    } else if (scrollTop < 250) {
      return theme?.nonary(0.7) ?? "";
    } else {
      return theme?.nonary() ?? "";
    }
  }, [page, theme, scrollTop]);

  return (
    <PageContainer
      width={width}
      height={height}
      bgColor={theme?.septenary() ?? ""}
    >
      <Navbar
        navbarProps={{
          height: navbarHeight,
          width: width,
          bgColor: navbarColor,
        }}
        onSearch={setSearch}
      />
      {pageContent}
    </PageContainer>
  );
}

const PageContainer = styled.div<{
  width: string;
  height: string;
  bgColor: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  overflow-y: auto;
  background-color: ${(props) => props.bgColor};
  position: relative;
  padding: 0 8px;
`;
