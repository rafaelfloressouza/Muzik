import { ReactElement, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./shared/Card";
import { ThemeContext } from "../contexts/ThemeContext";

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
            height: "15vw",
            width: "9vw",
            bgColor: theme?.octonary(),
            hoverBgColor: theme?.secondary(),
            padding: "",
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
        <CardContainer key={i} showAllColor={theme?.quinary() ?? ""}>
          <div className="top">
            <span className="title">Electronic/Dance</span>
            <span className="show-all">Show all</span>
          </div>
          <div className="bottom">{getCards().map((el) => el)}</div>
        </CardContainer>
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
      {getCardRows().map((el) => el)}
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

const CardContainer = styled.div<{
  showAllColor: string;
}>`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  width: 100%;

  & .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & .title {
      font-size: 1.4rem;
      font-weight: bold;
    }

    & .show-all {
      color: ${(props) => props.showAllColor};
      font-size: 0.85rem;
      font-weight: bold;
      transition: ease-in-out 0.1s;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  & .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
