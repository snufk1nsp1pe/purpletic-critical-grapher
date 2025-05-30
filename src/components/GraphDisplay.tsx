
import React from 'react';
import { Surface3D } from './Surface3D';

interface GraphDisplayProps {
  data: { x: number; y: number; z: number }[];
  criticalPoints: { x: number; y: number; z: number }[];
}

export const GraphDisplay: React.FC<GraphDisplayProps> = ({ data, criticalPoints }) => {
  return (
    <div className="space-y-4">
      <Surface3D data={data} criticalPoints={criticalPoints} />
      <div className="text-center text-white/60 text-sm">
        Drag to rotate • Scroll to zoom • Red spheres are critical points
      </div>
    </div>
  );
};
