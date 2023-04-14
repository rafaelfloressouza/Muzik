import * as Material from "@mui/material";
import { ReactElement, useContext } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import Svg from "./Svg";
import { ThemeContext } from "../../../contexts/ThemeContext";

export enum MenuItemType {
  Standard,
  WithIcon,
  Divider,
  Expandable,
}

export interface IMenuItem {
  label?: string;
  type: MenuItemType;
  icon?:
    | string
    | OverridableComponent<Material.SvgIconTypeMap<{}, "svg">>
    | undefined;
  items?: IMenuItem[];
}

export interface IMenuProps {
  elRef: React.MutableRefObject<HTMLDivElement | SVGElement | null>;
  items: IMenuItem[];
  setOpen: (open: boolean) => void;
}

export interface IMenuStyle {
  placement?: any;
  width?: string;
  height?: string;
  bgColor?: string;
  itemBgHoverColor?: string;
  textColor?: string;
  fontSize?: string;
  dividerColor?: string;
}

type Props = {
  open: boolean;
  menuProps: IMenuProps;
  menuStyle?: IMenuStyle;
  listenForClickAway?: boolean;
};

export default function Menu({
  menuProps,
  menuStyle,
  open,
  listenForClickAway = false,
}: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // Handlers
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      !listenForClickAway ||
      (menuProps?.elRef?.current &&
        menuProps?.elRef?.current.contains(event.target as HTMLElement))
    )
      return;
    menuProps?.setOpen(false);
  };

  return (
    <>
      {menuProps?.items.length > 0 && (
        <Material.Popper
          open={open}
          anchorEl={menuProps?.elRef.current}
          placement={menuStyle?.placement ?? "bottom-end"}
          transition
          sx={{ zIndex: "300", padding: 0 }}
        >
          {({ TransitionProps, placement }) => (
            <Material.Grow
              {...TransitionProps}
              style={{
                // transformOrigin: "center-top",
                // anchorOrigin: { vertical: "bottom", horizontal: "center" },
                // transformOrigin: { vertical: "top", horizontal: "center" },
                // placement === "bottom-start" ? "left top" : "left bottom",
                // transformOrigin: placement,
                marginTop: "10px",
                background: menuStyle?.bgColor ?? theme?.secondary() ?? "",
                width: menuStyle?.width ?? "190px",
                maxWidth: menuStyle?.width ?? "190px",
                height: menuStyle?.height ?? "auto",
                maxHeight: menuStyle?.height ?? "auto",
              }}
            >
              <Material.Paper sx={{ padding: "5px 0px" }}>
                <Material.ClickAwayListener onClickAway={handleClose}>
                  <Material.MenuList
                    sx={{ backgrounColor: "red", padding: "0 5px", margin: 0 }}
                  >
                    {menuProps.items.map((item: IMenuItem, idx: number) => {
                      switch (item.type) {
                        case MenuItemType.Divider:
                          return (
                            <Divider
                              key={idx}
                              color={
                                menuStyle?.dividerColor ??
                                theme?.quaternary(0.7) ??
                                ""
                              }
                            />
                          );
                        default:
                          return (
                            <MenuItem
                              key={idx}
                              data={item}
                              fontSize={menuStyle?.fontSize ?? "0.82rem"}
                              textColor={
                                menuStyle?.textColor ?? theme?.senary(0.9) ?? ""
                              }
                              itemBgHoverColor={
                                menuStyle?.itemBgHoverColor ??
                                theme?.senary(0.1) ??
                                ""
                              }
                              handleClose={handleClose}
                            />
                          );
                      }
                    })}
                  </Material.MenuList>
                </Material.ClickAwayListener>
              </Material.Paper>
            </Material.Grow>
          )}
        </Material.Popper>
      )}
    </>
  );
}

// Custom Menu Items

type MenuItemProps = {
  data: IMenuItem;
  fontSize: string;
  textColor: string;
  itemBgHoverColor: string;
  handleClose: (event: Event | React.SyntheticEvent) => void;
};

function MenuItem({
  data,
  fontSize,
  textColor,
  itemBgHoverColor,
  handleClose,
}: MenuItemProps): ReactElement {
  return (
    <Material.MenuItem
      onClick={handleClose}
      sx={{
        fontSize: fontSize,
        color: textColor,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "8px 6px",

        "&:hover": {
          backgroundColor: itemBgHoverColor,
        },
      }}
    >
      <>
        {data.label}
        {data.type === MenuItemType.WithIcon &&
          data.icon &&
          !(data.icon instanceof String) && (
            <Svg
              svgProps={{
                muiComponent: data.icon as OverridableComponent<
                  Material.SvgIconTypeMap<{}, "svg">
                >,
                fill: textColor,
                height: "18px",
                width: "18px",
              }}
              noChangeColorSvg={true}
            />
          )}
        {data.type === MenuItemType.WithIcon &&
          data.icon &&
          data.icon instanceof String && (
            <Svg
              svgProps={{
                fileUrl: data.icon as string,
                fill: textColor,
                height: "18px",
                width: "18px",
              }}
              noChangeColorSvg={true}
            />
          )}
        {data.type === MenuItemType.Expandable && (
          <Svg
            svgProps={{
              muiComponent: ArrowRightSharpIcon,
              fill: textColor,
              height: "18px",
              width: "18px",
            }}
            noChangeColorSvg={true}
          />
        )}
      </>
    </Material.MenuItem>
  );
}

// Custom Divider
type DividerProps = {
  color: string;
};

function Divider({ color }: DividerProps): ReactElement {
  return <Material.Divider sx={{ background: color }} />;
}
