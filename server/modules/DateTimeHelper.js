const { DateTime } = require('luxon');

const utcStartOfToday = () => {
  return DateTime.fromISO(new Date().toISOString(), {zone: 'utc'}).startOf('day');
}

const utcEndOfToday = () => {
  return DateTime.fromISO(new Date().toISOString(), {zone: 'utc'}).endOf('day');
} 

const utcStartOfDayOneWeekAgo = () => {
  return DateTime.fromISO(new Date().toISOString(), {zone: 'utc'}).minus({weeks: 1}).startOf('day');
}

const utcStartOfDay = (dateStr) => {
  return DateTime.fromISO(new Date(dateStr).toISOString(), {zone: 'utc'});
}

const utcEndOfDay = (dateStr) => {
  return DateTime.fromISO(new Date(dateStr).toISOString(), {zone: 'utc'}).endOf('day');
}

module.exports = { 
  utcStartOfDay, 
  utcEndOfDay,
  utcEndOfToday,
  utcStartOfToday,
  utcStartOfDayOneWeekAgo
};