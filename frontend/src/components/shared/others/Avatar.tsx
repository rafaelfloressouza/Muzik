import { ReactElement, useContext, useRef, useState } from "react";
import Svg from "./Svg";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import Tooltip from "../others/Tooltip";
import Menu, { MenuItemType } from "./Menu";
import OpenInNewSharpIcon from "@mui/icons-material/OpenInNewSharp";
import Button from "../buttons/Button";

export default function Avatar(): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // State
  const [menuOpened, setMenuOpened] = useState(false);

  // Refs
  const avatarDivRef = useRef<HTMLDivElement | null>(null);

  // Helpers
  const getMenu = () => {
    return (
      <Menu
        open={menuOpened}
        menuProps={{
          elRef: avatarDivRef,
          items: [
            {
              label: "Account",
              type: MenuItemType.WithIcon,
              icon: OpenInNewSharpIcon,
            },
            { label: "Profile", type: MenuItemType.Standard },
            { label: "Private Session", type: MenuItemType.Standard },
            { label: "Settings", type: MenuItemType.Standard },
            { type: MenuItemType.Divider },
            { label: "Log out", type: MenuItemType.Standard },
          ],
          setOpen: (open: boolean) => setMenuOpened(open),
        }}
      />
    );
  };

  return (
    <>
      <Tooltip
        tooltipProps={{
          textStyle: { text: menuOpened ? "" : "Rafael Flores Souza" },
        }}
      >
        <AvatarContainer
          ref={avatarDivRef}
          className="avatar"
          bgColor={theme?.septenary() ?? ""}
          hoverColor={theme?.secondary() ?? ""}
          onClick={() => setMenuOpened(!menuOpened)}
        >
          <Button
            svgProps={{
              fileUrl: "svgs/unknown-avatar.svg",
              borderRadius: "50%",
              // bgColor: "white",
            }}
          />
          <span>Rafael Flores Souza</span>
          {menuOpened ? (
            <ArrowDropUpSharpIcon sx={{ transform: "scale(1.2)", mr: "2px" }} />
          ) : (
            <ArrowDropDownSharpIcon
              sx={{ transform: "scale(1.2)", mr: "2px" }}
            />
          )}
        </AvatarContainer>
      </Tooltip>
      {getMenu()}
    </>
  );
}

const AvatarContainer = styled.div<{ bgColor: string; hoverColor: string }>`
  display: flex;
  background-color: ${(props) => props.bgColor};
  width: auto;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  text-overflow: ellipsis;
  column-gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.hoverColor};
    cursor: pointer;
  }

  & span {
    display: inline-block;
    width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 1050px) {
      display: none;
    }
  }

  & svg {
    @media (max-width: 1050px) {
      display: none;
    }
  }

  @media (max-width: 1050px) {
    justify-content: left;
    background-color: transparent;
  }
`;
