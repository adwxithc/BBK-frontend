import { apiSlice } from '../apiSlice';
import { 
  IEventCategoryResponse, 
  IEventResponse,
  IEventCategoryForm,
  IEventForm,
  IEventFilters,
  IEventCategoryFilters
} from '@/types/events';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Event Categories
    getEventCategories: builder.query<IEventCategoryResponse, IEventCategoryFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
        if (filters?.search) params.append('search', filters.search);
        
        return {
          url: `/admin/event-categories?${params.toString()}`,
        };
      },
      providesTags: ['EventCategory'],
    }),

    getEventCategory: builder.query<IEventCategoryResponse, string>({
      query: (id) => ({
        url: `/admin/event-categories/${id}`,
      }),
      providesTags: ['EventCategory'],
    }),

    createEventCategory: builder.mutation<IEventCategoryResponse, IEventCategoryForm>({
      query: (eventCategory) => {
        const formData = new FormData();
        
        // Add form fields
        formData.append('name', eventCategory.name);
        formData.append('description', eventCategory.description);
        formData.append('color', eventCategory.color);
        formData.append('isActive', eventCategory.isActive.toString());
        
        if (eventCategory.icon) {
          formData.append('icon', eventCategory.icon);
        }
        
        // Handle file upload
        if (eventCategory.coverImage instanceof File) {
          formData.append('coverImage', eventCategory.coverImage);
        }

        return {
          url: '/admin/event-categories',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['EventCategory'],
    }),

    updateEventCategory: builder.mutation<IEventCategoryResponse, { id: string; data: IEventCategoryForm }>({
      query: ({ id, data }) => {
        const formData = new FormData();
        
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('color', data.color);
        formData.append('isActive', data.isActive.toString());
        
        if (data.icon) {
          formData.append('icon', data.icon);
        }
        
        if (data.coverImage instanceof File) {
          formData.append('coverImage', data.coverImage);
        }

        return {
          url: `/admin/event-categories/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['EventCategory', 'Event'],
    }),

    deleteEventCategory: builder.mutation<IEventCategoryResponse, string>({
      query: (id) => ({
        url: `/admin/event-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EventCategory', 'Event'],
    }),

    // Events
    getEvents: builder.query<IEventResponse, IEventFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        
        if (filters?.categoryId) params.append('categoryId', filters.categoryId);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
        if (filters?.dateRange?.start) params.append('startDate', filters.dateRange.start.toISOString());
        if (filters?.dateRange?.end) params.append('endDate', filters.dateRange.end.toISOString());
        
        return {
          url: `/admin/events?${params.toString()}`,
        };
      },
      providesTags: ['Event'],
    }),

    getEvent: builder.query<IEventResponse, string>({
      query: (id) => ({
        url: `/admin/events/${id}`,
      }),
      providesTags: ['Event'],
    }),

    createEvent: builder.mutation<IEventResponse, IEventForm>({
      query: (event) => {
        const formData = new FormData();
        
        // Add form fields
        formData.append('title', event.title);
        formData.append('description', event.description);
        formData.append('categoryId', event.categoryId);
        formData.append('date', event.date);
        formData.append('time', event.time);
        formData.append('location', event.location);
        formData.append('targetAgeGroups', JSON.stringify(event.targetAgeGroups));
        formData.append('registrationRequired', event.registrationRequired.toString());
        formData.append('status', event.status);
        formData.append('featured', event.featured.toString());
        
        if (event.endDate) formData.append('endDate', event.endDate);
        if (event.maxParticipants) formData.append('maxParticipants', event.maxParticipants.toString());
        if (event.registrationDeadline) formData.append('registrationDeadline', event.registrationDeadline);
        
        // Handle file upload
        if (event.coverImage instanceof File) {
          formData.append('coverImage', event.coverImage);
        }

        return {
          url: '/admin/events',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Event'],
    }),

    updateEvent: builder.mutation<IEventResponse, { id: string; data: IEventForm }>({
      query: ({ id, data }) => {
        const formData = new FormData();
        
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);
        formData.append('date', data.date);
        formData.append('time', data.time);
        formData.append('location', data.location);
        formData.append('targetAgeGroups', JSON.stringify(data.targetAgeGroups));
        formData.append('registrationRequired', data.registrationRequired.toString());
        formData.append('status', data.status);
        formData.append('featured', data.featured.toString());
        
        if (data.endDate) formData.append('endDate', data.endDate);
        if (data.maxParticipants) formData.append('maxParticipants', data.maxParticipants.toString());
        if (data.registrationDeadline) formData.append('registrationDeadline', data.registrationDeadline);
        
        if (data.coverImage instanceof File) {
          formData.append('coverImage', data.coverImage);
        }

        return {
          url: `/admin/events/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['Event'],
    }),

    deleteEvent: builder.mutation<IEventResponse, string>({
      query: (id) => ({
        url: `/admin/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),

    // Event Gallery Management
    uploadEventGalleryImages: builder.mutation<IEventResponse, { eventId: string; images: File[] }>({
      query: ({ eventId, images }) => {
        const formData = new FormData();
        
        images.forEach((image, index) => {
          formData.append(`images`, image);
        });

        return {
          url: `/admin/events/${eventId}/gallery`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Event'],
    }),

    deleteEventGalleryImage: builder.mutation<IEventResponse, { eventId: string; imageId: string }>({
      query: ({ eventId, imageId }) => ({
        url: `/admin/events/${eventId}/gallery/${imageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),

    reorderEventGalleryImages: builder.mutation<IEventResponse, { eventId: string; imageIds: string[] }>({
      query: ({ eventId, imageIds }) => ({
        url: `/admin/events/${eventId}/gallery/reorder`,
        method: 'PUT',
        body: { imageIds },
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  // Event Categories
  useGetEventCategoriesQuery,
  useGetEventCategoryQuery,
  useCreateEventCategoryMutation,
  useUpdateEventCategoryMutation,
  useDeleteEventCategoryMutation,
  
  // Events
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  
  // Event Gallery
  useUploadEventGalleryImagesMutation,
  useDeleteEventGalleryImageMutation,
  useReorderEventGalleryImagesMutation,
} = eventsApiSlice;