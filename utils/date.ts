const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

export function getCurrentDate() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  return {
    day: DAYS[now.getDay()],
    month: MONTHS[now.getMonth()],
    date: now.getDate(),
    year: now.getFullYear(),
    monthIndex: now.getMonth(),
    fullDate: now
  }
}

export function getFormattedDate() {
  const { day, month, date, year } = getCurrentDate()
  return `${day}, ${month} ${date}, ${year}`
}

export function getMonthYear() {
  const { month, year } = getCurrentDate()
  return `${month} ${year}`
}

export function getFormattedShortDate() {
  const { month, date, year } = getCurrentDate()
  return `${month.slice(0, 3)} ${date}, ${year}`
}