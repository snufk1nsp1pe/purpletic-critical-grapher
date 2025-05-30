
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Surface3DProps {
  data: { x: number; y: number; z: number }[];
  criticalPoints: { x: number; y: number; z: number }[];
}

const SurfaceMesh: React.FC<{ data: { x: number; y: number; z: number }[] }> = ({ data }) => {
  const geometry = useMemo(() => {
    if (data.length === 0) return new THREE.PlaneGeometry(1, 1);

    // Create a smoother grid with higher resolution
    const gridSize = Math.sqrt(data.length);
    const geometry = new THREE.PlaneGeometry(6, 6, gridSize - 1, gridSize - 1);
    
    // Update vertex positions with z values
    const vertices = geometry.attributes.position;
    for (let i = 0; i < data.length && i < vertices.count; i++) {
      vertices.setZ(i, data[i].z * 0.5); // Scale z for better visualization
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, [data]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color="#8b5cf6" 
        wireframe={false} 
        transparent 
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const CriticalPointSpheres: React.FC<{ points: { x: number; y: number; z: number }[] }> = ({ points }) => {
  return (
    <>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.z * 0.5, -point.y]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      ))}
    </>
  );
};

export const Surface3D: React.FC<Surface3DProps> = ({ data, criticalPoints }) => {
  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SurfaceMesh data={data} />
        <CriticalPointSpheres points={criticalPoints} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <gridHelper args={[10, 10, '#ffffff20', '#ffffff10']} />
      </Canvas>
    </div>
  );
};
