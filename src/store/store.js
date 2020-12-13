import { createStore } from 'redux';
import { getStateFromStorage, saveStateToStorage } from '../localStorage';
import { trackersReducer } from './trackersReducer';

let initialState = getStateFromStorage();

if (initialState === undefined) {
  initialState = [];
}

const store = createStore(
  trackersReducer,
  initialState,
);

store.subscribe(() => {
  saveStateToStorage(store.getState());
});

export default store;
