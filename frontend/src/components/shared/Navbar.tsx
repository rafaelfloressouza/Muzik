import { ReactElement } from "react";
import styled from "styled-components";
import { PageType } from "../../App";

type Props = {
  height: string;
  page: PageType;
};

export default function Navbar({ height, page }: Props): ReactElement {
  return <NavbarContainer height={height}></NavbarContainer>;
}

const NavbarContainer = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background-color: green;
`;
