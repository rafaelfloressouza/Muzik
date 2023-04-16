import { ReactElement, useContext, useRef, useState } from "react";
import Menu, { IMenuItemProps, MenuItemType } from "./Menu";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import Button from "../buttons/Button";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Ordering } from "../../../utils/types";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export interface ISorterItem {
  id: string | number;
  text: string;
}

type Props = {
  items?: ISorterItem[];
  width?: string;
  showSortBy?: boolean;
  onClick?: (id: ISorterItem) => void;
};

export default function Sorter({
  items,
  width = "160px",
  showSortBy = true,
  onClick,
}: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // State
  const [selectedItem, setSelectedItem] = useState<number | string | null>(
    items && items?.length > 0 ? items[0].id : null
  );
  const [menuOpened, setMenuOpened] = useState(false);

  // Refs
  const filterOrderBtnRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Menu
        open={menuOpened}
        listenForClickAway={true}
        menuProps={{ refEl: filterOrderBtnRef, width: width }}
        menuItemProps={(showSortBy
          ? [
              {
                itemProps: {
                  padding: "10px 40px 10px 10px",
                  hoverBgColor: "transparent",
                },
                textProps: {
                  text: "Sort by",
                  size: "0.7rem",
                  color: theme?.quinary(),
                },
                type: MenuItemType.Standard,
              } as IMenuItemProps,
            ]
          : []
        ).concat(
          items?.map((el: ISorterItem) => {
            return {
              id: el.id,
              itemProps: {
                padding: "8px",
                bgColor:
                  selectedItem == el.id ? theme?.quinary(0.2) : "transparent",
                hoverBgColor: theme?.quinary(0.2),
              },
              textProps: {
                text: el.text,
                color:
                  selectedItem === el.id ? theme?.primary() : theme?.senary(),
              },
              iconProps: {
                muiComponent: CheckIcon,
                fill: selectedItem === el.id ? theme?.primary() : "transparent",
                height: "20px",
                width: "20px",
              },
              type: MenuItemType.WithIcon,
              onClick: () => {
                if (onClick) onClick(el);
                setSelectedItem(el.id);
              },
            } as IMenuItemProps;
          }) ?? []
        )}
        setOpen={(open: boolean) => setMenuOpened(open)}
      />
      <Button
        buttonProps={{
          onClick: () => setMenuOpened(!menuOpened),
          refEl: filterOrderBtnRef,
        }}
        textProps={{
          text: "Custom order",
          color: theme?.quinary(),
          hoverColor: theme?.senary(),
        }}
        svgProps={{
          muiComponent: !menuOpened ? ArrowDropDownSharpIcon : ArrowDropUpIcon,
        }}
        ordering={Ordering.AfterText}
        colGap="2px"
      />
    </>
  );
}
