import React from "react";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

const GroundPlane = () => {
  // Crea una texture per il suolo lunare
  const createMoonSurfaceMaterial = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const size = 512; // Dimensioni della texture
    canvas.width = size;
    canvas.height = size;

    // Colore di base per il suolo lunare
    context.fillStyle = "#d0d0d0";
    context.fillRect(0, 0, size, size);

    // Aggiungi crateri
    context.fillStyle = "#a0a0a0";
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 30 + 10;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1,
      metalness: 0,
    });
  };

  const moonSurfaceMaterial = createMoonSurfaceMaterial();

  return (
    <Plane
      args={[22, 22]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.35, 0]}
      receiveShadow
    >
      <primitive attach="material" object={moonSurfaceMaterial} side={2} />
    </Plane>
  );
};

export default GroundPlane;
