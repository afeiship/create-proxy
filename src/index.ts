declare var wx: any;

const MSG_SYMBOL = 'Symbol is not supported';

function createProxy(obj, updateFn, path = '') {
  return new Proxy(obj, {
    get(target, key) {
      if (typeof key === 'symbol') throw new Error(MSG_SYMBOL);

      if (typeof target[key] === 'object' && target[key] !== null) {
        const newPath = path ? `${path}.${key}` : key;
        return createProxy(target[key], updateFn, newPath);
      }
      return target[key];
    },
    set(target, key, value) {
      if (typeof key === 'symbol') throw new Error(MSG_SYMBOL);

      const newPath = path ? `${path}.${key}` : key;
      if (target[key] !== value) {
        updateFn(target, key, value, {
          path: newPath,
          oldValue: target[key],
        }); // Pass the path to the updateFn
      }
      return Reflect.set(target, key, value);
    },
  });
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = createProxy;
}

export default createProxy;
