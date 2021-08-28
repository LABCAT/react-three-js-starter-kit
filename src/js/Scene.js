import React, { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Context } from "./context/Context";
import CameraControls from './components/CameraControls'
import Effects from './components/Effects'
import String from './components/String'

export default function Scene() {
    const { audioIsPlaying, notes  } = useContext(Context),
        camera = { fov: 75, near: 0.1, far: 1000, position: [0,1,-200] },
        objectsArray = [],
        addToObjectsArray = (string) => {
          objectsArray.push(string);
        };

    return (
        <Canvas camera={camera}>
            <Suspense fallback='loading...'>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Stars radius={50} saturation={50} fade={true} />
                <String pos={[0, 0, 0]} colour="yellow" glow="blue" addToObjectsArray={addToObjectsArray} />
                <String pos={[0, 0, 0]} colour="green" glow="orange" addToObjectsArray={addToObjectsArray} />
                <Effects outlines={objectsArray} />
                <CameraControls audioIsPlaying={audioIsPlaying} />
            </Suspense>
        </Canvas>
    );
}