import React from "react";
import SkeletonLoader from "../homepage/SkeletonLoader";

const ProjectsSectionSkeleton = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gray-100">
      <SkeletonLoader
        width="50%"
        height="2rem"
        borderRadius="0.5rem"
        className="mb-6"
      />
      <div className="flex flex-wrap justify-center items-center gap-8">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              <SkeletonLoader
                width="100%"
                height="200px"
                borderRadius="0.5rem"
                className="mb-4"
              />
              <SkeletonLoader
                width="100%"
                height="1.5rem"
                borderRadius="0.5rem"
                className="mb-2"
              />
              <SkeletonLoader
                width="100%"
                height="1rem"
                borderRadius="0.5rem"
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProjectsSectionSkeleton;
