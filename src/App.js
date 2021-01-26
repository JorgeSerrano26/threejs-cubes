import { OrbitControls } from "drei";
import React from "react";
import { Canvas } from "react-three-fiber";
import { Box } from "./Box";
import Sphere from "./Sphere";

const colors = [
  '#e45858',
  '#50c878',
  '#e5c900'
]


function App() {
  return (
    <Canvas camera={{ position: [-10, 10, 10], fov: 35 }} shadowMap>
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-height={1014}
        shadow-mapSize-width={1014}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {[-3, 0, 3].map((x) =>
        [-3, 0, 3].map((z) => {
          if(x === 0 && x === z){
            return <Sphere position={[0, 0, 0]} color= '#e45858' />
          }
          return <Box position={[x, 0, z]} />
        }) 
      )}

      
      
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" opacity={.3} />
      </mesh>
      <ambientLight />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
