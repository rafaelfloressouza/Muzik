import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import ButtonGroup, { IButtonProps } from "../shared/buttons/ButtonGroup";

export default function Search(): ReactElement {
  // Constants
  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Playlists" },
    { id: 3, name: "Songs" },
    { id: 4, name: "Artists" },
    { id: 5, name: "Profiles" },
    { id: 6, name: "Albums" },
    { id: 7, name: "Genres & Moods" },
    { id: 8, name: "Podcasts & Shows" },
    { id: 9, name: "Audiobooks" },
  ];

  // Contexts
  const theme = useContext(ThemeContext);

  return (
    <>
      <ButtonGroup
        containerProps={{
          margin: "60px 0 0",
          padding: "5px 5px 5px 30px",
          bgColor: theme?.tertiary(),
        }}
        elements={categories.map(
          ({
            id,
            name,
          }: {
            id: string | number;
            name: string;
          }): IButtonProps => {
            return {
              id: id,
              name: name,

              textProps: {
                color: theme?.senary(),
                selectedColor: theme?.tertiary(),
                weight: "normal",
                size: "0.8rem",
              },

              buttonProps: {
                bgColor: theme?.senary(0.1),
                hoverBgColor: theme?.senary(0.2),
                selectedBgColor: theme?.senary(),
                borderRadius: "50px",
                padding: "10px 12px",
                margin: "0 10px 0 0",
                onClick: () => {},
              },
            };
          }
        )}
      />
      <SearchContainer></SearchContainer>
    </>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  padding: 30px;
  overflow-y: auto;
  padding-top: 90px;
`;
