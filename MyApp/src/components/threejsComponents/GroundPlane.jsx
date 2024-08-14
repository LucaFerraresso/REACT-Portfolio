import React, { useRef } from "react";
import { Plane } from "@react-three/drei";

const GroundPlane = () => {
  return (
    <>
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.35, 0]}
        receiveShadow={true}
      >
        <meshStandardMaterial color="hsl(140, 40%, 50%)" side={2} />{" "}
        {/* Verde */}
      </Plane>
      <Plane
        args={[20, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 3.65, 0]}
        receiveShadow={true}
      >
        <meshStandardMaterial color="hsl(193, 38%, 86%)" side={2} />{" "}
        {/* Azzurro */}
      </Plane>
      <Plane
        args={[10, 20]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, 3.65, -10]}
        receiveShadow={true}
      >
        <meshStandardMaterial color="hsl(193, 38%, 86%)" side={2} />{" "}
        {/* Azzurro */}
      </Plane>
    </>
  );
};

export default GroundPlane;
