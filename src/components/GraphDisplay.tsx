
import React from 'react';
import { ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter } from 'recharts';

interface GraphDisplayProps {
  data: { x: number; y: number; z: number }[];
  criticalPoints: { x: number; y: number; z: number }[];
}

export const GraphDisplay: React.FC<GraphDisplayProps> = ({ data, criticalPoints }) => {
  const projectedData = data.map(point => ({
    x: point.x,
    y: point.y,
    z: point.z,
  }));

  const zValues = data.map(d => d.z);
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);

  const getColorFromZ = (z: number) => {
    const normalized = (z - minZ) / (maxZ - minZ);
    const intensity = Math.floor(normalized * 255);
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-black/80 border border-white/20 rounded p-2 text-xs">
          <p className="text-white/60">x: {Number(point.x).toFixed(2)}</p>
          <p className="text-white/60">y: {Number(point.y).toFixed(2)}</p>
          <p className="text-white">z: {Number(point.z).toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = ({ cx, cy, payload }: any) => {
    if (!payload) return null;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={1.5}
        fill={getColorFromZ(payload.z)}
        opacity={0.6}
      />
    );
  };

  const CriticalDot = ({ cx, cy }: any) => (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#ff4444"
      stroke="#ffffff"
      strokeWidth={1}
    />
  );

  return (
    <div className="space-y-4">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#ffffff" opacity={0.1} />
            <XAxis 
              dataKey="x" 
              type="number"
              domain={['dataMin', 'dataMax']}
              stroke="#ffffff" 
              opacity={0.6}
              fontSize={10}
              tickFormatter={(value) => Number(value).toFixed(1)}
            />
            <YAxis 
              dataKey="y" 
              type="number"
              domain={['dataMin', 'dataMax']}
              stroke="#ffffff" 
              opacity={0.6}
              fontSize={10}
              tickFormatter={(value) => Number(value).toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={projectedData}
              dataKey="z" 
              shape={<CustomDot />}
            />
            <Scatter 
              data={criticalPoints}
              dataKey="z" 
              shape={<CriticalDot />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
