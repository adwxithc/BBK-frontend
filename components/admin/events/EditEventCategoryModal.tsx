'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateEventCategoryMutation } from '@/redux/features/eventsApiSlice';
import { IEventCategory } from '@/types/events';
import ApiError from '@/components/ui/ApiError';
import SuccessMessage from '@/components/ui/SuccessMessage';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import ColorPicker from '@/components/ui/ColorPicker';
import FormActions from '@/components/ui/FormActions';

// Validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(100, 'Name must be 100 characters or less')
    .trim(),
  description: yup
    .string()
    .required('Description is required')
    .max(500, 'Description must be 500 characters or less')
    .trim(),
  slug: yup
    .string()
    .max(100, 'Slug must be 100 characters or less')
    .matches(/^[a-z0-9-]*$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .default(''),
  color: yup
    .string()
    .required('Color is required')
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color'),
  isActive: yup.boolean().default(true),
});

type EditCategoryFormData = yup.InferType<typeof schema>;

interface EditEventCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  category: IEventCategory | null;
}

const EditEventCategoryModal: React.FC<EditEventCategoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  category
}) => {
  const [updateEventCategory, { isLoading }] = useUpdateEventCategoryMutation();
  const [apiError, setApiError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<EditCategoryFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      color: '#FF6B6B',
      isActive: true,
    },
  });

  // Only watch color for real-time preview
  const currentColor = watch('color');

  // Populate form with category data when modal opens or category changes
  useEffect(() => {
    if (category && isOpen) {
      reset({
        name: category.name || '',
        description: category.description || '',
        slug: category.slug || '',
        color: category.color || '#FF6B6B',
        isActive: category.isActive ?? true,
      });
    }
  }, [category, isOpen, reset]);

  // Generate slug from text
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/g, '')
      .replace(/-+$/g, '');
  };

  // Auto-generate slug from name
  const handleAutoGenerateSlug = () => {
    const currentName = getValues('name');
    if (currentName?.trim()) {
      const newSlug = generateSlug(currentName);
      setValue('slug', newSlug);
    }
  };

  // Extract error message from API error response
  const getErrorMessage = (error: any): string => {
    if (error?.data?.data?.errors?.[0]?.message) {
      return error.data.data.errors[0].message;
    }
    if (error?.data?.message) {
      return error.data.message;
    }
    return 'Failed to update event category. Please try again.';
  };

  const onSubmit = async (data: EditCategoryFormData) => {
    if (!category?._id) {
      setApiError('Category ID is missing. Please try again.');
      return;
    }

    try {
      setApiError('');
      await updateEventCategory({
        id: category._id,
        data: {
          name: data.name,
          description: data.description,
          slug: data.slug,
          color: data.color,
          isActive: data.isActive,
        }
      }).unwrap();
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess?.();
        handleClose();
      }, 2000);
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setApiError(errorMessage);
      console.error('Failed to update event category:', err);
    }
  };

  const handleClose = () => {
    reset();
    setApiError('');
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Event Category</h2>
            <p className="text-sm text-gray-600 mt-1">
              Update the details for &ldquo;{category.name}&rdquo;
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
            message="Event category updated successfully!"
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormInput
            id="name"
            label="Category Name"
            registration={{
              ...register('name', {
                onChange: (e) => {
                  // Auto-generate slug from name if slug matches the original slug pattern
                  const currentSlug = getValues('slug');
                  const originalSlug = generateSlug(category.name);
                  if (!currentSlug?.trim() || currentSlug === originalSlug) {
                    setValue('slug', generateSlug(e.target.value));
                  }
                }
              })
            }}
            error={errors.name}
            required
            placeholder="e.g., Sports Day, Annual Day, Art Exhibition"
            maxLength={100}
          />

          {/* Description Field */}
          <FormTextarea
            id="description"
            label="Description"
            registration={register('description')}
            error={errors.description}
            required
            rows={4}
            placeholder="Describe what this category is about..."
            maxLength={500}
          />

          {/* Slug Field */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="slug"
                {...register('slug')}
                className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                  errors.slug ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="auto-generated-from-name"
                maxLength={100}
              />
              <button
                type="button"
                onClick={handleAutoGenerateSlug}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900"
                title="Auto-generate slug from name"
              >
                <RotateCcw className="w-4 h-4" />
                Generate
              </button>
            </div>
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Auto-generated from name. Use lowercase letters, numbers, and hyphens only.
            </p>
          </div>

          {/* Color Field */}
          <ColorPicker
            id="color"
            label="Category Color"
            registration={register('color')}
            error={errors.color}
            value={currentColor}
            onChange={(color) => setValue('color', color)}
            required
          />

          {/* Status Toggle */}
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('isActive')}
                className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Active Category</span>
                <p className="text-xs text-gray-500">
                  Only active categories will be available for creating new events
                </p>
              </div>
            </label>
          </div>

          {/* Form Actions */}
          <FormActions
            onCancel={handleClose}
            isLoading={isLoading}
            submitText="Update Category"
            loadingText="Updating..."
            submitIcon={<Save className="w-5 h-5" />}
          />
        </form>
      </div>
    </div>
  );
};

export default EditEventCategoryModal;