/**
 * Combines multiple class names into a single string
 * @param {...string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date to a readable string
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Truncate a string to a specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated string
 */
export function truncateString(str, length = 50) {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}