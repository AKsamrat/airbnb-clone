'use client';

import React from 'react';

const TutorSkeletonLoading: React.FC = () => {
  const SkeletonBox = ({ className }: { className: string }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
  );

  const TutorCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border animate-pulse">
      {/* Profile Picture */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="flex-1">
          <SkeletonBox className="h-5 w-3/4 mb-2" />
          <SkeletonBox className="h-4 w-1/2 mb-1" />
          <SkeletonBox className="h-4 w-2/3" />
        </div>
        <SkeletonBox className="h-8 w-16" />
      </div>

      {/* Subject Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <SkeletonBox className="h-6 w-20" />
        <SkeletonBox className="h-6 w-24" />
        <SkeletonBox className="h-6 w-16" />
      </div>

      {/* Rating and Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-4 w-20" />
          <SkeletonBox className="h-4 w-16" />
        </div>
        <SkeletonBox className="h-4 w-24" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-5/6" />
        <SkeletonBox className="h-3 w-4/5" />
      </div>

      {/* Price and Button */}
      <div className="flex items-center justify-between pt-4 border-t">
        <SkeletonBox className="h-6 w-20" />
        <SkeletonBox className="h-10 w-32" />
      </div>
    </div>
  );

  // const FilterSkeleton = () => (
  //   <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  //     <SkeletonBox className="h-6 w-32 mb-4" />
  //     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  //       <div>
  //         <SkeletonBox className="h-4 w-16 mb-2" />
  //         <SkeletonBox className="h-10 w-full" />
  //       </div>
  //       <div>
  //         <SkeletonBox className="h-4 w-20 mb-2" />
  //         <SkeletonBox className="h-10 w-full" />
  //       </div>
  //       <div>
  //         <SkeletonBox className="h-4 w-24 mb-2" />
  //         <SkeletonBox className="h-10 w-full" />
  //       </div>
  //       <div>
  //         <SkeletonBox className="h-4 w-16 mb-2" />
  //         <SkeletonBox className="h-10 w-full" />
  //       </div>
  //     </div>
  //   </div>
  // );

  const HeaderSkeleton = () => (
    <div className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <SkeletonBox className="h-8 w-48 mb-2" />
            <SkeletonBox className="h-4 w-64" />
          </div>
          <div className="flex items-center space-x-4">
            <SkeletonBox className="h-10 w-32" />
            <SkeletonBox className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  );





  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className='mt-6'>

        <HeaderSkeleton />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <SkeletonBox className="h-6 w-48" />
          <SkeletonBox className="h-10 w-32" />
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <TutorCardSkeleton key={i} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center space-x-2 py-8">
          <SkeletonBox className="h-10 w-10" />
          <SkeletonBox className="h-10 w-10" />
          <SkeletonBox className="h-10 w-10" />
          <SkeletonBox className="h-10 w-10" />
          <SkeletonBox className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
};

export default TutorSkeletonLoading;