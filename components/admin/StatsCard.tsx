import React from 'react';
import { StatCard } from '@/types/admin';
import Card from '../ui/Card';

interface StatsCardProps {
  stat: StatCard;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  const { title, value, icon: Icon, color } = stat;

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-1`} style={{ color }}>
            {value}
          </p>
        </div>
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;