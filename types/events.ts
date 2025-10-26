/**
 * Event management type definitions
 */

// Import IResponse from data types
import { IResponse, Ierror } from './data';

export interface IEventCategory {
    _id?: string;
    name: string; // "Annual Day", "Sports Day", "Teachers Day"
    description: string; // Category description
    slug: string; // URL-friendly version: "annual-day"
    color: string; // Theme color for the category
    isActive: boolean; // Whether category is active
    createdBy: string; // Admin ID who created
    createdAt: Date;
    updatedAt: Date;
}

export interface IEvent {
    _id?: string;
    title: string; // "Annual Day 2026", "Sports Day 2025"
    description: string; // Event description
    slug: string; // URL-friendly: "annual-day-2026"

    // Category relationship
    categoryId: string; // Reference to EventCategory._id
    category?: IEventCategory; // Populated category data

    // Event details
    date: Date; // Event start date
    endDate?: Date; // Optional end date for multi-day events
    time: string; // "10:00 AM - 4:00 PM", "All Day"
    location: string; // Venue details

    // Media
    coverImage?: string; // Main event poster/image URL
    gallery: IEventMediaItem[]; // Event photos and videos

    // Status
    status: 'draft' | 'published' | 'archived';
    featured: boolean; // Whether to feature on homepage

    // Metadata
    createdBy: string; // Admin ID
    createdAt: Date;
    updatedAt: Date;
}

export interface IEventMediaItem {
    _id?: string;
    url: string; // Media URL (image or video)
    contentType: 'image' | 'video'; // Media type
    caption?: string; // Optional media caption
    altText?: string; // Accessibility text (mainly for images)
    thumbnail?: string; // Thumbnail URL for videos
    duration?: number; // Video duration in seconds
    featured: boolean; // Whether media is featured
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
export interface IFileUploadUrl {
    key: string;
    uploadId?: string;
    parts?: { partNumber: number; url: string }[];
    multipart: boolean;
    type: string;
    url?: string;
    id: string;
}

export interface IMediaFileDetails {
    contentType: string;
    size: number;
    type: 'image' | 'video';
    id: string;
}

export interface IMediaUploadRequest {
    title: string;
    mediaFiles: IMediaFileDetails[];
}

// API Response types (using standard IResponse<T> format)
export type IEventCategoryResponse = IResponse<IEventCategory>;
export type IEventCategoriesResponse = IResponse<IEventCategoriesData>;
export type IEventResponse = IResponse<IEvent>;
export type IEventsResponse = IResponse<IEvent[]>;
export type IMediaUploadUrlResponse = IResponse<{
    title: string;
    files: IFileUploadUrl[];
}>;

// Error Response types
export type IApiErrorResponse = Ierror;

// Form types
export interface IEventCategoryForm {
    name: string;
    description: string;
    slug?: string;
    color: string;
    isActive: boolean;
}

export interface IEventForm {
    title: string;
    description: string;
    categoryId: string;
    date: string; // ISO date string for forms
    endDate?: string;
    time: string;
    location: string;
    coverImage?: File | string;
    medias?: MediaDetails[]; // Multiple media files (images/videos)
    status: 'draft' | 'published';
    featured: boolean;
    slug: string;
}

export interface MediaDetails {
    type: 'image' | 'video';
    contentType: string;
    key: string;
    featured: boolean;
    caption?: string;
    multipart?: boolean;
    uploadId?: string;
    parts?: { PartNumber: number; ETag: string }[];
}

// Media upload interface for forms
export interface IEventMediaUpload {
    file: File; // File object for new uploads
    url?: string; // URL for existing media
    type: 'image' | 'video'; // Media type
    caption?: string; // Optional caption
    thumbnail?: File | string; // Thumbnail for videos
    featured: boolean; // Whether media is featured
    order: number; // Display order
    id: string; // Unique identifier for the media item
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
export const SUPPORTED_IMAGE_FORMATS = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif',
] as const;
export const SUPPORTED_VIDEO_FORMATS = ['mp4', 'webm', 'mov', 'avi'] as const;

export type SupportedImageFormat = (typeof SUPPORTED_IMAGE_FORMATS)[number];
export type SupportedVideoFormat = (typeof SUPPORTED_VIDEO_FORMATS)[number];
export type SupportedMediaFormat = SupportedImageFormat | SupportedVideoFormat;

// Media validation interface
export interface IMediaValidation {
    maxFileSize: number; // Maximum file size in bytes
    maxDuration?: number; // Maximum video duration in seconds
    allowedFormats: SupportedMediaFormat[];
}

// Default media validation rules
export const DEFAULT_MEDIA_VALIDATION: Record<
    'image' | 'video',
    IMediaValidation
> = {
    image: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedFormats: [...SUPPORTED_IMAGE_FORMATS],
    },
    video: {
        maxFileSize: 1024 * 1024 * 1024, // 1GB
        allowedFormats: [...SUPPORTED_VIDEO_FORMATS],
    },
};
