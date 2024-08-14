import React, { useRef } from "react";
import { Plane } from "@react-three/drei";

const GroundPlane = () => {
  return (
    <>
      {/* Pavimento */}
      <Plane
        args={[50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
      >
        <meshStandardMaterial color="hsl(140, 40%, 50%)" /> {/* Verde */}
      </Plane>

      {/* Muro laterale sinistro */}
      <Plane
        args={[50, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 3, 0]}
      >
        <meshStandardMaterial color="hsl(166, 76%, 52%)" /> {/* Verde */}
      </Plane>

      {/* Muro posteriore */}
      <Plane args={[50, 10]} rotation={[0, 0, 0]} position={[0, 3, -10]}>
        <meshStandardMaterial color="hsl(193, 38%, 86%)" /> {/* Azzurro */}
      </Plane>
    </>
  );
};

export default GroundPlane;
