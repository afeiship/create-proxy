(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxAbstractStorage = require('../src/next-abstract-storage');


  var NxAbstractStorage = require('../src/next-abstract-storage');

  var store1 = new NxAbstractStorage({
    engine: localStorage,
    prefix: 'my'
  });

  test('test method set', () => {
    store1.set('k1', 'value1');
    store1.set('k2', { name: 233 });

    var k1 = JSON.parse(localStorage.getItem('my@k1'));
    var k2 = JSON.parse(localStorage.getItem('my@k2'));
    // console.log(store1.keys(), store1.__keys());
    expect(k1).toBe('value1');
    expect(k2).toEqual({ name: 233 });
  });

  test('test method get', () => {
    store1.set('k1', 'value1');
    store1.set('k2', { name: 233 });

    var k1 = store1.get('k1');
    var k2 = store1.get('k2');

    expect(k1).toBe('value1');
    expect(k2).toEqual({ name: 233 });
  });

  test('test method sets/gets', () => {
    store1.sets({
      name: 'bj',
      cn: '北京'
    });

    var rs = store1.gets();

    expect(rs).toEqual({ k1: 'value1', k2: { name: 233 }, name: 'bj', cn: '北京' });
  });

  test('test method clear', () => {
    store1.del('cn');

    var rs = store1.gets();

    expect(rs).toEqual({ k1: 'value1', k2: { name: 233 }, name: 'bj' });
  });

  test('test method clears', () => {
    store1.dels(['name', 'k1']);
    var rs = store1.gets();
    expect(rs).toEqual({ k2: { name: 233 } });
  });

  test('test method empty', () => {
    store1.clear();
    var rs = store1.gets();
    expect(rs).toEqual({});
  });

  test('test set/get with path', () => {
    store1.set('k3.b.c', 'b-c-vlaue');
    store1.set('kf.0.test', { name: 'fei' });
    expect(store1.get('k3.b.c')).toBe('b-c-vlaue');
    expect(store1.get('k3.b.d')).toBeUndefined();
    expect(store1.get('kf.0.test')).toEqual({ name: 'fei' });
    expect(store1.get('kf.0.test.name')).toBe('fei');
    // console.log(store1.gets());
  });

})();
