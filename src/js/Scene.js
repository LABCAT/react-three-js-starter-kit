import React, { Suspense, useEffect, useContext, useRef, useMemo, useState, useCallback } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import CameraControls from './components/CameraControls'
import { Context } from "./context/Context";
import { Vector2 } from "three"
import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike.js';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"

extend({ EffectComposer, RenderPass, OutlinePass })

export default function Scene() {
  const { audioIsPlaying, notes  } = useContext(Context);
  const camera = { fov: 75, near: 0.1, far: 1000, position: [0,1,4.5] }
  const strings = <String />;
  

  return (
    <Canvas camera={camera}>
      <Suspense fallback='loading...'>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Stars radius={50} saturation={50} fade={true} />
        <String pos={[0, -50, 0]} colour="yellow" glow="blue" />
        <String pos={[0, 0, 10]} colour="green" glow="orange" />
        <CameraControls audioIsPlaying={audioIsPlaying} />
      </Suspense>
    </Canvas>
  );
}

const context = React.createContext()
const Outline = ({ children }) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  const [hovered, setHovered] = useState([]);
  const aspect = useMemo(() => new Vector2(window.innerWidth, window.innerHeight), [size]);
  useEffect(() => composer.current.setSize(window.innerWidth, window.innerHeight), [size]);
  useFrame(() => composer.current.render(), 1)
  return (
    <context.Provider value={setHovered}>
      {children}
      <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" args={[scene, camera]} />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={hovered}
            visibleEdgeColor="blue"
            edgeStrength={2.5}
            edgeThickness={2.8}
            edgeGlow={0.7}
            hiddenEdgeColor={0}
          />
        </effectComposer>
      </context.Provider>
  )
}



const Outline2 = () => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  const aspect = useMemo(() => new Vector2(window.innerWidth, window.innerHeight), [size]);
  useEffect(() => composer.current.setSize(window.innerWidth, window.innerHeight), [size]);
  useFrame(() => composer.current.render(), 1)
  return (
      <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" args={[scene, camera]} />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            visibleEdgeColor="blue"
            edgeStrength={2.5}
            edgeThickness={2.8}
            edgeGlow={0.7}
            hiddenEdgeColor={0}
          />
        </effectComposer>
  )
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
const stringsArray = [];

  //https://codesandbox.io/s/r3f-outlines-mq5oy?from-embed=&file=/src/index.js:1615-2595 
function String(props) {
  
  const lightning = new LightningStrike();
  const { pos, colour, glow } = props;
 const mesh = useRef();
 const [string, setString] = useState([]);
 const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  const aspect = useMemo(() => new Vector2(window.innerWidth, window.innerHeight), [size]);
  
 useFrame((state) => {
   const time = state.clock.getElapsedTime();
   composer.current.render()
    mesh.current.geometry.update(time);
  }, 1);

  
  useEffect(
    () => {
      composer.current.setSize(window.innerWidth, window.innerHeight)
      stringsArray.push(mesh.current);
    }, [size]);

  return (
    <>
      <mesh ref={mesh} geometry={lightning} position={pos} scale={(0.5, 0.5, 0.8)}>
          <meshBasicMaterial
            color={colour}
            attach="material"
            transparent
            roughness={0.1}
            metalness={0.1}
            />
        </mesh>
       <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" args={[scene, camera]} />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            visibleEdgeColor={glow}
            selectedObjects={[stringsArray[0]]}
            edgeStrength={2.5}
            edgeThickness={2.8}
            edgeGlow={0.7}
            hiddenEdgeColor={0}
          />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            visibleEdgeColor='blue'
            selectedObjects={[stringsArray[1]]}
            edgeStrength={2.5}
            edgeThickness={2.8}
            edgeGlow={0.7}
            hiddenEdgeColor={0}
          />
        </effectComposer>
      </>
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