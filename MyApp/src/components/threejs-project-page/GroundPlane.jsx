import React from "react";
import { Plane } from "@react-three/drei";

const GroundPlane = () => (
  <>
    <Plane
      args={[50, 50]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
    >
      <meshStandardMaterial color="hsl(140, 40%, 50%)" />
    </Plane>
    <Plane
      args={[50, 20]}
      rotation={[0, Math.PI / 2, 0]}
      position={[-25, 10, 0]}
      receiveShadow
    >
      <meshStandardMaterial color="hsl(193, 38%, 86%)" />
    </Plane>
    <Plane
      args={[20, 50]}
      rotation={[0, 0, Math.PI / 2]}
      position={[0, 10, -25]}
      receiveShadow
    >
      <meshStandardMaterial color="hsl(193, 38%, 86%)" />
    </Plane>
  </>
);

export default GroundPlane;
