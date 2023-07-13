import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ShuffleTwoToneIcon from "@mui/icons-material/ShuffleTwoTone";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import Slider from "./shared/controls/Slider";
import Button from "./shared/controls/StandardButton";
import { IContainerProps } from "../utils/types";

type Props = {
  bottombarProps: IContainerProps;
};

export default function BottomBar({ bottombarProps }: Props) {
  const theme = useContext(ThemeContext);

  return (
    <BottombarContainer
      color={theme?.senary() ?? ""}
      bgColor={theme?.septenary() ?? ""}
      borderColor={theme?.quinary(0.1) ?? ""}
      height={bottombarProps?.height ?? "auto"}
    >
      <LeftContainer
        artistNameTextColor={theme?.quinary() ?? ""}
        heartFillColor={theme?.quinary() ?? ""}
        hoverColor={theme?.senary() ?? ""}
      >
        <img className="song-album-img" src="/images/test-img.png" />
        <div className="song-info">
          <span className="song-name">Sone - En Vivo</span>
          <span className="song-artists">Zoe</span>
        </div>
        <Button
          svgProps={{
            muiComponent: FavoriteBorderIcon,
            height: "20px",
            width: "20px",
          }}
          tooltipProps={{
            textStyle: { text: "Save to Your Library" },
            containerStyle: { bgColor: theme?.secondary() },
          }}
        />
      </LeftContainer>
      <CenterContainer
        textColor={theme?.quinary() ?? ""}
        playBtnFill={theme?.senary() ?? ""}
        otherBtnsFill={theme?.quinary() ?? ""}
        hoverFill={theme?.senary() ?? ""}
      >
        <div className="music-controls">
          <Button
            svgProps={{
              muiComponent: ShuffleTwoToneIcon,
              height: "22px",
              width: "22px",
            }}
            tooltipProps={{
              textStyle: { text: "Disable Shuffle" },
              containerStyle: { bgColor: theme?.secondary() },
            }}
          />
          <Button
            svgProps={{
              muiComponent: SkipPreviousIcon,
              height: "32px",
              width: "32px",
            }}
            tooltipProps={{
              textStyle: { text: "Previous" },
              containerStyle: { bgColor: theme?.secondary() },
            }}
          />
          <Button
            svgProps={{
              muiComponent: PlayCircleIcon,
              height: "42px",
              width: "42px",
              animate: true,
            }}
            tooltipProps={{
              textStyle: { text: "Play" },
            }}
          />
          <Button
            svgProps={{
              muiComponent: SkipNextIcon,
              height: "32px",
              width: "32px",
            }}
            tooltipProps={{
              textStyle: { text: "Next" },
            }}
          />
          <Button
            svgProps={{
              muiComponent: RepeatRoundedIcon,
              height: "22px",
              width: "22px",
            }}
            tooltipProps={{
              textStyle: { text: "Enable Repeat" },
            }}
          />
        </div>
        <div className="music-progress">
          <span>2:10</span>
          <Slider />
          <span>4:10</span>
        </div>
      </CenterContainer>
      <RightContainer
        iconColor={theme?.quinary() ?? ""}
        iconHoverColor={theme?.senary() ?? ""}
      >
        <Button
          svgProps={{
            muiComponent: MicNoneOutlinedIcon,
            fill: theme?.quinary(),
            hoverFill: theme?.senary(),
            height: "22px",
            width: "22px",
          }}
          tooltipProps={{
            textStyle: { text: "Lyrics" },
          }}
        />
        <Button
          svgProps={{
            muiComponent: QueueMusicOutlinedIcon,
            fill: theme?.quinary(),
            hoverFill: theme?.senary(),
            height: "22px",
            width: "22px",
          }}
          tooltipProps={{
            textStyle: { text: "Queue" },
          }}
        />
        <Button
          svgProps={{
            muiComponent: DevicesOutlinedIcon,
            fill: theme?.quinary(),
            hoverFill: theme?.senary(),
            height: "22px",
            width: "22px",
          }}
          tooltipProps={{
            textStyle: { text: "Connect to a device" },
          }}
        />
        <Button
          svgProps={{
            muiComponent: VolumeUpOutlinedIcon,
            fill: theme?.quinary(),
            hoverFill: theme?.senary(),
            height: "22px",
            width: "22px",
          }}
          tooltipProps={{
            textStyle: { text: "Mute" },
          }}
        />
        <div className="slider-container">
          <Slider width={"100px"} />
        </div>
        <Button
          svgProps={{
            muiComponent: OpenInFullOutlinedIcon,
            height: "18px",
            width: "18px",
          }}
          tooltipProps={{
            textStyle: { text: "Full Screen" },
          }}
        />
      </RightContainer>
    </BottombarContainer>
  );
}

const BottombarContainer = styled.div<{
  color: string;
  bgColor: string;
  borderColor: string;
  height: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  width: 100%;
  height: ${(props) => props.height};
  min-height: 90px;
  border-top: ${(props) => `1px solid ${props.borderColor}`};
  font-weight: none;
  z-index: 10;
`;

const LeftContainer = styled.div<{
  artistNameTextColor: string;
  heartFillColor: string;
  hoverColor: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 15px 10px;
  column-gap: 20px;

  & .song-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 110px;
    overflow: hidden;
    white-space: nowrap;
    row-gap: 5px;

    & span {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
        color: ${(props) => props.hoverColor};
      }
    }

    & .song-name {
      font-size: 0.9rem;
    }

    & .song-artists {
      font-size: 0.7rem;
      color: ${(props) => props.artistNameTextColor};
    }
  }

  & .song-album-img {
    height: 60px;
    width: 60px;
  }
`;

const CenterContainer = styled.div<{
  textColor: string;
  playBtnFill: string;
  otherBtnsFill: string;
  hoverFill: string;
}>`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  width: 350px;
  min-width: 350px;
  justify-content: center;
  align-items: center;

  & .music-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 15px;
  }

  & .music-progress {
    display: flex;
    width: 100%;
    flex-direction: row;
    column-gap: 15px;
    align-items: center;
    font-size: 0.7rem;
    color: ${(props) => props.textColor};
  }
`;

const RightContainer = styled.div<{
  iconColor: string;
  iconHoverColor: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  column-gap: 15px;
`;
