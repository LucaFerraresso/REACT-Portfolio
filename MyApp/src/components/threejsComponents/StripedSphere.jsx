import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const StripedSphere = ({ position }) => {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      // Rotazione continua attorno agli assi X e Y
      sphereRef.current.rotation.y += 0.1;
      sphereRef.current.rotation.x += 0.1;
    }
  });

  // Crea un materiale con due colori usando un gradiente radiale
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
    gradient.addColorStop(0, "hsl(59, 50%, 65%)");
    gradient.addColorStop(1, "hsl(259, 100%, 65%)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    return new THREE.MeshStandardMaterial({
      map: texture,
      emissive: new THREE.Color("hsl(0, 100%, 66%)"),
      emissiveIntensity: 0.5,
      roughness: 0.6,
      metalness: 0.2,
    });
  };

  const gradientMaterial = createGradientMaterial();

  return (
    <Sphere
      ref={sphereRef}
      args={[1.5, 32, 32]}
      position={position}
      castShadow={true}
    >
      <primitive attach="material" object={gradientMaterial} />
    </Sphere>
  );
};

export default StripedSphere;
