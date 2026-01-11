import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl h-full flex flex-col overflow-hidden animate-pulse">
            
            {/* 1. Image Area Skeleton (Matches h-56) */}
            <div className="w-full h-56 bg-gray-100 relative flex items-center justify-center">
                {/* Icon Placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-full opacity-50"></div>
                {/* Badge Placeholder */}
                <div className="absolute top-3 left-3 w-10 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* 2. Content Skeleton */}
            <div className="p-4 flex flex-col flex-grow">
                
                {/* Brand */}
                <div className="h-3 bg-gray-200 rounded w-24 mb-3"></div>

                {/* Title (2 lines) */}
                <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>

                {/* Rating Stars Placeholder */}
                <div className="h-3 bg-gray-200 rounded w-32 mb-6"></div>

                {/* Bottom Row: Price & Button */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    
                    {/* Price Column */}
                    <div className="flex flex-col gap-2">
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>

                    {/* Button */}
                    <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;