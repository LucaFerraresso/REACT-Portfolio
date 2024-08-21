import React from "react";
import SkeletonLoader from "../homepage/SkeletonLoader";

const HeroSectionSkeleton = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="flex justify-center items-center">
          <SkeletonLoader width="100%" height="400px" borderRadius="1rem" />
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <SkeletonLoader
            width="100%"
            height="2.5rem"
            borderRadius="0.5rem"
            className="mb-4"
          />
          <SkeletonLoader
            width="100%"
            height="1.5rem"
            borderRadius="0.5rem"
            className="mb-4"
          />
          <SkeletonLoader width="100%" height="2rem" borderRadius="0.5rem" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;
