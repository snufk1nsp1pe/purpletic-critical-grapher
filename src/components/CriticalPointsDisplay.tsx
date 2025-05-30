
import React from 'react';

interface CriticalPointsDisplayProps {
  points: { x: number; y: number; z: number }[];
}

export const CriticalPointsDisplay: React.FC<CriticalPointsDisplayProps> = ({ points }) => {
  if (points.length === 0) {
    return (
      <div className="text-center py-8 text-white/40">
        No critical points found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {points.map((point, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-white/80 text-sm">Critical Point {index + 1}</span>
          </div>
          <div className="text-white font-mono text-sm">
            ({point.x.toFixed(2)}, {point.y.toFixed(2)}) = {point.z.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};
