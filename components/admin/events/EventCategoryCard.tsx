import React from 'react';
import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { IEventCategory } from '@/types/events';

interface EventCategoryCardProps {
  category: IEventCategory;
  onView?: (categoryId: string) => void;
  onEdit?: (categoryId: string) => void;
  onDelete?: (categoryId: string) => void;
}

const EventCategoryCard: React.FC<EventCategoryCardProps> = ({
  category,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Category Icon Display */}
      <div 
        className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: category.color + '20' }}
      >
        <div 
          className="w-full h-full flex items-center justify-center text-6xl"
          style={{ backgroundColor: category.color + '10' }}
        >
          {category.icon}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              category.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {category.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Actions Menu */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative">
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </button>
            {/* Dropdown menu would go here */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7CBD1E] transition-colors">
            {category.name}
          </h3>
          <div 
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: category.color }}
          ></div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
          <span>/{category.slug}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onView?.(category._id!)}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
          >
            <Eye className="h-4 w-4" />
            View
          </button>
          <button
            onClick={() => onEdit?.(category._id!)}
            className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete?.(category._id!)}
            className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCategoryCard;