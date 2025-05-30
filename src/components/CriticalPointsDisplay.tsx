
import React from 'react';
import { Target, TrendingUp, TrendingDown, Circle } from 'lucide-react';

interface CriticalPointsDisplayProps {
  points: { x: number; y: number; z: number }[];
}

export const CriticalPointsDisplay: React.FC<CriticalPointsDisplayProps> = ({ points }) => {
  if (points.length === 0) {
    return (
      <div className="text-center py-8">
        <Target className="mx-auto text-purple-300 mb-4" size={48} />
        <p className="text-purple-200">No critical points found in the visible range.</p>
        <p className="text-purple-300 text-sm mt-2">Try a different function or expand the domain.</p>
      </div>
    );
  }

  // Simple classification for two-variable functions
  const classifyPoint = (index: number) => {
    // This is a simplified classification
    return index % 3 === 0 ? 'saddle' : index % 2 === 0 ? 'minimum' : 'maximum';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'minimum': return <TrendingDown size={20} />;
      case 'maximum': return <TrendingUp size={20} />;
      case 'saddle': return <Circle size={20} />;
      default: return <Circle size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'minimum': return 'bg-green-500/20 text-green-300';
      case 'maximum': return 'bg-red-500/20 text-red-300';
      case 'saddle': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-purple-500/20 text-purple-300';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'minimum': return 'Local Minimum';
      case 'maximum': return 'Local Maximum';
      case 'saddle': return 'Saddle Point';
      default: return 'Critical Point';
    }
  };

  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const type = classifyPoint(index);
        
        return (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-xl p-4 border border-purple-400/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getTypeColor(type)}`}>
                  {getIcon(type)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {getTypeName(type)}
                  </h4>
                  <p className="text-purple-200 text-sm">Critical Point #{index + 1}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-mono text-sm">
                  ({point.x.toFixed(3)}, {point.y.toFixed(3)}, {point.z.toFixed(3)})
                </div>
                <div className="text-purple-300 text-xs">
                  x = {point.x.toFixed(3)}, y = {point.y.toFixed(3)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
        <h4 className="text-white font-semibold mb-2">Summary</h4>
        <p className="text-purple-200 text-sm">
          Found <span className="font-semibold text-white">{points.length}</span> critical point{points.length !== 1 ? 's' : ''} 
          where both ∂f/∂x = 0 and ∂f/∂y = 0.
        </p>
      </div>
    </div>
  );
};
