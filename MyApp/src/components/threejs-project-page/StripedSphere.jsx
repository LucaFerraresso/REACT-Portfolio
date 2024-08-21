import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const StripedSphere = ({ position }) => {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      // Rotazione continua attorno agli assi X e Y
      sphereRef.current.rotation.y += 0.01;
      sphereRef.current.rotation.x += 0.01;
    }
  });

  // Crea un materiale con un gradiente radiale
  const createGradientMaterial = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const size = 512; // Dimensioni della texture
    canvas.width = size;
    canvas.height = size;

    // Crea un gradiente radiale
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "hsl(200, 100%, 50%)"); // Blu per l'acqua
    gradient.addColorStop(1, "hsl(120, 100%, 50%)"); // Verde per la terra

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    return new THREE.MeshStandardMaterial({
      map: texture,
      emissive: new THREE.Color("hsl(0, 0%, 20%)"), // Colore scuro per l'emissione
      emissiveIntensity: 0.3,
      roughness: 0.7,
      metalness: 0.1,
    });
  };

  const gradientMaterial = createGradientMaterial();

  return (
    <Sphere ref={sphereRef} args={[1.5, 32, 32]} position={position} castShadow>
      <primitive attach="material" object={gradientMaterial} />
    </Sphere>
  );
};

export default StripedSphere;
