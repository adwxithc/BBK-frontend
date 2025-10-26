'use client';

import React, { useState } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateEventCategoryMutation } from '@/redux/features/eventsApiSlice';
import ApiError from '@/components/ui/ApiError';
import SuccessMessage from '@/components/ui/SuccessMessage';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import ColorPicker from '@/components/ui/ColorPicker';
import FormActions from '@/components/ui/FormActions';
import { generateSlug } from '@/utils/string-utils';

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

type CreateCategoryFormData = yup.InferType<typeof schema>;

interface CreateEventCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  refetchCategories: () => void;
}

const CreateEventCategoryModal: React.FC<CreateEventCategoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  refetchCategories,
}) => {
  const [createEventCategory, { isLoading }] = useCreateEventCategoryMutation();
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
  } = useForm<CreateCategoryFormData>({
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
    return 'Failed to create event category. Please try again.';
  };

  const onSubmit = async (data: CreateCategoryFormData) => {
    try {
      setApiError('');
      await createEventCategory(data).unwrap();
      refetchCategories()
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess?.();
        handleClose();
      }, 2000);
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setApiError(errorMessage);
      console.error('Failed to create event category:', err);
    }
  };

  const handleClose = () => {
    reset();
    setApiError('');
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Event Category</h2>
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
            message="Event category created successfully!"
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
                  // Auto-generate slug from name if slug is empty
                  const currentSlug = getValues('slug');
                  if (!currentSlug?.trim()) {
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
                className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent transition-colors ${errors.slug ? 'border-red-300' : 'border-gray-300'
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

          {/* Form Actions */}
          <FormActions
            onCancel={handleClose}
            isLoading={isLoading}
            submitText="Create Category"
            loadingText="Creating..."
            submitIcon={<Save className="w-5 h-5" />}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateEventCategoryModal;