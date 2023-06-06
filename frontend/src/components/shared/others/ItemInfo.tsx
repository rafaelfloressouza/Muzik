import { ReactElement } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "../buttons/Button";
import { IImgProps, ITextProps } from "../../../utils/types";
import { title } from "process";

type Props = {
  imgProps?: IImgProps;
  titleProps?: ITextProps;
  subTitleProps?: ITextProps;
};

export default function ItemInfo({
  imgProps = { src: "/images/test-img.png" },
  titleProps,
  subTitleProps,
}: Props): ReactElement {
  return (
    <ItemInfoContainer
      imgProps={imgProps}
      titleProps={titleProps}
      subTitleProps={subTitleProps}
    >
      <img />
      <div className="info">
        <span className="title">{titleProps?.text}</span>
        <span className="sub-title">{subTitleProps?.text}</span>
      </div>
    </ItemInfoContainer>
  );
}

const ItemInfoContainer = styled.div<{
  imgProps?: IImgProps;
  titleProps?: ITextProps;
  subTitleProps?: ITextProps;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  column-gap: 20px;

  & img {
    content: url(${(props) => props.imgProps?.src});
    height: ${(props) => props.imgProps?.height ?? "60px"};
    width: ${(props) => props.imgProps?.width ?? "60px"};
  }

  & .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    overflow: hidden;
    white-space: nowrap;
    row-gap: 5px;

    & .title {
      font-size: 0.9rem;
      color: ${(props) => props.titleProps?.color ?? "rgb(var(--senary))"};
    }

    & .sub-title {
      font-size: 0.7rem;
      color: ${(props) => props.subTitleProps?.color ?? "rgb(var(--quinary))"};

      &:hover {
        color: ${(props) =>
          props.subTitleProps?.hoverColor ?? "rgb(var(--senary))"};
        text-decoration: ${(props) =>
          props.subTitleProps?.hoverDecoration ?? "underline"};
        cursor: ${(props) => props.subTitleProps?.hoverCursor ?? "pointer"};
      }
    }
  }
`;
