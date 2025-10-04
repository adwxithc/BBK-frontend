import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * DataTable Component - A reusable table component with pagination and sticky headers
 * 
 * Features:
 * - Sticky header when height is specified
 * - Scrollable body content
 * - Pagination with customizable page sizes
 * - Loading states with skeleton animation
 * - Custom column renderers
 * - Responsive design
 * 
 * @param height - Optional height constraint. Supports:
 *                - Fixed pixels: 600 or "600px"
 *                - Viewport relative: "100vh", "50vh"
 *                - Calc expressions: "calc(100vh - 200px)", "calc(100% - 150px)"
 *                - Percentage: "80%"
 *                When specified, creates a fixed-height container with sticky header
 */

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface PaginationConfig {
  pageSize?: number;
  showPagination?: boolean;
  pageSizeOptions?: number[];
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  className?: string;
  tableClassName?: string;
  emptyMessage?: string;
  pagination?: PaginationConfig;
  loading?: boolean;
  height?: string | number;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  className = '',
  tableClassName = '',
  emptyMessage = 'No data available',
  pagination = { showPagination: true, pageSize: 10, pageSizeOptions: [5, 10, 20, 50] },
  loading = false,
  height,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination.pageSize || 10);

  const paginatedData = useMemo(() => {
    if (!pagination.showPagination) return data;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize, pagination.showPagination]);

  const totalPages = Math.ceil(data.length / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, data.length);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const skeletonRows = useMemo(() => 
    Array.from({ length: pageSize }, (_, index) => ({ id: `skeleton-${index}` })),
    [pageSize]
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (loading) {
    const containerStyle = height 
      ? { height: typeof height === 'number' ? `${height}px` : height }
      : {};

    return (
      <div className={`bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
        <div 
          className="flex flex-col"
          style={containerStyle}
        >
          {/* Fixed Header */}
          <div className="flex-shrink-0 overflow-x-auto">
            <table className={`w-full ${tableClassName}`}>
              <thead className="bg-gray-200 border-b-2 border-gray-400 sticky top-0 z-10 shadow-md">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`text-left py-4 px-6 font-semibold text-gray-900 ${column.className || ''}`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          
          {/* Scrollable Body */}
          <div className="flex-1 overflow-auto">
            <table className={`w-full ${tableClassName}`}>
              <tbody>
                {skeletonRows.map((skeletonRow) => (
                  <tr key={skeletonRow.id} className="border-b border-gray-100">
                    {columns.map((column) => (
                      <td key={column.key} className="py-4 px-6">
                        <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  const containerStyle = height 
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : {};

  return (
    <div className={`bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Table Container with Fixed Height */}
      <div 
        className="flex flex-col"
        style={containerStyle}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 overflow-x-auto">
          <table className={`w-full ${tableClassName}`}>
            <thead className="bg-gray-100 border-b border-gray-300 sticky top-0 z-10 shadow-md">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`text-left py-4 px-6 font-semibold text-gray-900 ${column.className || ''}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        
        {/* Scrollable Body or Empty State */}
        {data.length === 0 && !loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No data found</h3>
              <p className="text-gray-500">{emptyMessage}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <table className={`w-full ${tableClassName}`}>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((row, rowIndex) => (
                  <tr 
                    key={row._id || row.id || `row-${rowIndex}`} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td 
                        key={column.key} 
                        className={`py-4 px-6 ${column.className || ''}`}
                      >
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination - Outside height constraint */}
      {pagination.showPagination && data.length > 0  && (
        <div className="border-t border-gray-200 bg-white px-6 pb-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startItem}</span> to{' '}
                <span className="font-medium">{endItem}</span> of{' '}
                <span className="font-medium">{data.length}</span> results
              </div>
              
              {pagination.pageSizeOptions && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="pageSize" className="text-sm text-gray-700">Show:</label>
                  <select
                    id="pageSize"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {pagination.pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-1">
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`py-1 px-3 text-sm rounded min-h-2 min-w-2 ${
                      page === currentPage
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;