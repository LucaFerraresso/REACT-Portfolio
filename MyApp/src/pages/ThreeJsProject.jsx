import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Button3D from "../components/threejs-project-page/Button3D";
import StripedSphere from "../components/threejs-project-page/StripedSphere";
import RotatingText from "../components/threejs-project-page/RotatingText";
import GroundPlane from "../components/threejs-project-page/GroundPlane";
import EnhancedButton3D from "../components/threejs-project-page/EnhancedButton3D";
import FogEffect from "../components/threejs-project-page/FogEffect";
import StarsBackground from "../components/threejs-project-page/StarsBackground";
import PlanetarySphere from "../components/threejs-project-page/PlanetarySphere";
import { useNavigate } from "react-router-dom";

const ThreeJsProject = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full h-screen bg-slate-500 overflow-hidden">
      <Canvas camera={{ position: [0, 10, 20], fov: 75 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          color={"#ffffff"}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <OrbitControls enableZoom={true} />
        <StripedSphere position={[0, 4, 0]} />
        <RotatingText radius={6} speed={0.01} />
        {["Home", "Projects", "Contacts", "About Me"].map((label, index) => (
          <Button3D
            key={label}
            label={label}
            onClick={() =>
              setTimeout(
                () => navigateTo(`/${label.toLowerCase().replace(" ", "")}`),
                300
              )
            }
            position={[
              index % 2 === 0 ? -4 + index * 2 : 4 - index * 2,
              -1,
              2 + (index % 2) * 1,
            ]}
            rotation={[0, (index - 1) * 0.3, 0]}
            color={
              [
                "hsl(207, 90%, 54%)",
                "hsl(120, 73%, 48%)",
                "hsl(341, 92%, 63%)",
                "hsl(30, 100%, 66%)",
              ][index]
            }
          />
        ))}
        <GroundPlane />
      </Canvas>
    </div>
  );
};

export default ThreeJsProject;
