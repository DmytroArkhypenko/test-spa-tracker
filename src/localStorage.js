import moment from 'moment';

export const getStateFromStorage = () => {
  try {
    const trackersFromStorage = window.localStorage.getItem('trackers');
    if (trackersFromStorage === null) {
      return undefined;
    }

    const trackers = JSON.parse(trackersFromStorage);

    return trackers.map((currentTracker) => {
      if (currentTracker.isActive) {
        const totalSecInSleep = (moment().unix() - currentTracker.startingTime);

        const hoursInSleep = Math.floor(totalSecInSleep / 360);
        const minutesInSleep = Math.floor(totalSecInSleep / 60) - (hoursInSleep * 60);
        const secondsInSleep = totalSecInSleep - (hoursInSleep * 60 * 60) - (minutesInSleep * 60);

        let hours = hoursInSleep + currentTracker.hours;
        let minutes = minutesInSleep + currentTracker.minutes;
        let seconds = secondsInSleep + currentTracker.seconds;

        if (seconds > 59) {
          minutes += 1;
          seconds = 0;
        }

        if (minutes > 59) {
          hours += 1;
          minutes = 0;
        }

        return {
          ...currentTracker,
          seconds,
          minutes,
          hours,
        };
      }
      return currentTracker;
    });
  } catch (e) {
    return undefined;
  }
};

export const saveStateToStorage = (trackers) => window.localStorage.setItem('trackers', JSON.stringify(trackers));
