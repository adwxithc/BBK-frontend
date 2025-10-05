'use client';

import React, { useState, useCallback } from 'react';
import { X, Save, Calendar, Upload, Image as ImageIcon, Video, Trash2, Star } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import { useCreateEventMutation, useGetEventCategoriesQuery } from '@/redux/features/eventsApiSlice';
import { IEventForm, IEventMediaUpload, DEFAULT_MEDIA_VALIDATION } from '@/types/events';
import ApiError from '@/components/ui/ApiError';
import SuccessMessage from '@/components/ui/SuccessMessage';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';

// Validation schema
const schema = yup.object().shape({
  title: yup
    .string()
    .required('Event title is required')
    .max(200, 'Title must be 200 characters or less')
    .trim(),
  description: yup
    .string()
    .required('Description is required')
    .max(2000, 'Description must be 2000 characters or less')
    .trim(),
  categoryId: yup
    .string()
    .required('Please select an event category'),
  date: yup
    .string()
    .required('Event date is required'),
  endDate: yup
    .string()
    .optional(),
  time: yup
    .string()
    .required('Event time is required'),
  location: yup
    .string()
    .required('Location is required')
    .max(200, 'Location must be 200 characters or less')
    .trim(),
  status: yup
    .string()
    .oneOf(['draft', 'published'])
    .default('draft'),
  featured: yup.boolean().default(false),
});

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  refetch?: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  refetch,
}) => {
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const { data: categoriesData } = useGetEventCategoriesQuery({});
  const [apiError, setApiError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<IEventMediaUpload[]>([]);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');

  const categoryOptions = categoriesData?.data?.categories?.filter(cat => cat.isActive).map(category => ({
    value: category._id!,
    label: category.name,
  })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IEventForm>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      date: '',
      endDate: undefined,
      time: '',
      location: '',
      status: 'draft',
      featured: false,
    },
  });

  // Validate file size and type
  const validateFile = (file: File, type: 'image' | 'video'): string | null => {
    const validation = DEFAULT_MEDIA_VALIDATION[type];
    
    if (file.size > validation.maxFileSize) {
      const maxSizeMB = validation.maxFileSize / (1024 * 1024);
      return `File size must be less than ${maxSizeMB}MB`;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !validation.allowedFormats.includes(fileExtension as any)) {
      return `Invalid file format. Allowed: ${validation.allowedFormats.join(', ')}`;
    }

    return null;
  };

  // Handle cover image upload
  const handleCoverImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validationError = validateFile(file, 'image');
      if (validationError) {
        setApiError(validationError);
        return;
      }
      
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setApiError('');
    }
  }, []);

  // Handle media files upload
  const handleMediaUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach((file) => {
      const type: 'image' | 'video' = file.type.startsWith('video/') ? 'video' : 'image';
      const validationError = validateFile(file, type);
      
      if (validationError) {
        setApiError(validationError);
        return;
      }

      const mediaUpload: IEventMediaUpload = {
        file,
        type,
        caption: '',
        altText: '',
        featured: false,
        order: mediaFiles.length,
      };

      setMediaFiles(prev => [...prev, mediaUpload]);
    });
    
    // Clear the input
    event.target.value = '';
  }, [mediaFiles.length]);

  // Remove media file
  const removeMediaFile = useCallback((index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Toggle featured media
  const toggleFeaturedMedia = useCallback((index: number) => {
    setMediaFiles(prev => prev.map((media, i) => ({
      ...media,
      featured: i === index ? !media.featured : media.featured
    })));
  }, []);

  // Update media caption
  const updateMediaCaption = useCallback((index: number, caption: string) => {
    setMediaFiles(prev => prev.map((media, i) => 
      i === index ? { ...media, caption } : media
    ));
  }, []);

  // Extract error message from API error response
  const getErrorMessage = (error: any): string => {
    if (error?.data?.data?.errors?.[0]?.message) {
      return error.data.data.errors[0].message;
    }
    if (error?.data?.message) {
      return error.data.message;
    }
    return 'Failed to create event. Please try again.';
  };

  const onSubmit = async (data: IEventForm) => {
    try {
      setApiError('');
      
      const eventData: IEventForm = {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        date: data.date,
        endDate: data.endDate,
        time: data.time,
        location: data.location,
        status: data.status,
        featured: data.featured,
        coverImage: coverImage || undefined,
        media: mediaFiles,
      };

      await createEvent(eventData).unwrap();
      refetch?.();
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess?.();
        handleClose();
      }, 2000);
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setApiError(errorMessage);
      console.error('Failed to create event:', err);
    }
  };

  const handleClose = () => {
    reset();
    setCoverImage(null);
    setCoverImagePreview('');
    setMediaFiles([]);
    setApiError('');
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Create New Event
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Create an engaging event for your students and parents
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <SuccessMessage 
            message="Event created successfully!"
            className="mb-6"
          />
        )}

        {/* Error Message */}
        {apiError && (
          <ApiError 
            error={apiError}
            className="mb-6"
            onClose={() => setApiError('')}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormInput
                  id="title"
                  label="Event Title"
                  registration={register('title')}
                  error={errors.title}
                  required
                  placeholder="e.g., Annual Day 2025, Sports Championship"
                  maxLength={200}
                />
              </div>

              <div className="md:col-span-2">
                <FormTextarea
                  id="description"
                  label="Event Description"
                  registration={register('description')}
                  error={errors.description}
                  required
                  rows={4}
                  placeholder="Describe the event, what to expect, activities planned..."
                  maxLength={2000}
                />
              </div>

              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Category *
                </label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onChange={field.onChange}
                      options={categoryOptions}
                      placeholder="Select category"
                      variant="outlined"
                      size="md"
                    />
                  )}
                />
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                )}
              </div>

              <div>
                <FormInput
                  id="location"
                  label="Location"
                  registration={register('location')}
                  error={errors.location}
                  required
                  placeholder="e.g., Main Auditorium, School Playground"
                  maxLength={200}
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Date & Time
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <FormInput
                  id="date"
                  label="Start Date"
                  type="date"
                  registration={register('date')}
                  error={errors.date}
                  required
                />
              </div>

              <div>
                <FormInput
                  id="endDate"
                  label="End Date (Optional)"
                  type="date"
                  registration={register('endDate')}
                  error={errors.endDate}
                />
              </div>

              <div>
                <FormInput
                  id="time"
                  label="Time"
                  registration={register('time')}
                  error={errors.time}
                  required
                  placeholder="e.g., 10:00 AM - 4:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary-600" />
              Media & Images
            </h3>
            
            {/* Cover Image */}
            <div className="mb-6">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                {coverImagePreview ? (
                  <div className="relative">
                    <Image
                      src={coverImagePreview}
                      alt="Cover preview"
                      width={300}
                      height={200}
                      className="max-h-48 mx-auto rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="contained"
                      color="red"
                      size="sm"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverImagePreview('');
                      }}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label className="cursor-pointer">
                        <span className="text-primary-600 hover:text-primary-500">Upload cover image</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, WebP up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Media */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Additional Photos & Videos
              </span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors">
                <div>
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-2">
                    <label className="cursor-pointer">
                      <span className="text-primary-600 hover:text-primary-500">Upload media files</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleMediaUpload}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Images up to 10MB, Videos up to 100MB each</p>
                </div>
              </div>

              {/* Media Preview */}
              {mediaFiles.length > 0 && (
                <div className="mt-4 space-y-4">
                  {mediaFiles.map((media, index) => (
                    <div key={`media-${index}-${media.file?.name}`} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            {media.type === 'image' ? (
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            ) : (
                              <Video className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {media.file?.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <IconButton
                                icon={<Star className={`h-4 w-4 ${media.featured ? 'text-yellow-500' : 'text-gray-400'}`} />}
                                onClick={() => toggleFeaturedMedia(index)}
                                variant="text"
                                size="sm"
                                tooltip="Featured"
                              />
                              <IconButton
                                icon={<Trash2 className="h-4 w-4" />}
                                onClick={() => removeMediaFile(index)}
                                variant="text"
                                color="red"
                                size="sm"
                                tooltip="Remove"
                              />
                            </div>
                          </div>
                          
                          <input
                            type="text"
                            placeholder="Add caption (optional)"
                            value={media.caption}
                            onChange={(e) => updateMediaCaption(index, e.target.value)}
                            className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Publishing Options */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { value: 'draft', label: 'Draft (Not visible to public)' },
                        { value: 'published', label: 'Published (Visible to public)' },
                      ]}
                      variant="outlined"
                      size="md"
                    />
                  )}
                />
              </div>

              <div>
                <label className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    {...register('featured')}
                    className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Featured Event</span>
                    <p className="text-xs text-gray-500">
                      Show this event prominently on the homepage
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Event
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;