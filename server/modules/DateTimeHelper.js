const { DateTime } = require('luxon');

const utcEndOfToday = () => {
  return DateTime.fromISO(new Date().toISOString(), {zone: 'utc'}).endOf('day');
} 

const utcOneWeekAgo = () => {
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
  utcOneWeekAgo
};