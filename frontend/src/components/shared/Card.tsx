import { ReactElement, useState } from "react";
import styled from "styled-components";
import PlayButton from "./PlayButton";
import { ITextStyle } from "../../utils/types";
import CloseIcon from "@mui/icons-material/Close";

export enum CardType {
  WithImg,
  Plain,
}

export interface ICardStyle {
  src?: string;
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  hoverBgColor?: string;
  borderRadius?: string;
  closeIconColor?: string;
  onClick?: () => void;
  onClose?: () => void;
}

type Props = {
  cardStyle: ICardStyle;
  titleStyle?: ITextStyle;
  descStyle?: ITextStyle;
  cardType?: CardType;
  closeable?: boolean;
};

export default function Card({
  cardStyle,
  titleStyle,
  descStyle,
  cardType = CardType.WithImg,
  closeable = false,
}: Props): ReactElement {
  const [hoveredOn, setHoveredOn] = useState(false);

  return (
    <>
      {cardType === CardType.WithImg && (
        <CardWithImgContainer
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          descStyle={descStyle}
          onMouseEnter={() => setHoveredOn(true)}
          onMouseLeave={() => setHoveredOn(false)}
          hoveredOn={hoveredOn}
          onClick={() => {
            if (cardStyle?.onClick) cardStyle?.onClick();
          }}
        >
          {closeable && (
            <CloseIcon
              className="close-btn"
              onClick={() => {
                if (cardStyle?.onClose) cardStyle?.onClose();
              }}
            />
          )}
          <div className="img-container">
            <div className="img"></div>
            <PlayButton />
          </div>
          <div className="info">
            <span className="title">Daily Mix 1</span>
            <div className="description">
              <span>Jorge Drexler</span>, <span>Don Diablo</span>,
              <span>Jorge Drexler</span>, <span>Don Diablo</span>
            </div>
          </div>
        </CardWithImgContainer>
      )}
      {cardType === CardType.Plain && (
        <PlainCardContainer
          bgColor={cardStyle?.bgColor ?? "white"}
          titleStyle={titleStyle}
        >
          {titleStyle?.text}
          <div className="placeholder-img" />
        </PlainCardContainer>
      )}
    </>
  );
}

const CardWithImgContainer = styled.div<{
  cardStyle?: ICardStyle;
  titleStyle?: ITextStyle;
  descStyle?: ITextStyle;
  hoveredOn?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  min-width: 140px;
  min-height: 180px;
  width: ${(props) => props.cardStyle?.width ?? "140px"};
  height: ${(props) => props.cardStyle?.height ?? "180px"};
  padding: ${(props) => props.cardStyle?.padding ?? "15px"};
  background-color: ${(props) => props.cardStyle?.bgColor ?? "white"};
  border-radius: ${(props) => props.cardStyle?.borderRadius ?? "5px"};
  transition: ease-in-out 0.2s;
  row-gap: 15px;
  position: relative;

  &:hover {
    background-color: ${(props) => props.cardStyle?.hoverBgColor ?? "white"};
    cursor: pointer;
  }

  & .img-container {
    height: 60%;
    width: 100%;
    position: relative;

    & .img {
      background-color: gray;
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }

    & .svg {
      position: absolute;
      bottom: ${(props) => (props.hoveredOn ? "10px" : "0px")};
      right: 10px;
      border-radius: 50%;
      box-shadow: 0px 5px 5px 1px rgb(0, 0, 0, 0.2);
      opacity: ${(props) => (props.hoveredOn ? 1 : 0)};
      transition: ease-in-out 0.2s;
    }
  }

  & .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 300;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transition: ease-in-out 0.1s;
    background-color: ${(props) => props.cardStyle?.closeIconColor};

    &:hover {
      padding: 1px 1px 1px 1px;
      cursor: default;
    }
  }

  & .info {
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    row-gap: 0.6rem;

    & .title,
    .description {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & .title {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: ${(props) => props?.titleStyle?.size ?? "1rem"};
      color: ${(props) => props?.titleStyle?.color ?? "white"};
      font-weight: bold;
    }

    & .description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: ${(props) => props?.descStyle?.size ?? "0.85rem"};
      color: ${(props) => props?.descStyle?.color ?? "white"};
      line-height: 25px;
    }
  }
`;

const PlainCardContainer = styled.div<{
  bgColor: string;
  titleStyle?: ITextStyle;
}>`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: start;
  height: 170px;
  width: 170px;
  padding: 20px;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  font-size: ${(props) => props.titleStyle?.size};
  color: ${(props) => props.titleStyle?.color};
  font-weight: bold;
  line-height: 30px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.bgColor};
  }

  & .placeholder-img {
    position: absolute;
    bottom: 0;
    right: -20px;
    transform: rotate(25deg);
    width: 90px;
    height: 90px;
    background-color: gray;
  }
`;
