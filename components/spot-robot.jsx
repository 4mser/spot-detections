'use client'
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function SpotModel({ positionAngle }) {
  const { scene } = useGLTF('/models/spot4.glb');
  const spotRef = useRef();
  const radius = 5;
  const initialZRotation = Math.PI / 4;

  // Calcula posición y ángulo sin aplicar directamente
  const angleInRadians = THREE.MathUtils.degToRad(positionAngle);
  const x = radius * Math.sin(angleInRadians);
  const z = radius * -Math.cos(angleInRadians);

  // Spring animation for position and rotation
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

const angleOptions = [-45, -30, -15, 0, 15, 30, 45,180];

const SpotRobot = () => {
  const [positionAngle, setPositionAngle] = useState(0);
  const [displayAngle, setDisplayAngle] = useState(0);

  const handleClick = angle => {
    setPositionAngle(-angle);
    setDisplayAngle(angle);
  };

  return (
    <>
      <div className='flex z-10  w-full md:w-[70%] bottom-32 py-20 absolute justify-center'>
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
              margin: '0 10px',
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
      <div className='md:h-[90%] h-[60vh] w-full md:w-[70%]'>
        <Canvas shadows camera={{ position: [0, 5, -10], fov: 60 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[15, 30, 15]} angle={1} penumbra={1} intensity={1} castShadow />
          <directionalLight position={[-10, 20, 10]} intensity={1} castShadow />
          <pointLight position={[0, 10, 0]} intensity={1} />
          <Suspense fallback={null}>
            <SpotModel positionAngle={positionAngle} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.3} luminanceSmoothing={1} height={0} />
              <Noise opacity={0.02} />
              <Vignette eskil={false} offset={0.01} darkness={1.1} />
            </EffectComposer>
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>
    </>
  );
}

export default SpotRobot;
