/**
 * Utility functions for admin-related operations
 */

/**
 * Truncates an email address to a specified maximum length
 * @param email - The email address to truncate
 * @param maxLength - Maximum length for the email (default: 20)
 * @returns Truncated email string
 */
export const truncateEmail = (email: string, maxLength: number = 20): string => {
  if (email.length <= maxLength) return email;
  
  const [localPart, domain] = email.split('@');
  if (localPart.length > maxLength - 8) {
    return `${localPart.substring(0, maxLength - 8)}...@${domain}`;
  }
  return email;
};

/**
 * Gets the page title from the admin path
 * @param path - The current pathname
 * @returns Formatted page title
 */
export const getPageTitle = (path: string): string => {
  if (path === '/admin') return 'Dashboard Overview';
  const segment = path.split('/admin/')[1];
  if (!segment) return 'Dashboard Overview';
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

/**
 * Gets the page description from the admin path and user data
 * @param path - The current pathname
 * @param userName - Optional user name for personalization
 * @returns Formatted page description
 */
export const getPageDescription = (path: string, userName?: string): string => {
  if (path === '/admin') {
    return userName 
      ? `Welcome back, ${userName}! Here's your admin dashboard`
      : 'Welcome to your admin dashboard';
  }
  const segment = path.split('/admin/')[1];
  if (!segment) {
    return userName 
      ? `Welcome back, ${userName}! Here's your admin dashboard`
      : 'Welcome to your admin dashboard';
  }
  return `Manage your ${segment} efficiently`;
};