import * as Material from "@mui/material";
import { ReactElement, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "./StandardButton";
import { IContainerProps, ISvgProps, ITextProps } from "../../../utils/types";

// Types of Items in a menu
export enum MenuItemType {
  Standard,
  WithIcon,
  Divider,
  Expandable,
}

// Menu Items Props
export interface IMenuItemProps extends IContainerProps {
  id?: number | string;
  itemProps?: IContainerProps;
  textProps?: ITextProps;
  iconProps?: ISvgProps;
  type: MenuItemType;
}

// Menu Props
export interface IMenuProps extends IContainerProps {
  placement?: any;
}

type Props = {
  menuProps?: IMenuProps;
  menuItemProps?: IMenuItemProps[];
  open?: boolean;
  setOpen?: (open: boolean) => void;
  listenForClickAway?: boolean;
};

export default function Menu({
  menuProps,
  menuItemProps,
  open = false,
  setOpen,
  listenForClickAway = false,
}: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // Handlers
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      !listenForClickAway ||
      (menuProps?.refEl?.current &&
        menuProps?.refEl?.current.contains(event.target as HTMLElement))
    )
      return;
    if (setOpen) setOpen(false);
  };

  return (
    <>
      {menuItemProps && menuItemProps?.length > 0 && (
        <Material.Popper
          open={open}
          anchorEl={menuProps?.refEl?.current}
          placement={menuProps?.placement ?? "bottom-end"}
          transition
          sx={{ zIndex: "300", padding: 0 }}
        >
          {({ TransitionProps, placement }) => (
            <Material.Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement,
                marginTop: "10px",
                background: menuProps?.bgColor ?? theme?.secondary() ?? "",
                width: menuProps?.width ?? "190px",
                maxWidth: menuProps?.width ?? "190px",
                height: menuProps?.height ?? "auto",
                maxHeight: menuProps?.height ?? "auto",
              }}
            >
              <Material.Paper sx={{ padding: "5px 0px" }}>
                <Material.ClickAwayListener onClickAway={handleClose}>
                  <Material.MenuList sx={{ padding: "0 5px", margin: 0 }}>
                    {menuItemProps.map((item: IMenuItemProps, idx: number) => {
                      switch (item.type) {
                        case MenuItemType.Divider:
                          return (
                            <Divider
                              key={idx}
                              color={theme?.quaternary(0.7) ?? ""}
                            />
                          );
                        default:
                          return (
                            <MenuItem
                              key={idx}
                              menuItemProps={item}
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
  menuItemProps: IMenuItemProps;
  handleClose: (event: Event | React.SyntheticEvent) => void;
};

function MenuItem({ menuItemProps, handleClose }: MenuItemProps): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  return (
    <Material.MenuItem
      onClick={(e) => {
        menuItemProps?.itemProps?.onClick?.();
        handleClose(e);
      }}
      sx={{
        fontSize: menuItemProps.textProps?.size ?? "0.82rem",
        color: menuItemProps.textProps?.color ?? theme?.senary(),
        display: "flex",
        flexDirection: menuItemProps?.itemProps?.flexDir ?? "row",
        justifyContent:
          menuItemProps?.itemProps?.justifyContent ?? "space-between",
        alignItems: menuItemProps?.itemProps?.alignItems ?? "center",
        rowGap: menuItemProps?.itemProps?.rowGap ?? "0",
        columnGap: menuItemProps?.itemProps?.colGap ?? "0",
        width: "100%",
        padding: menuItemProps?.itemProps?.padding ?? "8px",
        backgroundColor: menuItemProps?.itemProps?.bgColor ?? "transparent",
        fontWeight: menuItemProps?.textProps?.weight,

        "&:hover": {
          backgroundColor:
            menuItemProps?.itemProps?.hoverBgColor ?? theme?.senary(0.2),
        },
      }}
    >
      <>
        {menuItemProps?.textProps?.text}
        {menuItemProps.type === MenuItemType.WithIcon &&
          menuItemProps?.iconProps &&
          menuItemProps?.iconProps?.muiComponent && (
            <Button
              svgProps={{
                ...menuItemProps?.iconProps,
              }}
              noChangeColorSvg={true}
            />
          )}
        {menuItemProps.type === MenuItemType.WithIcon &&
          menuItemProps?.iconProps &&
          menuItemProps?.iconProps?.fileUrl && (
            <Button
              svgProps={{
                ...menuItemProps?.iconProps,
              }}
              noChangeColorSvg={true}
            />
          )}
        {menuItemProps.type === MenuItemType.Expandable && (
          <Button
            svgProps={{
              ...menuItemProps?.iconProps,
            }}
            noChangeColorSvg={true}
          />
        )}
      </>
    </Material.MenuItem>
  );
}

function Divider({ color }: { color: string }): ReactElement {
  return <Material.Divider sx={{ background: color }} />;
}
