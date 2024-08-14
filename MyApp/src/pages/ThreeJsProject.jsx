import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import Button3D from "../components/threejsComponents/Button3D";
import StripedSphere from "../components/threejsComponents/StripedSphere";
import Building from "../components/threejsComponents/Building";
import RotatingText from "../components/threejsComponents/RotatingText";
import GroundPlane from "../components/threejsComponents/GroundPlane";

const ThreeJsProject = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path); // Reindirizzamento dinamico
  };

  return (
    <div className="w-full h-screen bg-slate-500">
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        {/* Luce ambientale e direzionale */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, 10, 5]}
          intensity={1.5}
          color={"#fff"}
        />

        {/* Controlli di rotazione */}
        <OrbitControls enableZoom={true} />

        {/* Sfera */}
        <StripedSphere position={[0, 4, 0]} />

        {/* Testo rotante attorno alla sfera */}
        <RotatingText radius={6} speed={0.01} />

        {/* Bottoni 3D posizionati a semicerchio */}
        <Button3D
          label="Home"
          onClick={() => setTimeout(() => navigateTo("/homepage"), 500)}
          position={[-4, -1, 2]}
          rotation={[0, 0.3, 0]}
          color="hsl(207, 90%, 54%)" // Blu accattivante
        />
        <Button3D
          label="Projects"
          onClick={() => setTimeout(() => navigateTo("/projects"), 500)}
          position={[-2, -1, 3]}
          rotation={[0, 0.1, 0]}
          color="hsl(120, 73%, 48%)" // Verde brillante
        />
        <Button3D
          label="Contacts"
          onClick={() => setTimeout(() => navigateTo("/contacts"), 500)}
          position={[2, -1, 3]}
          rotation={[0, -0.1, 0]}
          color="hsl(341, 92%, 63%)" // Rosso vivace
        />
        <Button3D
          label="About Me"
          onClick={() => setTimeout(() => navigateTo("/aboutme"), 500)}
          position={[4, -1, 2]}
          rotation={[0, -0.3, 0]}
          color="hsl(30, 100%, 66%)" // Arancione intenso
        />

        {/* Terreno e muri */}
        <GroundPlane position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
};

export default ThreeJsProject;
