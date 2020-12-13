import React from 'react';
import styled from 'styled-components';
import { New } from './components/New/New';
import { TrackerList } from './components/TrackerList/TrackerList';

const Container = styled.div`
  text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Header = styled.h1`
  font-size: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const App = () => (
  <Container>
    <Header>
      tracker
    </Header>
    <MainSection>
      <New />
      <TrackerList />
    </MainSection>
  </Container>
);

export default App;
