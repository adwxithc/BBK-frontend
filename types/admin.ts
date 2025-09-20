export interface Student {
  id: string;
  name: string;
  age: number;
  parent: string;
  contact: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'active' | 'completed';
}

export interface StatCard {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  change?: string;
  trend?: 'up' | 'down';
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type TabType = 'overview' | 'students' | 'events' | 'gallery' | 'settings';