import React from "react";
import styled, {ThemeProvider} from "styled-components";
import Header from "./components/Header";
import {GlobalStyle} from "./theme/global";
import {Outlet} from "react-router-dom";
import {darkModeAtom} from "./store/atoms";
import {darkTheme, lightTheme} from "./theme/theme";
import {useRecoilValue} from "recoil";

const Wrapper = styled.div`
  padding: 20px;
`;
function App() {
  const theme = useRecoilValue(darkModeAtom);
  return (
    <>
      <ThemeProvider theme={!theme ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Wrapper>
          <Header />
          <Outlet />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
