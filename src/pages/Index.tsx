
import React, { useState } from 'react';
import { FunctionInput } from '@/components/FunctionInput';
import { GraphDisplay } from '@/components/GraphDisplay';
import { CriticalPointsDisplay } from '@/components/CriticalPointsDisplay';
import { findCriticalPoints, generateGraphData } from '@/utils/mathUtils';
import { Calculator } from 'lucide-react';

const Index = () => {
  const [functionExpression, setFunctionExpression] = useState('');
  const [criticalPoints, setCriticalPoints] = useState<{x: number, y: number}[]>([]);
  const [graphData, setGraphData] = useState<{x: number, y: number}[]>([]);
  const [error, setError] = useState('');

  const handleFunctionSubmit = (expression: string) => {
    try {
      setError('');
      setFunctionExpression(expression);
      
      // Generate graph data
      const data = generateGraphData(expression);
      setGraphData(data);
      
      // Find critical points
      const points = findCriticalPoints(expression);
      setCriticalPoints(points);
      
    } catch (err) {
      setError('Invalid function. Please enter a valid mathematical expression.');
      setCriticalPoints([]);
      setGraphData([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="text-purple-300 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-white">
              Critical Point
              <span className="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                {" "}Analyzer
              </span>
            </h1>
          </div>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Find critical points and visualize mathematical functions with interactive graphs
          </p>
        </div>

        {/* Function Input */}
        <div className="mb-8">
          <FunctionInput onSubmit={handleFunctionSubmit} />
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-400 rounded-lg text-red-200 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {functionExpression && !error && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Graph */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                Function Graph
              </h2>
              <GraphDisplay data={graphData} criticalPoints={criticalPoints} />
            </div>

            {/* Critical Points */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
                Critical Points
              </h2>
              <div className="mb-4 p-3 bg-purple-800/30 rounded-lg">
                <p className="text-purple-200 text-sm mb-1">Function:</p>
                <p className="text-white font-mono text-lg">f(x) = {functionExpression}</p>
              </div>
              <CriticalPointsDisplay points={criticalPoints} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
