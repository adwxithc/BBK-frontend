"use client";

import React from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  age: number;
  parent: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

const StudentsPage = () => {
  const students: Student[] = [
    { id: 1, name: "Emma Johnson", age: 4, parent: "John Johnson", phone: "(555) 123-4567", status: "Active" },
    { id: 2, name: "Liam Smith", age: 5, parent: "Sarah Smith", phone: "(555) 234-5678", status: "Active" },
    { id: 3, name: "Olivia Brown", age: 3, parent: "Mike Brown", phone: "(555) 345-6789", status: "Active" },
    { id: 4, name: "Noah Davis", age: 4, parent: "Lisa Davis", phone: "(555) 456-7890", status: "Inactive" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Students Management</h2>
        <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
          <Plus className="w-5 h-5 inline mr-2" />
          Add Student
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Age</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Parent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.age}</td>
                  <td className="px-6 py-4 text-gray-600">{student.parent}</td>
                  <td className="px-6 py-4 text-gray-600">{student.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;