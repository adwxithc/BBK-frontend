/**
 * Event management type definitions
 */

export interface IEventCategory {
  _id?: string;
  name: string;                    // "Annual Day", "Sports Day", "Teachers Day"
  description: string;             // Category description
  slug: string;                    // URL-friendly version: "annual-day"
  color: string;                   // Theme color for the category
  icon?: string;                   // Icon name or emoji
  isActive: boolean;               // Whether category is active
  createdBy: string;               // Admin ID who created
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id?: string;
  title: string;                   // "Annual Day 2026", "Sports Day 2025"
  description: string;             // Event description
  slug: string;                    // URL-friendly: "annual-day-2026"
  
  // Category relationship
  categoryId: string;              // Reference to EventCategory._id
  category?: IEventCategory;       // Populated category data
  
  // Event details
  date: Date;                      // Event start date
  endDate?: Date;                  // Optional end date for multi-day events
  time: string;                    // "10:00 AM - 4:00 PM"
  location: string;                // Venue details
  
  // Participants
  targetAgeGroups: string[];       // ["3-4 years", "5-6 years", "All"]
  maxParticipants?: number;        // Optional limit
  registrationRequired: boolean;   // Whether registration is needed
  registrationDeadline?: Date;     // Registration cutoff
  
  // Media
  coverImage?: string;             // Main event poster/image
  gallery: IEventGalleryImage[];   // Event photos
  
  // Status
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  featured: boolean;               // Whether to feature on homepage
  
  // Metadata
  createdBy: string;               // Admin ID
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventGalleryImage {
  _id?: string;
  url: string;                     // Image URL
  caption?: string;                // Optional image caption
  altText?: string;                // Accessibility text
  featured: boolean;               // Whether image is featured
  order: number;                   // Display order
  uploadedAt: Date;
}

// API Response types
export interface IEventCategoryResponse {
  success: boolean;
  data: IEventCategory | IEventCategory[];
  message?: string;
}

export interface IEventResponse {
  success: boolean;
  data: IEvent | IEvent[];
  message?: string;
}

// Form types
export interface IEventCategoryForm {
  name: string;
  description: string;
  color: string;
  icon?: string;
  coverImage?: File | string;
  isActive: boolean;
}

export interface IEventForm {
  title: string;
  description: string;
  categoryId: string;
  date: string;                    // ISO date string for forms
  endDate?: string;
  time: string;
  location: string;
  targetAgeGroups: string[];
  maxParticipants?: number;
  registrationRequired: boolean;
  registrationDeadline?: string;
  coverImage?: File | string;
  status: 'draft' | 'published';
  featured: boolean;
}

// Filter types
export interface IEventFilters {
  categoryId?: string;
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  featured?: boolean;
}

export interface IEventCategoryFilters {
  isActive?: boolean;
  search?: string;
}