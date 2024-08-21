import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const StripedSphere = ({ position }) => {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
      sphereRef.current.rotation.x += 0.01;
    }
  });

  const createGradientMaterial = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = 512;
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, "hsl(200, 100%, 50%)");
    gradient.addColorStop(1, "hsl(120, 100%, 50%)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
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

  return (
    <Sphere ref={sphereRef} args={[1.5, 32, 32]} position={position} castShadow>
      <primitive attach="material" object={createGradientMaterial()} />
    </Sphere>
  );
};

export default StripedSphere;
