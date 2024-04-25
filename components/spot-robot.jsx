// 'use client'
// import React, { Suspense, useState, useRef, useMemo } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
// import { motion } from 'framer-motion';
// import { useSpring, animated } from '@react-spring/three';
// import * as THREE from 'three';

// function WindowModel() {
//   const { scene } = useGLTF('/models/window3.glb');
//   const windowRef = useRef();

//   // Asignar un nuevo material al modelo de la ventana
//   useMemo(() => {
//     scene.traverse(child => {
//       if (child.isMesh) {
//         child.material = new THREE.MeshStandardMaterial({
//           color: 'black', // Cambia este valor al color deseado
//           transparent: true,
//           opacity: 0.5, // Ajusta la opacidad según la transparencia deseada
//         });
//       }
//     });
//   }, [scene]);

//   return <primitive object={scene} ref={windowRef} scale={[0.0111, 0.007, 0.01]} position={[0, 2, -0.06]} />;
// }
// const PyramidModel = React.memo(({ positionAngle }) => {
//   const radius = 5;
//   const angleInRadians = THREE.MathUtils.degToRad(positionAngle);
//   const x = radius * Math.sin(angleInRadians);
//   const z = radius * -Math.cos(angleInRadians);
//   const tip = [x, 0.9, z + 0.2];

//   const pyramidVertices = useMemo(() => {
//     const baseVertices = [
//       new THREE.Vector3(-1.03, 2.77, -0.15),
//       new THREE.Vector3(1.03, 2.77, -0.15),
//       new THREE.Vector3(1.03, 1.23, -0.15),
//       new THREE.Vector3(-1.03, 1.23, -0.15)
//     ];
//     return [...baseVertices, new THREE.Vector3(...tip)];
//   }, [tip]);

//   const pyramidGeometry = useMemo(() => {
//     const geom = new THREE.BufferGeometry().setFromPoints(pyramidVertices);
//     geom.setIndex([
//       0, 1, 4, // Front face
//       1, 2, 4, // Right face
//       2, 3, 4, // Back face
//       3, 0, 4  // Left face
//     ]);
//     geom.computeVertexNormals();
//     return geom;
//   }, [pyramidVertices]);

//   // Animación de la opacidad con un pico intermedio
//   const { opacity } = useSpring({
//     reset: true,
//     from: { opacity: 0 },
//     to: async (next) => {
//       await next({ opacity: 0.0009, config: { duration: 500 } });
//       await next({ opacity: 0.014, config: { duration: 500 } });
//     }
//   });

//   return (
//     <animated.mesh geometry={pyramidGeometry} material-opacity={opacity}>
//       <meshBasicMaterial color="cyan" transparent side={THREE.DoubleSide} />
//     </animated.mesh>
//   );
// }, (prevProps, nextProps) => {
//   // Esta función de comparación verifica si el ángulo realmente cambió
//   return prevProps.positionAngle === nextProps.positionAngle;
// });


// function SpotModel({ positionAngle }) {
//   const { scene } = useGLTF('/models/spot4.glb');
//   const spotRef = useRef();
//   const radius = 5;
//   const initialZRotation = Math.PI / 4;
//   const angleInRadians = THREE.MathUtils.degToRad(positionAngle);
//   const x = radius * Math.sin(angleInRadians);
//   const z = radius * -Math.cos(angleInRadians);

//   const { position, rotation } = useSpring({
//     to: {
//       position: [x, 0, z],
//       rotation: [0, -angleInRadians + Math.PI, initialZRotation]
//     },
//     from: {
//       position: [0, 0, 0],
//       rotation: [0, Math.PI, initialZRotation]
//     },
//     config: { mass: 1, tension: 150, friction: 30 }
//   });

//   return (
//     <animated.primitive object={scene} ref={spotRef} scale={4} position={position} rotation={rotation} />
//   );
// }

// const angleOptions = [-45, -30, -15, 0, 15, 30, 45];

// const SpotRobot = ({onAngleSelect}) => {
//   const [positionAngle, setPositionAngle] = useState(0);
//   const [displayAngle, setDisplayAngle] = useState(0);

//   const handleClick = angle => {
//     setPositionAngle(-angle);
//     setDisplayAngle(angle);
//     onAngleSelect(angle)
//   };

//   return (
//     <>
//       <div className='flex z-10 w-full md:w-1/2 bottom-0 py-20 absolute justify-center '>
//         {angleOptions.map((angle) => (
//           <motion.button
//             key={angle}
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 1 }}
//             onClick={() => handleClick(angle)}
//             style={{
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               margin: '0 7px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               border: 'none',
//               outline: 'none',
//               cursor: 'pointer',
//             }}
//             className={`${displayAngle === angle ? 'bg-white/30' : 'bg-white/20'} `}
//           >
//             {`${angle}°`}
//           </motion.button>
//         ))}
//       </div>
//       <div className='h-[100dvh] w-full md:w-1/2 hover:cursor-grab'>
//         <Canvas shadows camera={{ position: [0, 5, -10], fov: 60 }} >
//           <ambientLight intensity={1.3} />
//           <spotLight position={[0, 0, 0]} angle={1} penumbra={1} intensity={1} castShadow />
//           <directionalLight position={[-10, 20, 10]} intensity={3} castShadow />
//           <pointLight position={[0, 10, 0]} intensity={1} />
//           <Suspense fallback={null}>
//             <SpotModel positionAngle={positionAngle} />
//             <PyramidModel positionAngle={positionAngle} />
//             <WindowModel />
//             <EffectComposer>
//               <Bloom luminanceThreshold={1} luminanceSmoothing={1} height={0} />
//               <Noise opacity={0.05} />
//               <Vignette eskil={false} offset={0.001} darkness={1.1} />
//             </EffectComposer>
//           </Suspense>
//           <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
//         </Canvas>
//       </div>
//     </>
//   );
// }

// export default SpotRobot;


'use client'
import React, { Suspense, useState, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
function WindowModel() {
  const { scene } = useGLTF('/models/window3.glb');
  const windowRef = useRef();
  // Asignar un nuevo material al modelo de la ventana
  useMemo(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 'black', // Cambia este valor al color deseado
          transparent: true,
          opacity: 0.5, // Ajusta la opacidad según la transparencia deseada
        });
      }
    });
  }, [scene]);

  return <primitive object={scene} ref={windowRef} scale={[0.0111, 0.007, 0.01]} position={[0, 2, -0.06]} />;
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

  // Animación de la opacidad que se resetea con cada cambio de ángulo
  // Animación de la opacidad con un pico intermedio
  const { opacity } = useSpring({
    reset: true,
    from: { opacity: 0 },
    to: { opacity: 0.01 },
    config: { duration: 2000 }, // Ajusta la duración según lo deseado
    to: async (next) => {
      await next({ opacity: 0.001, config: { duration: 500 } });
      await next({ opacity: 0.01, config: { duration: 500 } });
    }
  });

  return (
    <animated.mesh geometry={pyramidGeometry} material-opacity={opacity}>
      <meshBasicMaterial color="cyan" transparent side={THREE.DoubleSide} />
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
const angleOptions = [-45, -30, -15, 0, 15, 30, 45];
const SpotRobot = ({onAngleSelect}) => {
  const [positionAngle, setPositionAngle] = useState(0);
  const [displayAngle, setDisplayAngle] = useState(0);
  const handleClick = angle => {
    setPositionAngle(-angle);
    setDisplayAngle(angle);
    onAngleSelect(angle)
  };
  return (
    <>
      <div className='flex z-10 w-full md:w-1/2 bottom-0 py-20 absolute justify-center '>
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
              color: 'white',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
            }}
            className={`${displayAngle === angle ? 'bg-white/30' : 'bg-white/20'} `}
          >
            {`${angle}°`}
          </motion.button>
        ))}
      </div>
      <div className='h-[100dvh] w-full md:w-1/2 hover:cursor-grab'>
        <Canvas shadows camera={{ position: [0, 5, -10], fov: 60 }} >
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
              <Noise opacity={0.05} />
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