import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Float } from "@react-three/drei";

const RotatingText = ({ radius = 5, speed = 0.01 }) => {
  const textRef = useRef();
  const angle = useRef(0);

  useFrame(() => {
    if (textRef.current) {
      angle.current += speed;
      const x = radius * Math.cos(angle.current);
      const z = radius * Math.sin(angle.current);
      textRef.current.position.set(x, 3, z);
      textRef.current.rotation.y += 0.01; // Rotazione del testo attorno al proprio asse
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={1}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.4}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.1}
        bevelSize={0.02}
        bevelSegments={5}
        castShadow={true}
      >
        Luca
        <meshStandardMaterial color="hsl(32, 100%, 50%)" /> {/* Arancione */}
      </Text3D>
    </Float>
  );
};

export default RotatingText;
