import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import Bottombar from "./components/Bottombar";

export default function App() {
  return (
    <AppContainer>
      <ThemeProvider>
        <TopContainer>
          <Sidebar />
          <Main />
        </TopContainer>
        <Bottombar />
      </ThemeProvider>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 90px);
  width: 100%;
  background-color: red;
`;

const Main = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  background-color: rgb(18, 18, 18);
`;
