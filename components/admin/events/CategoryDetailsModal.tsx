import React from 'react';
import { X, Calendar, User, Tag, Palette, Globe, CheckCircle, XCircle } from 'lucide-react';
import { IEventCategory } from '@/types/events';
import { dateFormatters } from '@/utils/date-utils';

interface CategoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: IEventCategory | null;
}

const CategoryDetailsModal: React.FC<CategoryDetailsModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  if (!isOpen || !category) return null;

  const formatted = dateFormatters.card(category.createdAt);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            type="button"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-white/20"
              style={{ backgroundColor: category.color }}
            >
              {category.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                    category.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {category.isActive ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Inactive
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary-500" />
                Description
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL Slug */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">URL Slug</span>
                </div>
                <code className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-mono">
                  /{category.slug}
                </code>
              </div>

              {/* Category Color */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">Theme Color</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-gray-200"
                    style={{ backgroundColor: category.color }}
                  />
                  <code className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm font-mono">
                    {category.color}
                  </code>
                </div>
              </div>

              {/* Created By */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Created By</span>
                </div>
                <p className="text-gray-900 font-medium">{category.createdBy}</p>
              </div>

              {/* Created Date */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Created On</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{formatted.date}</p>
                  <p className="text-sm text-gray-500">{formatted.time}</p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            {category.updatedAt && new Date(category.updatedAt).getTime() !== new Date(category.createdAt).getTime() && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Last Updated</span>
                </div>
                <div>
                  <p className="text-amber-900 font-medium">
                    {dateFormatters.card(category.updatedAt).date}
                  </p>
                  <p className="text-sm text-amber-700">
                    {dateFormatters.card(category.updatedAt).time}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsModal;