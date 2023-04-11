import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { PageType } from "../../App";
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = {
  width: string;
  height?: string;
  children: ReactElement | ReactElement[];
  page: PageType;
  scrollTop?: number;
};

export default function Page({
  width,
  height = "100%",
  children,
  page,
  scrollTop,
}: Props): ReactElement {
  // Constant
  const navbarHeight = `60px`;

  // Contexts
  const theme = useContext(ThemeContext);

  // Helpers
  const getNavbarColor = () => {
    if (!scrollTop || scrollTop < 100) {
      return "transparent";
    } else if (scrollTop < 200) {
      return theme?.secondary(0.5) ?? "";
    } else {
      return theme?.secondary() ?? "";
    }
  };

  return (
    <PageContainer width={width} height={height}>
      <Navbar
        height={navbarHeight}
        width={width}
        page={page}
        bgColor={getNavbarColor()}
      />
      {children}
    </PageContainer>
  );
}

const PageContainer = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  overflow-y: auto;
  background-color: rgb(18, 18, 18);
  position: relative;
`;
