import React, { useRef } from "react";
import { Plane } from "@react-three/drei";

const GroundPlane = () => {
  return (
    <>
      <Plane
        args={[22, 22]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.35, 0]}
        receiveShadow={true}
      >
        <meshStandardMaterial color="hsl(140, 40%, 50%)" side={2} />{" "}
      </Plane>
      {/* laterale d sinistra */}
      <Plane
        args={[22, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-11, 3.65, 0]}
        receiveShadow={true}
      >
        <meshStandardMaterial color="hsl(193, 38%, 86%)" side={2} />{" "}
      </Plane>
      {/* laterale di destra */}
      <Plane
        args={[10, 22]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, 3.65, -11]}
        receiveShadow={true}
      >
        <meshStandardMaterial color="hsl(193, 38%, 86%)" side={2} />{" "}
        {/* Azzurro */}
      </Plane>
    </>
  );
};

export default GroundPlane;
