/**
 * Utility functions for UI-related operations
 */

import { TabType } from '@/types/admin';

/**
 * Gets the title for a tab
 * @param tab - The tab type
 * @returns Formatted tab title
 */
export const getTabTitle = (tab: TabType): string => {
  return tab === 'overview' ? 'Dashboard Overview' : tab.charAt(0).toUpperCase() + tab.slice(1);
};

/**
 * Gets the description for a tab
 * @param tab - The tab type
 * @returns Formatted tab description
 */
export const getTabDescription = (tab: TabType): string => {
  return tab === 'overview' 
    ? 'Welcome to your admin dashboard' 
    : `Manage your ${tab} efficiently`;
};