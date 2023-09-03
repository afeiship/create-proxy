import createProxy from '../src';

let deepGet = (obj, key) => (key.split('.').map((p) => (obj = obj && obj[p])), obj);

describe('api.basic', () => {
  test('01.Set new value', () => {
    const person = {
      name: 'John Doe',
      age: 42,
      nationality: 'American',
    };

    const state = createProxy(person, (target, key, newValue) => {
      const oldValue = target[key];
      expect(newValue).toBe('Jane Doe');
      expect(oldValue).toBe('John Doe');
      expect(key).toBe('name');
      expect(target).toBe(person);
    });

    state.name = 'Jane Doe';
  });

  test('02.Set deep should get dot path', () => {
    const person = {
      name: 'John Doe',
      age: 42,
      contact: {
        email: 'test@dev.com',
        phone: '123456789',
      },
    };

    const state = createProxy(person, (target, key, newValue, opts) => {
      // console.log('newValue/key/target/opts: ', newValue, key, target, opts);
      expect(opts.path).toBe('contact.email');
      expect(opts.oldValue).toBe('test@dev.com');
    });

    state.contact.email = 'test@163.com';
  });

  test('03.null object', () => {
    const person = null;
    const state = createProxy(person, (target, key, newValue) => {});

    expect(state).toBe(null);
  });

  test('04.not plain object', ()=>{
    const person = 'string';
    const state = createProxy(person, (target, key, newValue) => {});
    expect(state).toBe('string');
  })
});
