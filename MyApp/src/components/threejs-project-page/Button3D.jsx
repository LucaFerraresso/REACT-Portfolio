import React, { useState } from "react";
import { Text3D } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const Button3D = ({ onClick, label, position, rotation, color }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { scale, positionSpring } = useSpring({
    scale: clicked ? 0.95 : hovered ? 1.05 : 1,
    position: clicked ? [0, -0.1, 0] : [0, 0, 0],
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.group
      position={position}
      rotation={rotation}
      onClick={() => {
        setClicked(true);
        setTimeout(() => {
          onClick();
          setClicked(false);
        }, 150);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, -0.3, 0]} scale={[1.2, 1.2, 1.2]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="lightgrey" />
      </mesh>
      <animated.mesh scale={scale} position={positionSpring}>
        <cylinderGeometry args={[1, 1, 0.4, 32]} />
        <meshStandardMaterial color={color} />
        <Text3D
          font="/fonts-3D/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          position={[-0.5, 0.3, 0.26]}
        >
          {label}
          <meshStandardMaterial color="black" />
        </Text3D>
      </animated.mesh>
    </animated.group>
  );
};

export default Button3D;
