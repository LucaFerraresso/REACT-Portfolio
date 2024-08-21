import React from "react";
import { Stars } from "@react-three/drei";

const StarsBackground = () => (
  <Stars radius={100} depth={80} count={10000} factor={7} />
);

export default StarsBackground;
