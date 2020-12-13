import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import {
  remove,
  stop,
  start,
  updateSecond,
  updateMinute,
  updateHour,
} from '../../store/trackersReducer';

import playButton from '../../assets/littlePlay.svg';
import stopButton from '../../assets/stop.svg';
import deleteButton from '../../assets/delete.svg';

const TrackerBody = styled.div`
  font-weight: bold;
  border-top: 1px solid #e5e5e5;
  height: 62px;
  width: 540px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:nth-last-child(-n+1){
    border-bottom: 1px solid #e5e5e5;
  }
  @media (max-width: 564px){
    width: 100%;
  }
`;

const TrackerName = styled.div`
  width: 200px;
  display: flex;
  text-align: left;
  padding-left: 21px;
  @media (max-width: 564px){
    width: 130px;
  }
`;

const Name = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Time = styled.div`
  margin-left: 100px;
  @media (max-width: 564px){
    margin-left: 0;
  }
`;

const Actions = styled.div`
  &:nth-child(1){
    margin-right: 10px;
    &:hover {
      cusror: pointer;
    }
  }
`;

const ControlsButton = styled.img`
`;

const DeleteButton = styled.img`
  margin-left: 3px;
  width: 24px;
  height: 24px;
`;
export const Tracker = ({
  id, name, isActive, hours, minutes, seconds,
}) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const startingTime = moment().unix();
    if (isActive) {
      if (minutes > 59) {
        dispatch(updateHour(id));
      }
      if (seconds > 59) {
        dispatch(updateMinute(id));
      }
      const interval = setInterval(() => {
        dispatch(updateSecond(id, moment().unix(), startingTime));
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const getTimeString = (secondsParam, minutesParam, hoursParam) => {
    const strS = secondsParam.toString();
    const strM = minutesParam.toString();
    const strH = hoursParam.toString();
    const sec = strS.length < 2 ? `0${strS}` : strS;
    const min = strM.length < 2 ? `0${strM}` : strM;
    const hou = strH.length < 2 ? `0${strH}` : strH;
    return `${hou}-${min}-${sec}`;
  };

  return (

    <TrackerBody
      style={isActive ? { color: 'green' } : { color: 'black' }}
    >
      <TrackerName>
        <Name>
          {name || `${id}`}
        </Name>
      </TrackerName>
      <Time>
        {getTimeString(seconds, minutes, hours)}
      </Time>
      <Actions>
        <ControlsButton
          src={isActive ? stopButton : playButton}
          onClick={() => (isActive ? dispatch(stop(id)) : dispatch(start(id)))}
        />
        <DeleteButton
          src={deleteButton}
          onClick={() => dispatch(remove(id))}
        />
      </Actions>
    </TrackerBody>
  );
};

Tracker.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive: PropTypes.bool.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};
