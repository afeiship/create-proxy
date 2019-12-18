(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxAbstractStorage = require('../src/next-abstract-storage');

  describe('NxAbstractStorage.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
