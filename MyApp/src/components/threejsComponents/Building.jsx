import React, { useRef } from "react";

import { Box, Cylinder, Cone } from "@react-three/drei";

const Building = () => {
  return (
    <>
      {/* Edificio: combinazione di cilindro e parallelepipedo */}
      <Box args={[3, 5, 3]} position={[5, 2.5, -5]}>
        <meshStandardMaterial color="hsl(202, 55%, 16%)" /> {/* Colore scuro */}
      </Box>
      <Cylinder args={[1.5, 1.5, 4, 32]} position={[5, 5, -5]}>
        <meshStandardMaterial color="hsl(193, 38%, 86%)" />{" "}
        {/* Colore chiaro */}
      </Cylinder>
      <Cone args={[2, 3, 32]} position={[5, 8, -5]}>
        <meshStandardMaterial color="hsl(30, 100%, 60%)" />{" "}
        {/* Colore giallo */}
      </Cone>
    </>
  );
};

export default Building;
