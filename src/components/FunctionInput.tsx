
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Zap } from 'lucide-react';

interface FunctionInputProps {
  onSubmit: (expression: string) => void;
}

export const FunctionInput: React.FC<FunctionInputProps> = ({ onSubmit }) => {
  const [expression, setExpression] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expression.trim()) {
      onSubmit(expression.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setExpression(example);
    onSubmit(example);
  };

  const examples = [
    'x^2',
    'x^3-3*x^2+2',
    'x^2-4*x+3',
    'x^4-4*x^2'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
            <label htmlFor="function" className="block text-lg font-medium text-white mb-3">
              Enter Mathematical Function f(x)
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  id="function"
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="e.g., x^2, x^3-3*x^2+2, sin(x)"
                  className="text-lg h-14 bg-white/20 border-white/30 text-white placeholder-purple-200 focus:border-purple-400 focus:ring-purple-400/50"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Zap className="text-purple-300" size={20} />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Play className="mr-2" size={20} />
                Analyze
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="text-center">
          <p className="text-purple-200 mb-3">Quick examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-purple-200 hover:text-white transition-all duration-200 text-sm font-mono backdrop-blur-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
