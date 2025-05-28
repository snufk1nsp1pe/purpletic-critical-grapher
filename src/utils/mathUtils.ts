
// Simple math expression evaluator and critical point finder
// Note: This is a simplified implementation for demonstration

export const evaluateExpression = (expression: string, x: number): number => {
  // Replace x with the actual value and handle basic operations
  let expr = expression.toLowerCase();
  
  // Replace mathematical functions
  expr = expr.replace(/sin\(/g, 'Math.sin(');
  expr = expr.replace(/cos\(/g, 'Math.cos(');
  expr = expr.replace(/tan\(/g, 'Math.tan(');
  expr = expr.replace(/log\(/g, 'Math.log(');
  expr = expr.replace(/exp\(/g, 'Math.exp(');
  expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
  
  // Handle power notation
  expr = expr.replace(/\^/g, '**');
  
  // Replace x with the actual value
  expr = expr.replace(/x/g, `(${x})`);
  
  try {
    // Use Function constructor for safe evaluation
    return new Function('return ' + expr)();
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

export const generateGraphData = (expression: string, xMin: number = -5, xMax: number = 5, steps: number = 200): { x: number; y: number }[] => {
  const data: { x: number; y: number }[] = [];
  const stepSize = (xMax - xMin) / steps;
  
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * stepSize;
    try {
      const y = evaluateExpression(expression, x);
      if (isFinite(y) && !isNaN(y)) {
        data.push({ x, y });
      }
    } catch (error) {
      // Skip invalid points
    }
  }
  
  return data;
};

// Simplified derivative calculation using numerical differentiation
const numericalDerivative = (expression: string, x: number, h: number = 0.0001): number => {
  try {
    const f1 = evaluateExpression(expression, x + h);
    const f2 = evaluateExpression(expression, x - h);
    return (f1 - f2) / (2 * h);
  } catch (error) {
    return NaN;
  }
};

export const findCriticalPoints = (expression: string, xMin: number = -5, xMax: number = 5, precision: number = 0.01): { x: number; y: number }[] => {
  const criticalPoints: { x: number; y: number }[] = [];
  const stepSize = precision;
  
  let prevDerivative = numericalDerivative(expression, xMin);
  
  for (let x = xMin + stepSize; x <= xMax; x += stepSize) {
    const currentDerivative = numericalDerivative(expression, x);
    
    // Look for sign changes in the derivative (indicating critical points)
    if (!isNaN(prevDerivative) && !isNaN(currentDerivative)) {
      if ((prevDerivative > 0 && currentDerivative < 0) || (prevDerivative < 0 && currentDerivative > 0)) {
        try {
          const y = evaluateExpression(expression, x);
          if (isFinite(y) && !isNaN(y)) {
            // Refine the critical point location
            let refinedX = x;
            let minDerivative = Math.abs(currentDerivative);
            
            // Simple refinement by checking nearby points
            for (let delta = -stepSize; delta <= stepSize; delta += stepSize / 10) {
              const testX = x + delta;
              if (testX >= xMin && testX <= xMax) {
                const testDerivative = Math.abs(numericalDerivative(expression, testX));
                if (testDerivative < minDerivative) {
                  minDerivative = testDerivative;
                  refinedX = testX;
                }
              }
            }
            
            const refinedY = evaluateExpression(expression, refinedX);
            
            // Avoid duplicate points
            const isDuplicate = criticalPoints.some(point => 
              Math.abs(point.x - refinedX) < precision * 2
            );
            
            if (!isDuplicate) {
              criticalPoints.push({ x: refinedX, y: refinedY });
            }
          }
        } catch (error) {
          // Skip invalid points
        }
      }
    }
    
    prevDerivative = currentDerivative;
  }
  
  // Sort by x coordinate
  return criticalPoints.sort((a, b) => a.x - b.x);
};
