import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <AppContainer>
      <ThemeProvider>
        <Sidebar></Sidebar>
        <Tmp></Tmp>
      </ThemeProvider>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: red;
`;

const Tmp = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  background-color: rgb(18, 18, 18);
`;
