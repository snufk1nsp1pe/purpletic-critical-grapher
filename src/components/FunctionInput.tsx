
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface FunctionInputProps {
  onSubmit: (expression: string) => void;
}

export const FunctionInput: React.FC<FunctionInputProps> = ({ onSubmit }) => {
  const [expression, setExpression] = useState('');

  useEffect(() => {
    if (expression.trim()) {
      const timeoutId = setTimeout(() => {
        onSubmit(expression.trim());
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [expression, onSubmit]);

  const handleExampleClick = (example: string) => {
    setExpression(example);
  };

  const examples = [
    'x^2 + y^2',
    'x^2 - y^2',
    'x^3 - 3*x*y^2',
    'sin(x)*cos(y)'
  ];

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="mb-6">
        <Input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter function: e.g., x^2 + y^2"
          className="text-lg h-12 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-white/30 focus:ring-white/20"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(example)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white/70 hover:text-white transition-all text-sm font-mono"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};
