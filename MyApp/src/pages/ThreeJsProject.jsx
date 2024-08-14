import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Float,
  Sphere,
  Box,
  Cylinder,
  Plane,
} from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// Componente RotatingText all'interno del Canvas
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

// Componente RotatingCar all'interno del Canvas
const RotatingCar = () => {
  const carRef = useRef();

  // Animazione di rotazione attorno al testo
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    carRef.current.position.x = Math.sin(t) * 4; // Movimento circolare
    carRef.current.position.z = Math.cos(t) * 4;
  });

  return (
    <Box ref={carRef} args={[1, 0.5, 0.5]} position={[4, 0.5, 0]}>
      <meshStandardMaterial color="red" />
    </Box>
  );
};

// Componente per il bottone 3D
const Button3D = ({ onClick, label, position }) => {
  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={(e) => e.object.scale.set(1.2, 1.2, 1.2)} // Effetto hover
      onPointerOut={(e) => e.object.scale.set(1, 1, 1)} // Ripristina dimensioni
    >
      <cylinderGeometry args={[1, 1, 0.5, 32]} /> {/* Bottone arrotondato */}
      <meshStandardMaterial color="hsl(172, 67%, 45%)" />
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.2}
        height={0.05}
        position={[-0.5, 0, 0.26]} // Posizionamento del testo sopra il bottone
      >
        {label}
        <meshStandardMaterial color="white" />
      </Text3D>
    </mesh>
  );
};

// Componente per il terreno
const GroundPlane = () => {
  return (
    <Plane
      args={[50, 50]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.5, 0]}
    >
      <meshStandardMaterial color="hsl(140, 40%, 50%)" />
    </Plane>
  );
};

const ThreeJsProject = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path); // Reindirizzamento dinamico
  };

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        {/* Luce ambientale e direzionale */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, 10, 5]}
          intensity={1.5}
          color={"#fff"}
        />
        {/* Controlli di rotazione */}
        <OrbitControls enableZoom={false} />
        {/* Geometrie */}
        <RotatingText />
        <RotatingCar />
        <Sphere args={[1, 32, 32]} position={[5, 1, -5]}>
          <meshStandardMaterial color="blue" />
        </Sphere>
        <Cylinder args={[0.5, 0.5, 3, 32]} position={[-5, 1.5, 5]}>
          <meshStandardMaterial color="green" />
        </Cylinder>
        {/* Bottoni 3D */}
        <Button3D
          label="Home"
          onClick={() => navigateTo("/homepage")}
          position={[0, -1, 0]}
        />
        <Button3D
          label="Projects"
          onClick={() => navigateTo("/projects")}
          position={[3, -1, 0]}
        />
        <Button3D
          label="Contacts"
          onClick={() => navigateTo("/contacts")}
          position={[-3, -1, 0]}
        />
        <Button3D
          label="About Me"
          onClick={() => navigateTo("/aboutme")}
          position={[0, -1, -3]}
        />
        {/* Terreno colorato */}
        <GroundPlane />
      </Canvas>
    </div>
  );
};

export default ThreeJsProject;
