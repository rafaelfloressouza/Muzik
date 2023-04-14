import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { PageType } from "../../../App";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Avatar from "../others/Avatar";
import Searchbar from "../searchbars/SearchbarLight";
import ButtonGroup, { IElement } from "../buttons/ButtonGroup";
import { CategoryType } from "../../YourLibrary";
import { PlayButton } from "../buttons/Button";
import { IContainerProps } from "../../../utils/types";

type Props = {
  page: PageType;
  navbarProps: IContainerProps;
  categoryChange: (category: CategoryType) => void;
};

export default function Navbar({
  navbarProps,
  page,
  categoryChange,
}: Props): ReactElement {
  const theme = useContext(ThemeContext);

  // Helpers
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

  const getCategoryGroup = (): ReactElement => {
    if (page !== PageType.YourLibrary) return <></>;
    return (
      <ButtonGroup
        elements={[
          { id: 1, name: "Playlists" },
          { id: 2, name: "Podcasts" },
          { id: 3, name: "Audiobooks" },
          { id: 4, name: "Artists" },
          { id: 5, name: "Albums" },
        ]}
        textColor={theme?.senary() ?? ""}
        bgColor={"transparent"}
        bgHoverColor={"transparent"}
        bgColorSelected={theme?.quaternary(0.5) ?? ""}
        onClick={(el: IElement) => categoryChange(el.name as CategoryType)}
      />
    );
  };

  const getSearchBar = (): ReactElement => {
    if (page !== PageType.Search) return <></>;
    return <Searchbar />;
  };

  const getPlayBtn = (): ReactElement => {
    if (page !== PageType.CreatePlaylist && page !== PageType.LikedSongs)
      return <></>;
    return (
      <PlayButton textProps={{ text: "Alternative/Indie", color: "red" }} />
    );
  };

  return (
    <NavbarContainer navbarProps={navbarProps}>
      <div className="arrows-searchbar-and-categories">
        {getArrows()}
        {getPlayBtn()}
        {getCategoryGroup()}
        {getSearchBar()}
      </div>
      <Avatar />
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div<{
  navbarProps: IContainerProps;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.navbarProps.height};
  position: fixed;
  width: ${(props) => props.navbarProps.width};
  top: 0;
  z-index: 100;
  background-color: ${(props) => props.navbarProps.bgColor};

  & .arrows-searchbar-and-categories {
    display: flex;
    width: auto;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    column-gap: 1rem;
  }

  & .btn-group {
    margin-left: 25px;
  }

  & .avatar {
    margin-right: 40px;
  }
`;

const Arrows = styled.div<{
  arrowBgColor: string;
}>`
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  margin-left: 30px;

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
