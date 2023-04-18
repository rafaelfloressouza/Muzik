import { ReactElement, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import Card, { CardType } from "../shared/containers/Card";
import Row from "../shared/containers/Row";
import Title from "../shared/containers/Title";

type Props = {
  scrollChanged: (scrollTop: number) => void;
};

export default function SearchBase({ scrollChanged }: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // Refs
  const searchDivRef = useRef<HTMLDivElement | null>(null);

  // useEffects
  useEffect(() => {
    const scrollHostElement = searchDivRef.current;
    if (!scrollHostElement) return;
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return () => {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Handlers
  const handleScroll = () => {
    const scrollHostElement = searchDivRef.current;
    if (!scrollHostElement) return;
    scrollChanged(scrollHostElement.scrollTop);
  };

  // Helpers
  const getRecentRearches = (): ReactElement[] => {
    const cards: ReactElement[] = [];
    for (let i = 0; i < 5; i++) {
      cards.push(
        <Card
          key={i + 10}
          cardStyle={{
            height: "13vw",
            width: "9vw",
            bgColor: theme?.octonary(),
            hoverBgColor: theme?.secondary(),
            closeIconColor: theme?.secondary(0.2),
          }}
          closeable={true}
          descStyle={{ color: theme?.quinary() }}
          descHoverable
        />
      );
    }
    return cards;
  };

  const getCards = (): ReactElement[] => {
    const cardList: ReactElement[] = [];
    for (let i = 0; i < 8; i++) {
      cardList.push(
        <Card
          key={i}
          cardStyle={{
            bgColor: "rgb(195, 64, 87, 0.5)",
            height: "7vw",
            width: "7vw",
          }}
          cardType={CardType.Plain}
          titleStyle={{
            color: theme?.senary(),
            size: "1.2rem",
            text: "Asian Pacific Islander Heritage Month",
          }}
        />
      );
    }

    return cardList;
  };

  const getCategoryCards = (): ReactElement[] => {
    const categoryCards: ReactElement[] = [];

    for (let i = 0; i < 12; i++) {
      categoryCards.push(<Row key={i}>{getCards()}</Row>);
    }
    return categoryCards;
  };

  return (
    <SearchBaseContainer ref={searchDivRef} bgColor={theme?.tertiary() ?? ""}>
      <>
        <Title title="Recent Searches" />
        <Row justifyContent="left">{getRecentRearches()}</Row>
      </>
      <>
        <Title title="Browse All" />
        {getCategoryCards()}
      </>
    </SearchBaseContainer>
  );
}

const SearchBaseContainer = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  padding: 30px;
  overflow-y: auto;
  padding-top: 90px;
  background-color: ${(props) => props.bgColor};
`;
