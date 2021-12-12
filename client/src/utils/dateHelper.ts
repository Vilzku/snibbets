/**
 * Format the created at or updated at date to a human readable format
 * @param dateString
 * @returns
 */
export const getCreatedAtString = (dateString: string) => {
  const date = new Date(dateString);

  // X hours ago, or Y minutes ago
  const hoursAgo = new Date();
  hoursAgo.setHours(hoursAgo.getHours() - 10);
  if (date.getTime() > hoursAgo.getTime()) {
    for (let i = 9; i > 0; i--) {
      hoursAgo.setHours(hoursAgo.getHours() + 1);
      if (date.getTime() < hoursAgo.getTime()) return `${i} hours ago`;
    }
    for (let i = 59; i > 0; i--) {
      hoursAgo.setMinutes(hoursAgo.getMinutes() + 1);
      if (date.getTime() < hoursAgo.getTime()) return `${i} minutes ago`;
    }
  }

  // Today, but more than 10 hours ago
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date.getTime() > today.getTime()) {
    return `Today`;
  }

  // Yesterday, but more than 10 hours ago
  const yesterday = new Date();
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getTime() > yesterday.getTime()) {
    return "Yesterday";
  }

  // Any other date
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${months[month]} ${day + suffix}, ${year}`;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
