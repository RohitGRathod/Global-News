// SkeletonCard.jsx
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden max-w-md w-full">
      <div className="h-48 bg-gray-300 dark:bg-gray-700 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
