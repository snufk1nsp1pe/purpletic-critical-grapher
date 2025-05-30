
// Math utilities for two-variable functions f(x,y)

export const evaluateExpression = (expression: string, x: number, y: number): number => {
  // Replace x and y with actual values and handle basic operations
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
  
  // Replace x and y with actual values - be careful with order
  expr = expr.replace(/y/g, `(${y})`);
  expr = expr.replace(/x/g, `(${x})`);
  
  try {
    // Use Function constructor for safe evaluation
    return new Function('return ' + expr)();
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

export const generateSurfaceData = (
  expression: string, 
  xMin: number = -3, 
  xMax: number = 3, 
  yMin: number = -3, 
  yMax: number = 3, 
  steps: number = 30
): { x: number; y: number; z: number }[] => {
  const data: { x: number; y: number; z: number }[] = [];
  const xStepSize = (xMax - xMin) / steps;
  const yStepSize = (yMax - yMin) / steps;
  
  for (let i = 0; i <= steps; i++) {
    for (let j = 0; j <= steps; j++) {
      const x = xMin + i * xStepSize;
      const y = yMin + j * yStepSize;
      try {
        const z = evaluateExpression(expression, x, y);
        if (isFinite(z) && !isNaN(z)) {
          data.push({ x, y, z });
        }
      } catch (error) {
        // Skip invalid points
      }
    }
  }
  
  return data;
};

// Numerical partial derivatives
const partialDerivativeX = (expression: string, x: number, y: number, h: number = 0.001): number => {
  try {
    const f1 = evaluateExpression(expression, x + h, y);
    const f2 = evaluateExpression(expression, x - h, y);
    return (f1 - f2) / (2 * h);
  } catch (error) {
    return NaN;
  }
};

const partialDerivativeY = (expression: string, x: number, y: number, h: number = 0.001): number => {
  try {
    const f1 = evaluateExpression(expression, x, y + h);
    const f2 = evaluateExpression(expression, x, y - h);
    return (f1 - f2) / (2 * h);
  } catch (error) {
    return NaN;
  }
};

export const findCriticalPoints = (
  expression: string, 
  xMin: number = -3, 
  xMax: number = 3, 
  yMin: number = -3, 
  yMax: number = 3, 
  precision: number = 0.1
): { x: number; y: number; z: number }[] => {
  const criticalPoints: { x: number; y: number; z: number }[] = [];
  const stepSize = precision;
  
  for (let x = xMin; x <= xMax; x += stepSize) {
    for (let y = yMin; y <= yMax; y += stepSize) {
      const dfdx = partialDerivativeX(expression, x, y);
      const dfdy = partialDerivativeY(expression, x, y);
      
      // Look for points where both partial derivatives are close to zero
      if (!isNaN(dfdx) && !isNaN(dfdy)) {
        if (Math.abs(dfdx) < 0.01 && Math.abs(dfdy) < 0.01) {
          try {
            const z = evaluateExpression(expression, x, y);
            if (isFinite(z) && !isNaN(z)) {
              // Avoid duplicate points
              const isDuplicate = criticalPoints.some(point => 
                Math.abs(point.x - x) < precision && Math.abs(point.y - y) < precision
              );
              
              if (!isDuplicate) {
                criticalPoints.push({ x, y, z });
              }
            }
          } catch (error) {
            // Skip invalid points
          }
        }
      }
    }
  }
  
  return criticalPoints;
};
