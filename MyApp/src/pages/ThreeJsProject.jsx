import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Float } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

const RotatingText = () => {
  const textRef = useRef();

  // Animazione di rotazione del testo
  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y += 0.01; // Rotazione continua
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={2}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.1}
        bevelSize={0.02}
        bevelSegments={5}
        position={[-2, 2, 0]}
      >
        Luca
        <meshStandardMaterial color="hsl(259, 100%, 65%)" />
      </Text3D>
    </Float>
  );
};

const Button3D = ({ onClick }) => {
  const buttonRef = useRef();

  return (
    <mesh
      ref={buttonRef}
      position={[0, -1, 0]}
      onClick={onClick}
      onPointerOver={(e) => e.object.scale.set(1.2, 1.2, 1.2)} // Effetto hover
      onPointerOut={(e) => e.object.scale.set(1, 1, 1)} // Ripristina dimensioni
    >
      <boxGeometry args={[2, 0.5, 1]} />
      <meshStandardMaterial color="hsl(172, 67%, 45%)" />
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.3}
        height={0.1}
        position={[-0.9, -0.6, 0]}
      >
        Home
        <meshStandardMaterial color="white" />
      </Text3D>
    </mesh>
  );
};

const ThreeJsProject = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/homepage"); // Reindirizza alla homepage
  };

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 1, 10], fov: 60 }}>
        {/* Luce ambientale e direzionale */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, 10, 5]}
          intensity={1.5}
          color={"#fff"}
        />

        {/* Controlli di rotazione */}
        <OrbitControls enableZoom={false} />

        {/* Testo e bottone 3D */}
        <RotatingText />
        <Button3D onClick={handleClick} />
      </Canvas>
    </div>
  );
};

export default ThreeJsProject;
