import React, { Suspense, useContext, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import CameraControls from './components/CameraControls'
import { Context } from "./context/Context";
import * as THREE from 'three/build/three.module.js';
import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike.js';


export default function Scene() {
  const { audioIsPlaying, notes  } = useContext(Context);
  const camera = { fov: 75, near: 0.1, far: 1000, position: [0,1,4.5] }
  return (
    <Canvas camera={camera}>
      <Suspense fallback='loading...'>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Stars radius={50} saturation={50} fade={true} />
        <String />
        <CameraControls audioIsPlaying={audioIsPlaying} />
      </Suspense>
    </Canvas>
  );
}

//https://threejs.org/examples/#webgl_geometry_spline_editor
//https://threejs.org/examples/#webgl_geometry_extrude_splines
//https://threejs.org/examples/#webgl_lines_colors
//https://threejs.org/examples/#webgl_lines_fat
//https://threejs.org/examples/#webgl_loader_tilt
//https://threejs.org/examples/#webgl_trails
//https://threejs.org/examples/#webgl_postprocessing_unreal_bloom_selective
//https://threejs.org/examples/#webgl_lightningstrike
//https://threejs.org/examples/#svg_lines
function String(props) {
 const mesh = useRef();
 const lightning = new LightningStrike();
 useFrame((state) => {
   const time = state.clock.getElapsedTime();
    mesh.current.geometry.update(time);
  });
  
  return (
    <mesh ref={mesh} geometry={lightning} position={[0, 0, -50]} scale={(0.5, 0.5, 0.8)}>
      <meshBasicMaterial
        color="yellow"
        attach="material"
        transparent
        roughness={0.1}
        metalness={0.1}
        />
    </mesh>
  );
}
function Cide(props) {
 const mesh = useRef();
 useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.x -= 0.01;
  });return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={(0.5, 0.5, 0.8)}>
      <coneGeometry
        attach="geometry"
        args={[1, 2.5, 3]} 
        smoothness={5} 
        {...props}/>      
        <meshPhongMaterial
        color="green"
        attach="material"
        transparent
        roughness={0.1}
        metalness={0.1}/>
    </mesh>
  );
}