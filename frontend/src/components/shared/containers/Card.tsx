import { ReactElement, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { ICardProps, IImgProps, ITextProps } from "../../../utils/types";
import { PlayButton } from "../buttons/Button";

export enum CardType {
  WithImg,
  Plain,
}

type Props = {
  cardProps?: ICardProps;
  imgProps?: IImgProps;
  titleProps?: ITextProps;
  descProps?: ITextProps;
  cardType?: CardType;
  closeable?: boolean;
  descHoverable?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  onDescItemClick?: () => void;
};

export default function Card({
  cardProps,
  imgProps,
  titleProps,
  descProps,
  cardType = CardType.WithImg,
  closeable = false,
  descHoverable = false,
  onClick,
  onClose,
  onDescItemClick,
}: Props): ReactElement {
  const [hoveredOn, setHoveredOn] = useState(false);

  return (
    <>
      {cardType === CardType.WithImg && (
        <CardWithImgContainer
          cardProps={cardProps}
          imgProps={imgProps}
          titleProps={titleProps}
          descProps={descProps}
          onMouseEnter={() => setHoveredOn(true)}
          onMouseLeave={() => setHoveredOn(false)}
          hoveredOn={hoveredOn}
          descHoverable={descHoverable}
          onClick={onClick}
        >
          {closeable && <CloseIcon className="close-btn" onClick={onClose} />}
          <div className="img-container">
            <div className="img"></div>
            <PlayButton />
          </div>
          <div className="info">
            <span className="title">Daily Mix 1</span>
            <div className="description">
              <span onClick={onDescItemClick}>Jorge Drexler, </span>
              <span onClick={onDescItemClick}>Don Diablo, </span>
              <span onClick={onDescItemClick}>John Jhonny, </span>
              <span onClick={onDescItemClick}>Michael Jackson</span>
            </div>
          </div>
        </CardWithImgContainer>
      )}
      {cardType === CardType.Plain && (
        <PlainCardContainer cardProps={cardProps} titleProps={titleProps}>
          {titleProps?.text}
          <div className="placeholder-img" />
        </PlainCardContainer>
      )}
    </>
  );
}

const CardWithImgContainer = styled.div<{
  cardProps?: ICardProps;
  imgProps?: IImgProps;
  titleProps?: ITextProps;
  descProps?: ITextProps;
  hoveredOn?: boolean;
  descHoverable?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  min-width: 140px;
  min-height: 180px;
  width: ${(props) => props.cardProps?.width ?? "140px"};
  height: ${(props) => props.cardProps?.height ?? "180px"};
  padding: ${(props) => props.cardProps?.padding ?? "15px"};
  background-color: ${(props) => props.cardProps?.bgColor ?? "white"};
  border-radius: ${(props) => props.cardProps?.borderRadius ?? "5px"};
  transition: ease-in-out 0.2s;
  row-gap: 15px;
  position: relative;

  &:hover {
    background-color: ${(props) => props.cardProps?.hoverBgColor ?? "white"};
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
      border-radius: ${(props) => props.imgProps?.borderRadius};
      box-shadow: ${(props) =>
        props.imgProps?.boxShadow ?? "0 2px 15px 0px black"};
    }

    & .btn {
      position: absolute;
      bottom: ${(props) => (props.hoveredOn ? "10px" : "0px")};
      right: 10px;
      opacity: ${(props) => (props.hoveredOn ? 1 : 0)};
      transition: ease-in-out 0.3s;
    }
  }

  & .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transition: ease-in-out 0.1s;
    background-color: ${(props) => props.cardProps?.closeIconColor};

    &:hover {
      transform: scale(1.1);
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
      font-size: ${(props) => props?.titleProps?.size ?? "1rem"};
      color: ${(props) => props?.titleProps?.color ?? "white"};
      font-weight: bold;
    }

    & .description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: ${(props) => props?.descProps?.size ?? "0.85rem"};
      color: ${(props) => props?.descProps?.color ?? "white"};
      line-height: 25px;
      transition: ease-in-out 0.1s;

      & :hover {
        text-decoration: ${(props) =>
          props.descHoverable ? "underline" : "none"};
      }
    }
  }
`;

const PlainCardContainer = styled.div<{
  cardProps?: ICardProps;
  imgProps?: IImgProps;
  titleProps?: ITextProps;
}>`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: start;
  min-height: 120px;
  min-width: 120px;
  height: ${(props) => props.cardProps?.height ?? "100vw"};
  width: ${(props) => props.cardProps?.width};

  padding: 20px;
  background-color: ${(props) => props.cardProps?.bgColor};
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  font-size: ${(props) => props.titleProps?.size};
  color: ${(props) => props.titleProps?.color};
  font-weight: bold;
  line-height: 30px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.cardProps?.bgColor};
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
