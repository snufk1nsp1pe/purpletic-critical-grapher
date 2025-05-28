
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ScatterChart } from 'recharts';

interface GraphDisplayProps {
  data: { x: number; y: number }[];
  criticalPoints: { x: number; y: number }[];
}

export const GraphDisplay: React.FC<GraphDisplayProps> = ({ data, criticalPoints }) => {
  // Combine data for the chart
  const combinedData = data.map(point => ({
    ...point,
    isCritical: criticalPoints.some(cp => Math.abs(cp.x - point.x) < 0.01)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-purple-900/90 backdrop-blur-lg border border-purple-400/50 rounded-lg p-3 shadow-xl">
          <p className="text-purple-200 text-sm">x: {Number(label).toFixed(3)}</p>
          <p className="text-white font-semibold">y: {Number(payload[0].value).toFixed(3)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#8B5CF6" opacity={0.3} />
          <XAxis 
            dataKey="x" 
            stroke="#C084FC" 
            fontSize={12}
            tickFormatter={(value) => Number(value).toFixed(1)}
          />
          <YAxis 
            stroke="#C084FC" 
            fontSize={12}
            tickFormatter={(value) => Number(value).toFixed(1)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="y"
            stroke="url(#colorGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#F59E0B', stroke: '#FFFFFF', strokeWidth: 2 }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
      
      {/* Overlay critical points */}
      {criticalPoints.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={criticalPoints} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                dataKey="y" 
                fill="#F59E0B" 
                stroke="#FFFFFF" 
                strokeWidth={3}
                r={8}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
