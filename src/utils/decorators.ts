/**
 * 日志装饰器 - 记录方法的调用和返回值
 * @param target 目标对象
 * @param propertyKey 方法名
 * @param descriptor 属性描述符
 */
export function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

/**
 * 性能监控装饰器 - 测量方法执行时间
 * @param target 目标对象
 * @param propertyKey 方法名
 * @param descriptor 属性描述符
 */
export function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log(`${propertyKey} execution time: ${finish - start} ms`);
    return result;
  };

  return descriptor;
}

/**
 * 防抖装饰器 - 防止方法在短时间内被多次调用
 * @param delay 延迟时间（毫秒）
 */
export function debounce(delay: number = 300) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let timer: number | null = null;

    descriptor.value = function (...args: any[]) {
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = window.setTimeout(() => {
        originalMethod.apply(context, args);
      }, delay);
    };

    return descriptor;
  };
}

/**
 * 节流装饰器 - 限制方法在一定时间内只能被调用一次
 * @param limit 限制时间（毫秒）
 */
export function throttle(limit: number = 300) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let lastCall = 0;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}

/**
 * 缓存装饰器 - 缓存方法的返回值
 * @param target 目标对象
 * @param propertyKey 方法名
 * @param descriptor 属性描述符
 */
export function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}
