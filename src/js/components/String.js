import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike.js';


export default function String(props) {
    const { pos, colour, addToObjectsArray } = props,
        mesh = useRef(),
        lightning = new LightningStrike();
  
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.geometry.update(time);
    });

    useEffect(
        () => {
            const colours = ['blue', 'orange', 'pink', 'purple'];
            mesh.current.glow = colours[Math.floor(Math.random() * colours.length)];
            addToObjectsArray(mesh.current);
        }, 
        [addToObjectsArray]
    );

    return (
        <mesh ref={mesh} geometry={lightning} position={pos}>
            <meshBasicMaterial
                color={colour}
                attach="material"
                transparent
                roughness={0.1}
                metalness={0.1}
            />
        </mesh>
    );
};