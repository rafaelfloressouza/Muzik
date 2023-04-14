import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// Interfaces

export interface ITextProps {
  text?: string;
  size?: string;
  color?: string;
  hoverColor?: string;
  weight?: string;
  onClick?: () => void;
}

export interface IContainerProps {
  width?: string;
  height?: string;
  bgColor?: string;
  hoverBgColor?: string;
  borderRadius?: string;
  padding?: string;
  boxShadow?: string;
  animate?: boolean;
  selected?: boolean;
  onClick?: () => void;
  ref?: React.MutableRefObject<HTMLElement | null>;
}

export interface ISvgProps extends IContainerProps {
  fileUrl?: string;
  muiComponent?: OverridableComponent<SvgIconTypeMap<{}, "svg">> | undefined;
  fill?: string;
  hoverFill?: string;
}

export interface ICardProps extends IContainerProps {
  src?: string;
  closeIconColor?: string;
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
