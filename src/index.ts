declare var wx: any;

const createProxy = (obj, updateFn) => {
  return new Proxy(obj, {
    get(target, key) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        return createProxy(target[key], updateFn);
      }
      return target[key];
    },
    set(target, key, value) {
      const oldValue = target[key];
      if (oldValue !== value) {
        updateFn(target, key, value);
      }
      return Reflect.set(target, key, value);
    },
  });
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = createProxy;
}

export default createProxy;
