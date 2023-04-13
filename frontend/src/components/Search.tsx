import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import Card, { CardType } from "./shared/Card";
import Row from "./shared/Row";
import randomColor from "randomcolor";

export default function Search(): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  const getRecentRearches = (): ReactElement[] => {
    const cards: ReactElement[] = [];
    for (let i = 0; i < 5; i++) {
      cards.push(
        <Card
          key={i}
          cardStyle={{
            height: "13vw",
            width: "9vw",
            bgColor: theme?.octonary(),
            hoverBgColor: theme?.secondary(),
            closeIconColor: theme?.secondary(0.2),
          }}
          closeable={true}
          descStyle={{ color: theme?.quinary() }}
        />
      );
    }
    return cards;
  };

  const getCategoryCards = (): ReactElement[] => {
    const categoryCards: ReactElement[] = [];
    for (let i = 0; i < 12; i++) {
      categoryCards.push(
        <Row titleLeftStyle={{ text: i == 0 ? "Browse All" : "" }}>
          <Card
            cardStyle={{ bgColor: randomColor() }}
            cardType={CardType.Plain}
            titleStyle={{
              color: theme?.senary(),
              size: "1.2rem",
              text: "Asian Pacific Islander Heritage Month",
            }}
          />
          <Card
            cardStyle={{ bgColor: randomColor() }}
            cardType={CardType.Plain}
            titleStyle={{
              color: theme?.senary(),
              size: "1.2rem",
              text: "Asian Pacific Islander Heritage Month",
            }}
          />
          <Card
            cardStyle={{ bgColor: randomColor() }}
            cardType={CardType.Plain}
            titleStyle={{
              color: theme?.senary(),
              size: "1.2rem",
              text: "Asian Pacific Islander Heritage Month",
            }}
          />
          <Card
            cardStyle={{ bgColor: randomColor() }}
            cardType={CardType.Plain}
            titleStyle={{
              color: theme?.senary(),
              size: "1.2rem",
              text: "Asian Pacific Islander Heritage Month",
            }}
          />
          <Card
            cardStyle={{ bgColor: randomColor() }}
            cardType={CardType.Plain}
            titleStyle={{
              color: theme?.senary(),
              size: "1.2rem",
              text: "Asian Pacific Islander Heritage Month",
            }}
          />
          <Card
            cardStyle={{ bgColor: randomColor() }}
            cardType={CardType.Plain}
            titleStyle={{
              color: theme?.senary(),
              size: "1.2rem",
              text: "Asian Pacific Islander Heritage Month",
            }}
          />
          <Card
            cardStyle={{ bgColor: randomColor() }}
            cardType={CardType.Plain}
            titleStyle={{
              color: theme?.senary(),
              size: "1.2rem",
              text: "Asian Pacific Islander Heritage Month",
            }}
          />
        </Row>
      );
    }
    return categoryCards;
  };

  return (
    <SearchContainer bgColor={theme?.tertiary() ?? ""}>
      <Row justifyContent="left" titleLeftStyle={{ text: "Recent Searches" }}>
        {getRecentRearches()}
      </Row>
      {getCategoryCards()}
    </SearchContainer>
  );
}

const SearchContainer = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  padding: 30px;
  overflow-y: auto;
  padding-top: 90px;
  background-color: ${(props) => props.bgColor};
`;
