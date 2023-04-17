import { ReactElement, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./shared/containers/Card";
import { ThemeContext } from "../contexts/ThemeContext";
import Row from "./shared/containers/Row";
import RowTitle, { TitleType } from "./shared/containers/Title";
import HomeTitle from "./shared/containers/Title";
import Title from "./shared/containers/Title";

type Props = {
  scrollChanged: (scrollTop: number) => void;
};

export default function Home({ scrollChanged }: Props): ReactElement {
  // Contexts
  const theme = useContext(ThemeContext);

  // Refs
  const homeDivRef = useRef<HTMLDivElement | null>(null);

  // useEffects
  useEffect(() => {
    const scrollHostElement = homeDivRef.current;
    if (!scrollHostElement) return;
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return () => {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Helpers
  const getCards = () => {
    const cards = [];
    for (let i = 0; i < 7; i++) {
      cards.push(
        <Card
          key={i}
          cardStyle={{
            height: "13vw",
            width: "9vw",
            bgColor: theme?.octonary(),
            hoverBgColor: theme?.secondary(),
          }}
          descStyle={{ color: theme?.quinary() }}
        />
      );
    }
    return cards;
  };

  const getCardRows = () => {
    const cardRows = [];
    for (let i = 0; i < 10; i++) {
      cardRows.push(
        <>
          <Title title={"Electronic/Dance"} type={TitleType.WithShowAll} />
          <Row key={i} children={getCards()} />
        </>
      );
    }
    return cardRows;
  };

  // Handlers
  const handleScroll = () => {
    const scrollHostElement = homeDivRef.current;
    if (!scrollHostElement) return;
    scrollChanged(scrollHostElement.scrollTop);
  };

  return (
    <HomeContainer ref={homeDivRef} bgColor={theme?.tertiary() ?? ""}>
      {getCardRows()}
    </HomeContainer>
  );
}

const HomeContainer = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 30px;
  overflow-y: auto;
  padding-top: 90px;
  background-color: ${(props) => props.bgColor};
`;
