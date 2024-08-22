import React from "react";

const SkeletonLoader = ({
  width,
  height,
  borderRadius = "0",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${className}`}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default SkeletonLoader;
