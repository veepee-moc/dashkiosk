import Moment from 'moment';

export default function availability(props) {
  var _ = require('lodash');
  var message = 'The dashboard will be displayed only when availability rules allow it. ';
  var later = window.later;

  if (!later)
    return;
  const schedules = () => {
    var lines = (props.input || '').match(/[^\r\n]+/g);
    later.date.localTime();
    var scheds = _.map(lines, function (line) {
      var sched = later.parse.text('every 1 second ' + line);
      if (sched.error !== -1) {
        return false;
      }
      return later.schedule(sched);
    });
    return _.without(scheds || [], false);
  }
  const isAvailable = () => {
    var now = new Date(),
      scheds = schedules();
    if (scheds.length === 0) {
      return true;
    }
    return _.reduce(scheds, function (current, sched) {
      return current || sched.isValid(now);
    }, false);
  };
  const nextAvailable = (available) => {
    var scheds = schedules();
    var ranges = _.map(scheds,  (s) => s.nextRange());
    if (ranges.length === 0)
      return null;
    var range = ranges.sort((a, b) => a[0] - b[0])[0];
    const date = "dddd, MMMM D, YYYY ";
    const hour = "H:mm";
    if (available) {
      var from = Moment(range[0]).format(date) + "at " + Moment(range[0]).format(hour);
      if (range[1])
        return (from + ' until ' + Moment(range[1]).format(date + hour) + '.');
    }
    return (Moment(range[1]).format(date + hour) + '.');
  }
  if (isAvailable()) {
    if (nextAvailable(false)) {
      return (message + "Currently, it is available for display. It will become unavailable from " +
        nextAvailable(false));
    }
    return (message + "Currently, it is available for display.");
  }
  else {
    if (nextAvailable(true)) {
      return (message + "Currently, it is not available for display. It will be displayed from " +
        nextAvailable(true));
    }
    return (message + "Currently, it is not available for display.");
  }
};