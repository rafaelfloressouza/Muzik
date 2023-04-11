import { ReactElement, useState } from "react";
import styled from "styled-components";
import PlayButton from "./PlayButton";

export interface ITextStyle {
  text?: string;
  size?: string;
  color?: string;
}

export interface ICardStyle {
  src?: string;
  width?: string;
  height?: string;
  padding: string;
  bgColor?: string;
  hoverBgColor?: string;
  borderRadius?: string;
  onClick?: () => void;
}

type Props = {
  cardStyle: ICardStyle;
  titleStyle?: ITextStyle;
  descStyle: ITextStyle;
};

export default function Card({
  cardStyle,
  titleStyle,
  descStyle,
}: Props): ReactElement {
  const [hoveredOn, setHoveredOn] = useState(false);

  return (
    <CardContainer
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
      <div className="img-container">
        <div className="img"></div>
        <PlayButton />
      </div>

      <div className="info">
        <span className="title">Daily Mix 1</span>
        <div className="description">
          This is a brief description of what this is doing.
        </div>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div<{
  cardStyle?: ICardStyle;
  titleStyle?: ITextStyle;
  descStyle?: ITextStyle;
  hoveredOn?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
  min-height: 210px;
  /* width: 140px;
  height: 210px; */
  width: ${(props) => props.cardStyle?.width ?? "140px"};
  height: ${(props) => props.cardStyle?.height ?? "210px"};
  padding: 15px;
  background-color: ${(props) => props.cardStyle?.bgColor ?? "white"};
  border-radius: ${(props) => props.cardStyle?.borderRadius ?? "5px"};
  transition: ease-in-out 0.2s;
  row-gap: 15px;

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

  & .info {
    height: 30%;
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
      line-height: 20px;
    }
  }
`;
