export function formatDateOrTime(
  date: Date,
  options: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleString("en-US", options);
}

export function formatDateByParts(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  // Format using the Intl.DateTimeFormat API
  const formattedDateParts = new Intl.DateTimeFormat(
    "en-US",
    options
  ).formatToParts(date);
  // Extract the formatted date parts
  const year = formattedDateParts.find((part) => part.type === "year")?.value;
  const month = formattedDateParts.find((part) => part.type === "month")?.value;
  const day = formattedDateParts.find((part) => part.type === "day")?.value;
  const hour = formattedDateParts.find((part) => part.type === "hour")?.value;
  const minute = formattedDateParts.find(
    (part) => part.type === "minute"
  )?.value;
  const dayPeriod = formattedDateParts.find(
    (part) => part.type === "dayPeriod"
  )?.value;
  // Combibe the formatted date parts into a string
  const formattedDate = `${year}-${month}-${day} ${hour}:${minute} ${dayPeriod}`;

  return formattedDate;
}
