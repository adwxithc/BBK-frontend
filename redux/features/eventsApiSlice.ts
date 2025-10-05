import { apiSlice } from '../apiSlice';
import {
    IEventCategoryResponse,
    IEventCategoriesResponse,
    IEventResponse,
    IEventsResponse,
    IEventCategoryForm,
    IEventForm,
    IEventFilters,
    IEventCategoryFilters,
} from '@/types/events';

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Event Categories
        getEventCategories: builder.query<
            IEventCategoriesResponse,
            IEventCategoryFilters | void
        >({
            query: (filters) => {
                const params = new URLSearchParams();
                if (filters?.isActive !== undefined)
                    params.append('isActive', filters.isActive.toString());
                if (filters?.search) params.append('search', filters.search);
                if (filters?.page)
                    params.append('page', filters.page.toString());
                if (filters?.limit)
                    params.append('limit', filters.limit.toString());

                return {
                    url: `/admin/event-category?${params.toString()}`,
                };
            },
            keepUnusedDataFor: 0, // No caching - this is correct here
        }),

        getEventCategory: builder.query<IEventCategoryResponse, string>({
            query: (id) => ({
                url: `/admin/event-categories/${id}`,
            }),
            keepUnusedDataFor: 0, // No caching - this is correct here
        }),

        createEventCategory: builder.mutation<
            IEventCategoryResponse,
            IEventCategoryForm
        >({
            query: (eventCategory) => {
                return {
                    url: '/admin/event-category',
                    method: 'POST',
                    body: {
                        name: eventCategory.name,
                        description: eventCategory.description,
                        slug: eventCategory.slug,
                        color: eventCategory.color,
                    },
                };
            },
        }),

        updateEventCategory: builder.mutation<
            IEventCategoryResponse,
            { id: string; data: IEventCategoryForm }
        >({
            query: ({ id, data }) => {
                const newData = {
                    name: data.name,
                    description: data.description,
                    slug: data.slug,
                    color: data.color,
                    isActive: data.isActive,
                };

                return {
                    url: `/admin/event-category/${id}`,
                    method: 'PUT',
                    body: newData,
                };
            },
        }),

        deleteEventCategory: builder.mutation<IEventCategoryResponse, string>({
            query: (id) => ({
                url: `/admin/event-category/${id}`,
                method: 'DELETE',
            }),
        }),

        // Events
        getEvents: builder.query<IEventsResponse, IEventFilters | void>({
            query: (filters) => {
                const params = new URLSearchParams();

                if (filters?.categoryId)
                    params.append('categoryId', filters.categoryId);
                if (filters?.status) params.append('status', filters.status);
                if (filters?.featured !== undefined)
                    params.append('featured', filters.featured.toString());
                if (filters?.dateRange?.start)
                    params.append(
                        'startDate',
                        filters.dateRange.start.toISOString()
                    );
                if (filters?.dateRange?.end)
                    params.append(
                        'endDate',
                        filters.dateRange.end.toISOString()
                    );

                return {
                    url: `/admin/events?${params.toString()}`,
                };
            },
        }),

        getEvent: builder.query<IEventResponse, string>({
            query: (id) => ({
                url: `/admin/events/${id}`,
            }),
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
                formData.append('status', event.status);
                formData.append('featured', event.featured.toString());

                if (event.endDate) formData.append('endDate', event.endDate);

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
        }),

        updateEvent: builder.mutation<
            IEventResponse,
            { id: string; data: IEventForm }
        >({
            query: ({ id, data }) => {
                const formData = new FormData();

                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('categoryId', data.categoryId);
                formData.append('date', data.date);
                formData.append('time', data.time);
                formData.append('location', data.location);
                formData.append('status', data.status);
                formData.append('featured', data.featured.toString());

                if (data.endDate) formData.append('endDate', data.endDate);

                if (data.coverImage instanceof File) {
                    formData.append('coverImage', data.coverImage);
                }

                return {
                    url: `/admin/events/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
        }),

        deleteEvent: builder.mutation<IEventResponse, string>({
            query: (id) => ({
                url: `/admin/events/${id}`,
                method: 'DELETE',
            }),
        }),

        // Event Gallery Management
        uploadEventGalleryImages: builder.mutation<
            IEventResponse,
            { eventId: string; images: File[] }
        >({
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
        }),

        deleteEventGalleryImage: builder.mutation<
            IEventResponse,
            { eventId: string; imageId: string }
        >({
            query: ({ eventId, imageId }) => ({
                url: `/admin/events/${eventId}/gallery/${imageId}`,
                method: 'DELETE',
            }),
        }),

        reorderEventGalleryImages: builder.mutation<
            IEventResponse,
            { eventId: string; imageIds: string[] }
        >({
            query: ({ eventId, imageIds }) => ({
                url: `/admin/events/${eventId}/gallery/reorder`,
                method: 'PUT',
                body: { imageIds },
            }),
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
