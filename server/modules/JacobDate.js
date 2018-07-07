module.exports = class JacobDate {
  static oneDayInMillis() {
    return 86400000;
  }
  static timezoneOffsetMilli(dateStr) {
    return (new Date(dateStr).getTimezoneOffset() * 60000) * 2;
  }
  static toUtc(dateStr) {
    const d = new Date(dateStr);
    const year = d.getFullYear(),
      month = d.getMonth(),
      day = d.getDate(),
      hour = d.getHours(),
      minute = d.getMinutes();
    return Date.UTC(year, month, day, hour, minute);
  }
  static startOfDay(dateStr) {
    const utcDate = this.toUtc(dateStr);
    const timezoneOffset = this.timezoneOffsetMilli(dateStr);
    return new Date(utcDate + timezoneOffset).toISOString().slice(0, 19);
  }
  static endOfDay(dateStr) {
    const utcDate = this.toUtc(dateStr);
    const timezoneOffset = this.timezoneOffsetMilli(dateStr);
    const nextDay = utcDate + timezoneOffset + this.oneDayInMillis();
    return new Date(nextDay).toISOString().slice(0, 19);
  }
  static adjustedToPrevDay(dateStr) {
    // This function takes in a previously tz-adjusted 
    // date string. Thus it does not need to account for 
    // time zone offset
    const prevDay = this.toUtc(dateStr) - this.oneDayInMillis();
    return new Date(prevDay).toISOString().slice(0, 19);
  }
}

