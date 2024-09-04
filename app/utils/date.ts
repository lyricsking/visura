export function formatDateOrTime(date: Date, options: Intl.DateTimeFormatOptions): string {
  return date.toLocaleString('en-US', options).replace(' ', '');
}