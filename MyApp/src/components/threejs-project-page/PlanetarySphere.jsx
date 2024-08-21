import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const PlanetarySphere = ({ position }) => {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
    }
  });

  // Crea un materiale con due texture (mare e terra)
  const createPlanetMaterial = () => {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load("/textures/earth_map.jpg"); // Texture della superficie della Terra
    const bumpMap = textureLoader.load("/textures/earth_bump.jpg"); // Texture di bump per l'illuminazione

    return new THREE.MeshStandardMaterial({
      map,
      bumpMap,
      bumpScale: 0.05,
      emissive: new THREE.Color("black"), // Usa colore puro
      emissiveIntensity: 0.1,
      roughness: 0.8,
      metalness: 0.2,
    });
  };

  return (
    <Sphere ref={sphereRef} args={[2, 32, 32]} position={position} castShadow>
      <primitive attach="material" object={createPlanetMaterial()} />
    </Sphere>
  );
};

export default PlanetarySphere;
