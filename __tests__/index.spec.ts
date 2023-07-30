import createProxy from '../src';

describe('api.basic', () => {
  test('normail single value case', () => {
    const person = {
      name: 'John Doe',
      age: 42,
      nationality: 'American',
    };

    const state = createProxy(person, (st, a, b, c) => {
      console.log('state change : ', st, a, b, c);
    });

    state.name = 'Jane Doe';

    expect(state.name).toBe('Jane Doe');
  });
});
