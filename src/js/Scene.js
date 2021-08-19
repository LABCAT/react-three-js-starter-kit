import React, { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import CameraControls from './components/CameraControls'
import { Context } from "./context/Context";


export default function Scene() {
  const { audioIsPlaying, notes  } = useContext(Context);
  const camera = { fov: 75, near: 0.1, far: 1000, position: [0,1,4.5] }
  return (
    <Canvas camera={camera}>
      <Suspense fallback='loading...'>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Stars/>
        <CameraControls audioIsPlaying={audioIsPlaying} />
      </Suspense>
    </Canvas>
  );
}
