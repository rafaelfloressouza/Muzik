import { ReactElement, useContext, useState } from "react";
import Svg from "./Svg";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";

export default function Avatar(): ReactElement {
  const theme = useContext(ThemeContext);
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <AvatarContainer
      className="avatar"
      bgColor={theme?.septenary(0.45) ?? ""}
      hoverColor={theme?.secondary() ?? ""}
      onClick={() => setMenuOpened(!menuOpened)}
    >
      <Svg
        svgStyle={{ fileUrl: "svgs/unknown-avatar.svg", borderRadius: "50%" }}
      />
      <span>Rafael Flores Souza</span>
      {menuOpened ? (
        <ArrowDropUpSharpIcon sx={{ transform: "scale(1.2)", mr: "2px" }} />
      ) : (
        <ArrowDropDownSharpIcon sx={{ transform: "scale(1.2)", mr: "2px" }} />
      )}
    </AvatarContainer>
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
