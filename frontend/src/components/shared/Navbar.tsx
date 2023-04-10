import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { PageType } from "../../App";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ThemeContext } from "../../contexts/ThemeContext";
import Avatar from "./Avatar";
import Searchbar from "./Searchbar";

type Props = {
  height: string;
  page: PageType;
};

export default function Navbar({ height, page }: Props): ReactElement {
  const theme = useContext(ThemeContext);

  const getArrows = () => {
    return (
      <Arrows arrowBgColor={theme?.septenary(0.45) ?? ""}>
        <div className="back-arrow">
          <ArrowBackIosRoundedIcon
            sx={{
              color: theme?.senary(),
              width: "20px",
            }}
          />
        </div>
        <div className="front-arrow">
          <ArrowForwardIosRoundedIcon
            sx={{
              width: "20px",
            }}
          />
        </div>
      </Arrows>
    );
  };

  return (
    <NavbarContainer height={height}>
      <div className="arrows-and-searchbar">
        {getArrows()}
        {page === PageType.Search && <Searchbar />}
      </div>
      <Avatar />
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div<{
  height: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.height};
  padding: 0 15px;

  & .arrows-and-searchbar {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    column-gap: 1rem;
  }
`;

const Arrows = styled.div<{
  arrowBgColor: string;
}>`
  display: flex;
  flex-direction: row;
  column-gap: 12px;

  & .back-arrow,
  .front-arrow {
    background-color: ${(props) => props.arrowBgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 6px;
    border-radius: 50%;

    &:hover {
      cursor: pointer;
    }
  }

  & .front-arrow {
    @media (max-width: 1050px) {
      display: none;
    }
  }
`;
