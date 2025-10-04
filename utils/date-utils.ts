/**
 * Date formatting utilities for consistent date display across the application
 */

export interface DateFormatOptions {
  includeTime?: boolean;
  includeSeconds?: boolean;
  dateStyle?: 'short' | 'medium' | 'long' | 'full';
  timeStyle?: '12h' | '24h';
}

/**
 * Format a date to display date and time in a consistent format
 * @param date - The date to format (Date object, string, or timestamp)
 * @param options - Formatting options
 * @returns Object with formatted date and time strings
 */
export const formatDateTime = (
  date: Date | string | number,
  options: DateFormatOptions = {}
) => {
  const {
    includeTime = true,
    includeSeconds = false,
    dateStyle = 'short',
    timeStyle = '12h'
  } = options;

  const dateObj = new Date(date);

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return {
      date: 'Invalid Date',
      time: '',
      full: 'Invalid Date'
    };
  }

  // Date formatting options
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: dateStyle === 'short' ? '2-digit' : 'numeric',
    month: dateStyle === 'short' ? 'numeric' : dateStyle === 'medium' ? 'short' : 'long',
    day: 'numeric'
  };

  // Time formatting options
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: timeStyle === '12h'
  };

  if (includeSeconds) {
    timeOptions.second = '2-digit';
  }

  const formattedDate = dateObj.toLocaleDateString(undefined, dateOptions);
  const formattedTime = includeTime 
    ? dateObj.toLocaleTimeString(undefined, timeOptions)
    : '';

  return {
    date: formattedDate,
    time: formattedTime,
    full: includeTime ? `${formattedDate} ${formattedTime}` : formattedDate
  };
};

/**
 * Format date for table display (date on top, time below)
 * @param date - The date to format
 * @param options - Formatting options
 * @returns JSX element with formatted date and time
 */
export const formatTableDate = (
  date: Date | string | number,
  options: DateFormatOptions = {}
) => {
  const formatted = formatDateTime(date, options);
  
  return {
    date: formatted.date,
    time: formatted.time
  };
};

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 * @param date - The date to compare
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Quick formatters for common use cases
 */
export const dateFormatters = {
  // For tables: "12/25/2024" and "2:30 PM"
  table: (date: Date | string | number) => formatTableDate(date),
  
  // For cards: "Dec 25, 2024 at 2:30 PM"
  card: (date: Date | string | number) => formatDateTime(date, { dateStyle: 'medium' }),
  
  // For timestamps: "December 25, 2024 at 2:30:45 PM"
  timestamp: (date: Date | string | number) => formatDateTime(date, { 
    dateStyle: 'long', 
    includeSeconds: true 
  }),
  
  // Date only: "12/25/2024"
  dateOnly: (date: Date | string | number) => formatDateTime(date, { includeTime: false }),
  
  // Time only: "2:30 PM"
  timeOnly: (date: Date | string | number) => formatDateTime(date).time,
  
  // Relative: "2 hours ago"
  relative: (date: Date | string | number) => getRelativeTime(date)
};