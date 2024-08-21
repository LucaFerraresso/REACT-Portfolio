import React from "react";
import { Fog } from "@react-three/drei";

const FogEffect = () => <fog attach="fog" args={["#ffffff", 0, 100]} />;

export default FogEffect;
