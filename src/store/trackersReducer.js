const NEW = 'NEW';
const REMOVE = 'REMOVE';
const STOP = 'STOP';
const START = 'START';
const UPDATE_SEC = 'UPDATE_SEC';
const UPDATE_MIN = 'UPDATE_MIN';
const UPDATE_H = 'UPDATE_H';

export const add = (tracker) => ({
  type: NEW,
  payload: {
    tracker,
  },
});

export const remove = (id) => ({
  type: REMOVE,
  payload: {
    id,
  },
});

export const stop = (id) => ({
  type: STOP,
  payload: {
    id,
  },
});

export const start = (id, startingTime) => ({
  type: START,
  payload: {
    id,
    startingTime,
  },
});

export const updateSecond = (id, currentSecond, startingTime) => ({
  type: UPDATE_SEC,
  payload: {
    id,
    currentSecond,
    startingTime,
  },
});

export const updateMinute = (id) => ({
  type: UPDATE_MIN,
  payload: {
    id,
  },
});

export const updateHour = (id) => ({
  type: UPDATE_H,
  payload: {
    id,
  },
});

export const trackersReducer = (state, action) => {
  switch (action.type) {
    case NEW:
      return [...state, action.payload.tracker];

    case REMOVE:
      return state.filter((tracker) => tracker.id !== action.payload.id);

    case START:
      return state.map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            ...tracker,
            isActive: true,
          };
        }
        return tracker;
      });

    case STOP:
      return state.map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            ...tracker,
            isActive: false,
          };
        }
        return tracker;
      });

    case UPDATE_SEC:
      return state.map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            ...tracker,
            seconds: tracker.seconds + (action.payload.currentSecond - action.payload.startingTime),
            startingTime: action.payload.startingTime,
          };
        }
        return tracker;
      });

    case UPDATE_MIN:
      return state.map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            ...tracker,
            seconds: 0,
            minutes: tracker.minutes + 1,
          };
        }
        return tracker;
      });

    case UPDATE_H:
      return state.map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            ...tracker,
            minutes: 0,
            hours: tracker.hours + 1,
          };
        }
        return tracker;
      });
    default:
      return state;
  }
};
