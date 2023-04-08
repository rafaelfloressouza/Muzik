import { ReactElement } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { PageType } from "../../App";

type Props = {
  width: string;
  children: ReactElement | ReactElement[];
  page: PageType;
};

export default function Page({ width, children, page }: Props): ReactElement {
  // Constant
  const navbarHeight = `60px`;

  return (
    <PageContainer width={width}>
      <Navbar height={navbarHeight} page={page} />
      {children}
    </PageContainer>
  );
}

const PageContainer = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  background-color: rgb(18, 18, 18);
`;
