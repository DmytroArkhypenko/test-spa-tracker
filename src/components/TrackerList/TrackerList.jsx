import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tracker } from '../Tracker/Tracker';

const List = styled.div`
margin-top: 25px;
`;

export const TrackerList = () => {
  const trackersFromServer = useSelector((trackers) => trackers);
  const trackerList = (trackersFromServer) || [];

  return (
    <List>
      {trackerList.map((tracker) => (
        <Tracker
          key={tracker.id}
          id={tracker.id}
          name={tracker.name}
          isActive={tracker.isActive}
          hours={tracker.hours}
          minutes={tracker.minutes}
          seconds={tracker.seconds}
          startingTime={tracker.startingTime}
        />
      ))}
    </List>
  );
};
