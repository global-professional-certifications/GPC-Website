import type { CmsData } from '../../types/cms';

/**
 * Shared by app/(site)/upcoming/page.tsx (server) and Upcoming.tsx (browser).
 *
 * Kept out of Upcoming.tsx on purpose: that file is 'use client', and a server
 * file cannot call a function defined in a client-only module.
 */

// Helper to check if an item is active (handling Auto Inactive expiration)
export const isItemActive = (item: CmsData) => {
  if (!item || !item.isActive) return false;
  if (item.enableAutoInactive && item.autoInactiveDateTime) {
    const inactiveTime = new Date(item.autoInactiveDateTime).getTime();
    if (!isNaN(inactiveTime) && Date.now() >= inactiveTime) {
      return false;
    }
  }
  return true;
};
