import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { add } from '../../store/trackersReducer';

export const Container = styled.div`
  display: flex;
  width: 540px;
  margin-top: 15px;
  height: 45px;
  border-radius: 45px;
  border: 1px solid #7f7f7f;
  align-items: center;
  @media (max-width: 564px) {
    width: calc(100% - 24px);
    padding-left: 0;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const InputBody = styled.input`
  padding-left: 21px;
  outline: none;
  border: none;
  width: 90%;
  height: 95%;
  font-size: 14px;
  border-radius: 45px;
`;

export const Button = styled.svg`
  align-items: center;
  width: 45px;
  height: 45px;
`;

export const New = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const onTrackerNameCahnge = (event) => {
    setName(event.target.value);
  };

  const createTracker = (event) => {
    event.preventDefault();
    const tracker = {
      id: Date.now(),
      name: name || Date.now(),
      isActive: true,
      seconds: 0,
      minutes: 0,
      hours: 0,
      startingTime: moment().unix(),
    };
    dispatch(add(tracker));
    setName('');
  };

  return (
    <Container>
      <InputBody
        value={name}
        onChange={(event) => onTrackerNameCahnge(event)}
        placeholder="Name new tracker"
      />
      <Button
        viewBox="2 2 20 20"
        onClick={(event) => createTracker(event)}
      >
        <path fill="green" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </Button>
    </Container>
  );
};
