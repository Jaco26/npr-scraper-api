const { DateTime } = require('luxon');

const utcStartOfDay = (dateStr) => {
  return DateTime.fromISO(new Date(dateStr).toISOString(), {zone: 'utc'});
}

const utcEndOfDay = (dateStr) => {
  return DateTime.fromISO(new Date(dateStr).toISOString(), {zone: 'utc'}).endOf('day');
}

module.exports = { utcStartOfDay, utcEndOfDay};