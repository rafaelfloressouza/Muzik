import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import Row from "./shared/containers/Row";
import Card from "./shared/containers/Card";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import Button from "./shared/buttons/Button";
import Title, { TitleType } from "./shared/containers/Title";

export enum CategoryType {
  Playlists = "Playlists",
  Podcasts = "Podcasts",
  Audiobooks = "Audiobooks",
  Artists = "Artists",
  Albums = "Albums",
}

type Props = {
  scrollChanged: (scrollTop: number) => void;
  category: CategoryType;
};

export default function YourLibrary({
  category,
  scrollChanged,
}: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // State
  const [data, setData] = useState([""]);

  // Refs
  const yourLibraryDivRef = useRef<HTMLDivElement | null>(null);

  // useEffects
  useEffect(() => {
    const scrollHostElement = yourLibraryDivRef.current;
    if (!scrollHostElement) return;
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return () => {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Handlers
  const handleScroll = () => {
    const scrollHostElement = yourLibraryDivRef.current;
    if (!scrollHostElement) return;
    scrollChanged(scrollHostElement.scrollTop);
  };

  // Helpers
  const getData = (): ReactElement[] => {
    let allPlaylists: ReactElement[] = [];
    for (let i = 0; i < 7; i++) {
      let playlists: ReactElement[] = [];
      for (let j = 0; j < 7; j++) {
        playlists.push(
          <Card
            key={j}
            cardStyle={{
              height: "13vw",
              width: "9vw",
              bgColor: theme?.octonary(),
              hoverBgColor: theme?.secondary(),
            }}
            descStyle={{ color: theme?.quinary() }}
            descHoverable={category === CategoryType.Albums}
          />
        );
      }
      allPlaylists.push(
        <Row key={i} titleLeftProps={{ text: i === 0 ? category : "" }}>
          {playlists}
        </Row>
      );
    }

    return allPlaylists;
  };

  const getEmptyPage = (): ReactElement => {
    switch (category) {
      case CategoryType.Playlists:
        return <></>;
      case CategoryType.Podcasts:
        return <></>;
      case CategoryType.Audiobooks:
        return (
          <EmptyAudiobooks>
            <ImportContactsOutlinedIcon
              sx={{ color: theme?.senary(), height: "70px", width: "70px" }}
            />
            <span className="title">Audiobooks you save will appear here</span>
            <span className="subtitle">
              Save audiobooks by tapping the save button.
            </span>
            <Button
              textProps={{
                text: "Find Audiobooks",
                weight: "bold",
                color: theme?.tertiary(),
                size: "0.9rem",
              }}
              buttonProps={{
                bgColor: theme?.senary(),
                padding: "15px 25px",
                borderRadius: "25px",
                animate: true,
              }}
            />
          </EmptyAudiobooks>
        );
      case CategoryType.Artists:
        return <></>;
      case CategoryType.Albums:
        return <></>;
    }
  };

  return (
    <YourLibraryContainer
      ref={yourLibraryDivRef}
      bgColor={theme?.tertiary() ?? ""}
      isEmpty={data.length <= 0}
    >
      {data.length > 0 && (
        <>
          <Title
            title={category}
            sorterCategories={[
              { id: 0, text: "Most Relevant" },
              { id: 1, text: "Recently Played" },
              { id: 2, text: "Recently Added" },
              { id: 3, text: "Alphabetical" },
              { id: 4, text: "Custom Order" },
            ]}
            type={TitleType.WithFilters}
          />
          {getData()}
        </>
      )}
      {data.length <= 0 && getEmptyPage()}
    </YourLibraryContainer>
  );
}

const YourLibraryContainer = styled.div<{ bgColor: string; isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  overflow-y: auto;
  background-color: ${(props) => props.bgColor};
  height: ${(props) => (props.isEmpty ? "100%" : "auto")};
  padding: 30px;
  padding-top: 90px;
`;

const EmptyAudiobooks = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  row-gap: 3rem;

  & .title {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;
