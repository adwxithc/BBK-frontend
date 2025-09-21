/**
 * Event management type definitions
 */

// Import IResponse from data types
import { IResponse, Ierror } from './data';

export interface IEventCategory {
  _id?: string;
  name: string;                    // "Annual Day", "Sports Day", "Teachers Day"
  description: string;             // Category description
  slug: string;                    // URL-friendly version: "annual-day"
  color: string;                   // Theme color for the category
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
  gallery: IEventMediaItem[];      // Event photos and videos
  
  // Status
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  featured: boolean;               // Whether to feature on homepage
  
  // Metadata
  createdBy: string;               // Admin ID
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventMediaItem {
  _id?: string;
  url: string;                     // Media URL (image or video)
  type: 'image' | 'video';         // Media type
  caption?: string;                // Optional media caption
  altText?: string;                // Accessibility text (mainly for images)
  thumbnail?: string;              // Thumbnail URL for videos
  duration?: number;               // Video duration in seconds
  featured: boolean;               // Whether media is featured
  order: number;                   // Display order
  uploadedAt: Date;
}

// Legacy interface for backward compatibility
export interface IEventGalleryImage {
  _id?: string;
  url: string;                     // Image URL
  caption?: string;                // Optional image caption
  altText?: string;                // Accessibility text
  featured: boolean;               // Whether image is featured
  order: number;                   // Display order
  uploadedAt: Date;
}

// Pagination interface
export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Categories list response with pagination
export interface IEventCategoriesData {
  categories: IEventCategory[];
  pagination: IPagination;
}

// API Response types (using standard IResponse<T> format)
export type IEventCategoryResponse = IResponse<IEventCategory>;
export type IEventCategoriesResponse = IResponse<IEventCategoriesData>;
export type IEventResponse = IResponse<IEvent>;
export type IEventsResponse = IResponse<IEvent[]>;

// Error Response types  
export type IApiErrorResponse = Ierror;

// Form types
export interface IEventCategoryForm {
  name: string;
  description: string;
  slug?: string;                   // Optional - will be auto-generated if not provided
  color: string;
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
  media?: IEventMediaUpload[];     // Multiple media files (images/videos)
  status: 'draft' | 'published';
  featured: boolean;
}

// Media upload interface for forms
export interface IEventMediaUpload {
  file?: File;                     // File object for new uploads
  url?: string;                    // URL for existing media
  type: 'image' | 'video';         // Media type
  caption?: string;                // Optional caption
  altText?: string;                // Accessibility text
  thumbnail?: File | string;       // Thumbnail for videos
  featured: boolean;               // Whether media is featured
  order: number;                   // Display order
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
  page?: number;
  limit?: number;
}

// Media-related constants and utilities
export const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif'] as const;
export const SUPPORTED_VIDEO_FORMATS = ['mp4', 'webm', 'mov', 'avi'] as const;

export type SupportedImageFormat = typeof SUPPORTED_IMAGE_FORMATS[number];
export type SupportedVideoFormat = typeof SUPPORTED_VIDEO_FORMATS[number];
export type SupportedMediaFormat = SupportedImageFormat | SupportedVideoFormat;

// Media validation interface
export interface IMediaValidation {
  maxFileSize: number;             // Maximum file size in bytes
  maxDuration?: number;            // Maximum video duration in seconds
  allowedFormats: SupportedMediaFormat[];
}

// Default media validation rules
export const DEFAULT_MEDIA_VALIDATION: Record<'image' | 'video', IMediaValidation> = {
  image: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFormats: [...SUPPORTED_IMAGE_FORMATS]
  },
  video: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    maxDuration: 300,                // 5 minutes
    allowedFormats: [...SUPPORTED_VIDEO_FORMATS]
  }
};