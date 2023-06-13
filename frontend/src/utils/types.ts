import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// Interfaces

export interface ITextProps {
  text?: string;
  size?: string;
  color?: string;
  selectedColor?: string;
  hoverColor?: string;
  weight?: string;
  hoverDecoration?: string;
  margin?: string;
  hoverCursor?: string;
  onClick?: () => void;
}

export interface IContainerProps {
  width?: string;
  height?: string;
  bgColor?: string;
  hoverBgColor?: string;
  selectedBgColor?: string;
  borderRadius?: string;
  padding?: string | number;
  boxShadow?: string;
  alignItems?: string;
  justifyContent?: string;
  position?: "relative" | "absolute";
  opacity?: string;
  right?: string;
  left?: string;
  top?: string;
  bottom?: string;
  animate?: boolean;
  selected?: boolean;
  hoverCursor?: string;
  border?: string;
  hoverBorder?: string;
  onClick?: (a?: any, b?: any) => void;
  refEl?: React.MutableRefObject<HTMLDivElement | null>;
  margin?: string;
}

export interface ISvgProps extends IContainerProps {
  fileUrl?: string[] | string;
  muiComponent?:
    | OverridableComponent<SvgIconTypeMap<{}, "svg">>
    | OverridableComponent<SvgIconTypeMap<{}, "svg">>[]
    | undefined;
  fill?: string;
  hoverFill?: string;
}

export interface ICardProps extends IContainerProps {
  closeIconColor?: string;
}

export interface IImgProps extends IContainerProps {
  src?: string;
}

export interface ITooltipProps {
  containerStyle?: IContainerProps;
  textStyle?: ITextProps;
  placement?:
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | undefined;
}

// Enums

export enum Ordering {
  BeforeText = 0,
  AfterText = 1,
}
