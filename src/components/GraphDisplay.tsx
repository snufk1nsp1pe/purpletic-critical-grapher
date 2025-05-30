
import React from 'react';
import { Scatter3DChart, ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter } from 'recharts';

interface GraphDisplayProps {
  data: { x: number; y: number; z: number }[];
  criticalPoints: { x: number; y: number; z: number }[];
}

export const GraphDisplay: React.FC<GraphDisplayProps> = ({ data, criticalPoints }) => {
  // Create a 2D projection for visualization (top view: x vs y, color represents z)
  const projectedData = data.map(point => ({
    x: point.x,
    y: point.y,
    z: point.z,
    color: point.z
  }));

  // Normalize z values for color mapping
  const zValues = data.map(d => d.z);
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);

  const getColorFromZ = (z: number) => {
    const normalized = (z - minZ) / (maxZ - minZ);
    const hue = (1 - normalized) * 240; // Blue to red spectrum
    return `hsl(${hue}, 70%, 50%)`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-purple-900/90 backdrop-blur-lg border border-purple-400/50 rounded-lg p-3 shadow-xl">
          <p className="text-purple-200 text-sm">x: {Number(point.x).toFixed(3)}</p>
          <p className="text-purple-200 text-sm">y: {Number(point.y).toFixed(3)}</p>
          <p className="text-white font-semibold">z: {Number(point.z).toFixed(3)}</p>
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
        r={2}
        fill={getColorFromZ(payload.z)}
        opacity={0.7}
      />
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-purple-200 text-sm mb-2">
        Surface visualization (top view: x-y plane, color represents z-height)
      </div>
      
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={projectedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8B5CF6" opacity={0.3} />
            <XAxis 
              dataKey="x" 
              type="number"
              domain={['dataMin', 'dataMax']}
              stroke="#C084FC" 
              fontSize={12}
              tickFormatter={(value) => Number(value).toFixed(1)}
              label={{ value: 'x', position: 'bottom', fill: '#C084FC' }}
            />
            <YAxis 
              dataKey="y" 
              type="number"
              domain={['dataMin', 'dataMax']}
              stroke="#C084FC" 
              fontSize={12}
              tickFormatter={(value) => Number(value).toFixed(1)}
              label={{ value: 'y', angle: -90, position: 'insideLeft', fill: '#C084FC' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              dataKey="z" 
              shape={<CustomDot />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Critical points overlay */}
      {criticalPoints.length > 0 && (
        <div className="h-24 w-full">
          <div className="text-center text-purple-200 text-sm mb-2">Critical points highlighted</div>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={criticalPoints} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <XAxis 
                dataKey="x" 
                type="number" 
                domain={['dataMin', 'dataMax']} 
                hide 
              />
              <YAxis 
                dataKey="y" 
                type="number" 
                domain={['dataMin', 'dataMax']} 
                hide 
              />
              <Scatter 
                dataKey="z" 
                fill="#F59E0B" 
                stroke="#FFFFFF" 
                strokeWidth={2}
                r={6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Color legend */}
      <div className="flex items-center justify-center gap-4 text-sm text-purple-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorFromZ(minZ) }}></div>
          <span>Low z ({minZ.toFixed(2)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorFromZ(maxZ) }}></div>
          <span>High z ({maxZ.toFixed(2)})</span>
        </div>
      </div>
    </div>
  );
};
