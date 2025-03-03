import { log, measure, memoize } from './decorators';

/**
 * 计算器类 - 展示装饰器的使用
 */
class Calculator {
  /**
   * 计算斐波那契数列的第n个数
   * 使用memoize装饰器缓存结果，避免重复计算
   * 使用log装饰器记录方法调用
   * 使用measure装饰器测量执行时间
   */
  @log
  @measure
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  /**
   * 计算阶乘
   * 使用log装饰器记录方法调用
   * 使用measure装饰器测量执行时间
   */
  @log
  @measure
  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }

  /**
   * 计算两数之和
   */
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * 计算两数之差
   */
  @log
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * 计算两数之积
   */
  @log
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * 计算两数之商
   */
  @log
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}

export default Calculator;
