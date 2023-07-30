import createProxy from '../src';

describe('api.basic', () => {
  test('01.Set new value', () => {
    const person = {
      name: 'John Doe',
      age: 42,
      nationality: 'American',
    };

    const state = createProxy(person, (newValue, oldValue, key, target) => {
      expect(newValue).toBe('Jane Doe');
      expect(oldValue).toBe('John Doe');
      expect(key).toBe('name');
      expect(target).toBe(person);
    });

    state.name = 'Jane Doe';
  });
});
