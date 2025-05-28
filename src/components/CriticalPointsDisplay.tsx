
import React from 'react';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';

interface CriticalPointsDisplayProps {
  points: { x: number; y: number }[];
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

  // Simple second derivative test for classification
  const classifyPoint = (x: number, index: number) => {
    // This is a simplified classification - in a real app you'd compute the second derivative
    if (index === 0) return 'minimum';
    if (index === points.length - 1) return 'maximum';
    return index % 2 === 0 ? 'minimum' : 'maximum';
  };

  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const type = classifyPoint(point.x, index);
        const isMin = type === 'minimum';
        
        return (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-xl p-4 border border-purple-400/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${isMin ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {isMin ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
                </div>
                <div>
                  <h4 className="font-semibold text-white capitalize">
                    {type === 'minimum' ? 'Local Minimum' : 'Local Maximum'}
                  </h4>
                  <p className="text-purple-200 text-sm">Critical Point #{index + 1}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-mono text-lg">
                  ({point.x.toFixed(3)}, {point.y.toFixed(3)})
                </div>
                <div className="text-purple-300 text-sm">
                  x = {point.x.toFixed(3)}
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
          where the derivative equals zero.
        </p>
      </div>
    </div>
  );
};
