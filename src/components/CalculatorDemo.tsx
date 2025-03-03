import React, { useState } from 'react';
import Calculator from '@utils/Calculator';
import './CalculatorDemo.less';
import Button from './Button';

const CalculatorDemo: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operation, setOperation] = useState<string>('+');
  const [result, setResult] = useState<number | string>('');
  const [fibInput, setFibInput] = useState<number>(0);
  const [fibResult, setFibResult] = useState<number | string>('');
  const [factInput, setFactInput] = useState<number>(0);
  const [factResult, setFactResult] = useState<number | string>('');

  const calculator = new Calculator();

  const handleCalculate = () => {
    try {
      let calculatedResult: number;
      switch (operation) {
        case '+':
          calculatedResult = calculator.add(num1, num2);
          break;
        case '-':
          calculatedResult = calculator.subtract(num1, num2);
          break;
        case '*':
          calculatedResult = calculator.multiply(num1, num2);
          break;
        case '/':
          calculatedResult = calculator.divide(num1, num2);
          break;
        default:
          calculatedResult = 0;
      }
      setResult(calculatedResult);
    } catch (error) {
      if (error instanceof Error) {
        setResult(error.message);
      } else {
        setResult('An error occurred');
      }
    }
  };

  const calculateFibonacci = () => {
    try {
      if (fibInput > 40) {
        setFibResult('Input too large (max 40)');
        return;
      }
      const result = calculator.fibonacci(fibInput);
      setFibResult(result);
    } catch (error) {
      setFibResult('Error calculating Fibonacci');
    }
  };

  const calculateFactorial = () => {
    try {
      if (factInput > 20) {
        setFactResult('Input too large (max 20)');
        return;
      }
      const result = calculator.factorial(factInput);
      setFactResult(result);
    } catch (error) {
      setFactResult('Error calculating Factorial');
    }
  };

  return (
    <div className="calculator-demo">
      <h2>Calculator Demo (with Decorators)</h2>

      <div className="calculator-section">
        <h3>Basic Calculator</h3>
        <div className="calculator-inputs">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(Number(e.target.value))}
            placeholder="Number 1"
          />

          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>

          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(Number(e.target.value))}
            placeholder="Number 2"
          />

          <Button type="primary" onClick={handleCalculate}>
            =
          </Button>

          <div className="result">
            Result: <span>{result}</span>
          </div>
        </div>
      </div>

      <div className="calculator-section">
        <h3>Fibonacci Calculator (with memoization)</h3>
        <div className="calculator-inputs">
          <input
            type="number"
            value={fibInput}
            onChange={(e) => setFibInput(Number(e.target.value))}
            placeholder="Enter n"
            min="0"
            max="40"
          />

          <Button type="primary" onClick={calculateFibonacci}>
            Calculate
          </Button>

          <div className="result">
            Fibonacci({fibInput}) = <span>{fibResult}</span>
          </div>
        </div>
        <p className="note">
          Open the console to see the decorator logs. Notice how memoization prevents recalculation.
        </p>
      </div>

      <div className="calculator-section">
        <h3>Factorial Calculator</h3>
        <div className="calculator-inputs">
          <input
            type="number"
            value={factInput}
            onChange={(e) => setFactInput(Number(e.target.value))}
            placeholder="Enter n"
            min="0"
            max="20"
          />

          <Button type="primary" onClick={calculateFactorial}>
            Calculate
          </Button>

          <div className="result">
            {factInput}! = <span>{factResult}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDemo;
