import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { PageType } from "../../../App";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { CategoryType } from "../../YourLibrary";

type Props = {
  width: string;
  height?: string;
  children: ReactElement | ReactElement[];
  page: PageType;
  scrollTop?: number;
  category?: CategoryType;
  categoryChange: (category: CategoryType) => void;
  onSearch: (searchTxt: string) => void;
};

export default function Page({
  width,
  height = "100%",
  children,
  page,
  scrollTop,
  category,
  onSearch,
  categoryChange,
}: Props): ReactElement {
  // Constant
  const navbarHeight = `60px`;

  // Contexts
  const theme = useContext(ThemeContext);

  // Helpers
  const getNavbarColor = () => {
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
  };

  return (
    <PageContainer width={width} height={height}>
      <Navbar
        navbarProps={{
          height: navbarHeight,
          width: width,
          bgColor: getNavbarColor(),
        }}
        page={page}
        categoryChange={categoryChange}
        onSearch={onSearch}
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

// const PageHeader = styled.div<{}>`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 90px;
//   padding: 0px 30px;
//   font-size: 1.4rem;
//   font-weight: bold;

//   & .filtering-div {
//     display: flex;
//     flex-direction: row;
//     column-gap: 1rem;
//     font-size: 0.8rem;
//     font-weight: normal;
//   }
// `;

{
  /* <PageHeader>
        <span>{category}</span>
        <div className="filtering-div">
          <SearchbarDark />
          <Button
            textProps={{ text: "Custom order" }}
            svgProps={{ muiComponent: ArrowDropDownSharpIcon }}
            ordering={Ordering.AfterText}
            colGap="2px"
          />
        </div>
      </PageHeader> */
}
