import React, { useState } from 'react';
import { FunctionInput } from '@/components/FunctionInput';
import { GraphDisplay } from '@/components/GraphDisplay';
import { CriticalPointsDisplay } from '@/components/CriticalPointsDisplay';
import { findCriticalPoints, generateSurfaceData } from '@/utils/mathUtils';

const Index = () => {
  const [functionExpression, setFunctionExpression] = useState('');
  const [criticalPoints, setCriticalPoints] = useState<{x: number, y: number, z: number}[]>([]);
  const [graphData, setGraphData] = useState<{x: number, y: number, z: number}[]>([]);
  const [error, setError] = useState('');

  const handleFunctionSubmit = (expression: string) => {
    try {
      setError('');
      setFunctionExpression(expression);
      
      const data = generateSurfaceData(expression);
      setGraphData(data);
      
      const points = findCriticalPoints(expression);
      setCriticalPoints(points);
      
    } catch (err) {
      setError('Invalid function');
      setCriticalPoints([]);
      setGraphData([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white mb-4">
            Critical Points Analyzer
          </h1>
          <p className="text-white/60">
            Visualize two-variable functions and find critical points
          </p>
        </div>

        <FunctionInput onSubmit={handleFunctionSubmit} />
        
        {error && (
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-sm">
              {error}
            </div>
          </div>
        )}

        {functionExpression && !error && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/5 backdrop-blur rounded-lg border border-white/10 p-6">
              <h2 className="text-white text-lg font-light mb-4">Surface Plot</h2>
              <GraphDisplay data={graphData} criticalPoints={criticalPoints} />
            </div>

            <div className="bg-white/5 backdrop-blur rounded-lg border border-white/10 p-6">
              <h2 className="text-white text-lg font-light mb-4">Critical Points</h2>
              {functionExpression && (
                <div className="mb-4 p-3 bg-white/5 rounded border border-white/10">
                  <p className="text-white/40 text-xs mb-1">f(x,y) =</p>
                  <p className="text-white font-mono text-sm">{functionExpression}</p>
                </div>
              )}
              <CriticalPointsDisplay points={criticalPoints} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;