'use client'
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const Bubble = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};



const DataBubbles = ({ data }) => {
  // data debería ser un array de objetos con { x, y, z, size, color }
  const groupRef = useRef();

  return (
    <div style={{ height: "80vh", width: "40%" }} className='bg-black'>
        <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
        {data.map((bubble, index) => (
          <Bubble
            key={index}
            position={[bubble.x, bubble.y, bubble.z]}
            size={bubble.size}
            color={bubble.color}
          />
        ))}
      </group>
      <Stars />
    </Canvas>
    </div>
  );
};

export default DataBubbles;
