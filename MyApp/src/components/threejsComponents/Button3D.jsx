import React, { useState } from "react";
import { Text3D } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const Button3D = ({ onClick, label, position, rotation, color }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animazioni per il cilindro superiore
  const { scale, positionSpring } = useSpring({
    scale: clicked ? 1 : hovered ? 1.1 : 1,
    position: clicked ? [0, -0.05, 0] : [0, 0, 0],
    config: { tension: 300, friction: 15 },
  });

  const handlePointerDown = () => setClicked(true);
  const handlePointerUp = () => {
    setClicked(false);
    // Simula un breve ritardo prima di eseguire l'azione del clic
    setTimeout(onClick, 150);
  };

  return (
    <animated.group
      position={position}
      rotation={rotation}
      onClick={handlePointerUp}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
    >
      {/* Base del pulsante */}
      <mesh position={[0, -0.25, 0]} scale={[1.2, 1.2, 1.2]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="lightgrey" />{" "}
        {/* Colore grigio chiaro per la base */}
      </mesh>

      {/* Corpo del pulsante */}
      <animated.mesh
        scale={scale}
        position={positionSpring}
        receiveShadow={true}
      >
        <cylinderGeometry args={[1, 1, 0.4, 32]} />{" "}
        {/* Cilindro con altezza media */}
        <meshStandardMaterial color={color} />
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.05}
          position={[-0.8, 0.5, 0.26]}
        >
          {label}
          <meshStandardMaterial color="black" />
        </Text3D>
      </animated.mesh>
    </animated.group>
  );
};

export default Button3D;
