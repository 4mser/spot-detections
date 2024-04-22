'use client'
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function WindowModel() {
  const { scene } = useGLTF('/models/window.glb');
  const windowRef = useRef();
  return <primitive object={scene} ref={windowRef} scale={0.6} position={[0, 2, 0]} />;
}

function PyramidModel({ positionAngle }) {
  const radius = 5;
  const angleInRadians = THREE.MathUtils.degToRad(positionAngle);
  const x = radius * Math.sin(angleInRadians);
  const z = radius * -Math.cos(angleInRadians);
  const tip = [x, 0.9, z+0.2];

  const pyramidVertices = useMemo(() => {
    const baseVertices = [
      new THREE.Vector3(-1.03, 2.77, -0.15),
      new THREE.Vector3(1.03, 2.77, -0.15),
      new THREE.Vector3(1.03, 1.23, -0.15),
      new THREE.Vector3(-1.03, 1.23, -0.15)
    ];
    return [...baseVertices, new THREE.Vector3(...tip)];
  }, [tip]);

  const pyramidGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(pyramidVertices);
    geom.setIndex([
      0, 1, 4, // Front face
      1, 2, 4, // Right face
      2, 3, 4, // Back face
      3, 0, 4  // Left face
    ]);
    geom.computeVertexNormals();
    return geom;
  }, [pyramidVertices]);

  return (
    <animated.mesh geometry={pyramidGeometry}>
      <meshBasicMaterial color="cyan" opacity={0.5} transparent side={THREE.DoubleSide} />
    </animated.mesh>
  );
}

function SpotModel({ positionAngle }) {
  const { scene } = useGLTF('/models/spot4.glb');
  const spotRef = useRef();
  const radius = 5;
  const initialZRotation = Math.PI / 4;
  const angleInRadians = THREE.MathUtils.degToRad(positionAngle);
  const x = radius * Math.sin(angleInRadians);
  const z = radius * -Math.cos(angleInRadians);

  const { position, rotation } = useSpring({
    to: {
      position: [x, 0, z],
      rotation: [0, -angleInRadians + Math.PI, initialZRotation]
    },
    from: {
      position: [0, 0, 0],
      rotation: [0, Math.PI, initialZRotation]
    },
    config: { mass: 1, tension: 150, friction: 30 }
  });

  return (
    <animated.primitive object={scene} ref={spotRef} scale={4} position={position} rotation={rotation} />
  );
}

const angleOptions = [45, -45, -30, -15, 0, 15, 30, 45];

const SpotRobot = () => {
  const [positionAngle, setPositionAngle] = useState(0);
  const [displayAngle, setDisplayAngle] = useState(0);

  const handleClick = angle => {
    setPositionAngle(-angle);
    setDisplayAngle(angle);
  };

  return (
    <>
      <div className='flex z-10 w-full bottom-32 py-20 absolute justify-center'>
        {angleOptions.map((angle) => (
          <motion.button
            key={angle}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            onClick={() => handleClick(angle)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              margin: '0 7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: displayAngle === angle ? '#555' : '#ccc',
              color: 'white',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {`${angle}°`}
          </motion.button>
        ))}
      </div>
      <div className='h-[70vh] w-full'>
        <Canvas shadows camera={{ position: [0, 5, -10], fov: 60 }}>
          <ambientLight intensity={1.3} />
          <spotLight position={[0, 0, 0]} angle={1} penumbra={1} intensity={1} castShadow />
          <directionalLight position={[-10, 20, 10]} intensity={3} castShadow />
          <pointLight position={[0, 10, 0]} intensity={1} />
          <Suspense fallback={null}>
            <SpotModel positionAngle={positionAngle} />
            <PyramidModel positionAngle={positionAngle} />
            <WindowModel />
            <EffectComposer>
              <Bloom luminanceThreshold={1} luminanceSmoothing={1} height={0} />
              <Noise opacity={0.02} />
              <Vignette eskil={false} offset={0.001} darkness={1.1} />
            </EffectComposer>
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>
    </>
  );
}

export default SpotRobot;
