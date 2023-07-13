import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import Button from "./StandardButton";
import { ReactiveSearchBar } from "./ReactiveSearchBar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ThemeContext } from "../../../contexts/ThemeContext";

type Props = {
  menuExpanded: (expanded: boolean) => void;
};

export default function FindMoreMenu({ menuExpanded }: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // State
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <FindMoreMenuContainer>
      {expanded && <div className="divider" />}
      {!expanded && (
        <div className="find-more-container">
          <Button
            textProps={{ text: "Find more", size: "0.87rem", weight: "bold" }}
            buttonProps={{
              onClick: () => {
                setExpanded(true);
                menuExpanded(true);
              },
              hoverCursor: "default",
            }}
          />
        </div>
      )}
      {expanded && (
        <>
          <div className="title">
            <span>Let's find something for your playlist</span>
            <Button
              buttonProps={{
                hoverCursor: "default",
                onClick: () => {
                  setExpanded(false);
                  menuExpanded(false);
                },
              }}
              svgProps={{
                muiComponent: CloseRoundedIcon,
                height: "35px",
                width: "35px",
                fill: theme?.quinary(),
                hoverFill: theme?.quinary(),
              }}
            />
          </div>
          <ReactiveSearchBar width={400} onClickAway={false} expanded={true} />
        </>
      )}
    </FindMoreMenuContainer>
  );
}

const FindMoreMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  & .divider {
    border-top: 1px solid rgba(var(--senary), 0.2);
    margin-bottom: 25px;
  }

  & .find-more-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
  }

  & .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 25px;
    }
  }
`;
