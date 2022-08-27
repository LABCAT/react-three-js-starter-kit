import React, { useEffect, useRef, useMemo } from "react";
import { Vector2 } from "three"
import { EffectComposer, Outline, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { extend, useFrame, useThree } from "@react-three/fiber";

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"

extend({ RenderPass})

export default function Effects(props) {
    const { outlines } = props,
         { gl, scene, size, camera } = useThree(),
        composer = useRef(),
        aspect = useMemo(() => new Vector2(window.innerWidth, window.innerHeight), [size]);

    return (
        <EffectComposer>
            {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
            <renderPass attachArray="passes" args={[scene, camera]} />
            {
                outlines.map((outline, index) => (
                    <Outline
                        key={index}
                        attachArray="passes"
                        args={[aspect, scene, camera]}
                        // args={[aspect, scene, camera]}
                        visibleEdgeColor={outline.glow}
                        selectedObjects={[outline]}
                        edgeStrength={2.5}
                        edgeThickness={2.8}
                        edgeGlow={2.7}
                        hiddenEdgeColor={0}
                    />
                ))
            }
        </EffectComposer>
    )
}