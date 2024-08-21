import React from "react";
import { Stars } from "@react-three/drei";

const StarsBackground = () => (
  <Stars radius={100} depth={50} count={5000} factor={4} />
);

export default StarsBackground;
