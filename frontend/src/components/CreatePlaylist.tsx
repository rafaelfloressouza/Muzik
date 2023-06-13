import { ReactElement, useContext, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import styled from "styled-components";
import useHandleScroll from "../hooks/useHandleScroll";
import Button from "./shared/buttons/Button";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FindMoreMenu from "./shared/containers/FindMoreMenu";
import Table, { Item } from "./shared/containers/Table";
import Typography from "./shared/others/Typography";
import ItemInfo from "./shared/others/ItemInfo";

type Props = {
  scrollChanged: (scrollTop: number) => void;
};

export default function CreatePlaylist({ scrollChanged }: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // Refs
  const playListRef = useRef<HTMLDivElement | null>(null);

  // State
  const [findMoreMenuExpanded, setFindMoreMenuExpanded] =
    useState<boolean>(false);

  // Hooks
  useHandleScroll(playListRef, scrollChanged);

  return (
    <CreatePlaylistContainer bgColor={theme?.tertiary()}>
      <PlaylistHeader>
        <div className="img-placeholder" />
        <div className="desc-container">
          <span className="playlist-visibility">Public Playlist</span>
          <span className="playlist-name" onClick={() => {}}>
            My Playlist #1
          </span>
          <div className="playlist-info">
            <Button
              svgProps={{
                fileUrl: "svgs/unknown-avatar.svg",
                height: "25px",
                width: "25px",
                borderRadius: "50%",
              }}
              textProps={{
                text: "Rafael Flores Souza",
                size: "0.85rem",
                hoverDecoration: "underline",
                onClick: () => {},
              }}
              colGap={"5px"}
            />
            <span>•</span>
            <span className="song-count">3 songs,</span>
            <span className="total-song-time">10 min 33 sec</span>
          </div>
        </div>
      </PlaylistHeader>
      <PlaylistMenu>
        <Button
          svgProps={{
            muiComponent: PersonAddOutlinedIcon,
            height: "40px",
            width: "40px",
          }}
          buttonProps={{ hoverCursor: "default" }}
        />
        <Button
          svgProps={{
            muiComponent: MoreHorizOutlinedIcon,
            height: "30px",
            width: "30px",
          }}
          buttonProps={{ hoverCursor: "default" }}
        />
      </PlaylistMenu>
      <FindMoreMenu
        menuExpanded={(expanded: boolean) => setFindMoreMenuExpanded(expanded)}
      />
      {!findMoreMenuExpanded && (
        <>
          <Typography
            containerProps={{ padding: "0 15px 0 15px" }}
            textProps={{ text: "Recommended", weight: "bold", size: "1.4rem" }}
          />
          <Typography
            containerProps={{ padding: "0 15px 0 15px" }}
            textProps={{
              text: "Based on title of this playlist",
              color: theme?.quinary(),
              size: "0.8rem",
            }}
          />
          <Table
            tableProps={{ padding: " 0 15px 0 15px" }}
            rowProps={{
              hoverBgColor: theme?.secondary(),
              borderRadius: "5px",
            }}
            columnProps={[
              { width: "57%" },
              { width: "21.5%" },
              { width: "21.5%", justifyContent: "right" },
            ]}
            columns={[
              {
                items: [
                  <ItemInfo
                    imgProps={{
                      src: "/images/test-img.png",
                      height: "45px",
                      width: "45px",
                    }}
                    titleProps={{ text: "Sone - en Vivo" }}
                    subTitleProps={{ text: "Zoe" }}
                  />,
                  <Typography
                    textProps={{
                      text: "Dance it better",
                      color: theme?.quinary(),
                      size: "0.85rem",
                      hoverCursor: "pointer",
                      hoverDecoration: "underline",
                      hoverColor: theme?.senary(),
                    }}
                  />,
                  <Button
                    buttonProps={{
                      borderRadius: "25px",
                      padding: "8px 15px",
                      border: `1px solid ${theme?.quaternary()}`,
                      hoverBorder: `1px solid ${theme?.senary()}`,
                      animate: true,
                      margin: "0 10px 0 0",
                    }}
                    textProps={{
                      text: "Add",
                      weight: "bold",
                      size: "0.8rem",
                      color: theme?.senary(),
                      hoverColor: theme?.senary(),
                    }}
                  />,
                ],
              },
            ]}
            autoWidth={false}
          />
        </>
      )}
    </CreatePlaylistContainer>
  );
}

const CreatePlaylistContainer = styled.div<{ bgColor?: string }>`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  overflow-y: auto;
  background-color: ${(props) => props.bgColor};
  padding-bottom: 30px;
`;

const PlaylistHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-image: linear-gradient(
    180deg,
    rgb(var(--quaternary)),
    rgba(var(--quaternary), 0.5),
    rgba(var(--quaternary), 0.4)
  );
  padding-top: 115px;

  & .img-placeholder {
    height: 190px;
    width: 190px;
    margin: 0 20px 0 15px;
    margin-bottom: 25px;
    background-color: rgba(var(--secondary), 0.5);
    box-shadow: 0 10px 15px 2px rgba(var(--secondary), 1);
  }

  & .desc-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: end;
    row-gap: 1rem;
    margin-bottom: 25px;
    color: rgb(var(--senary));
    font-weight: bold;

    & .playlist-visibility {
      font-size: 0.85rem;
    }

    & .playlist-name {
      font-size: 3rem;
      &:hover {
        cursor: pointer;
      }
    }

    & .playlist-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      column-gap: 0.5rem;
      font-size: 0.85rem;

      & .song-count {
        font-weight: normal;
      }

      & .total-song-time {
        font-weight: normal;
        color: rgba(var(--senary), 0.5);
      }
    }
  }
`;

const PlaylistMenu = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 15px;
  column-gap: 1.8rem;
`;

const RecommendedList = styled.div``;

const PlaylistBody = styled.div`
  padding: 30px;
  padding-top: 0;
`;
