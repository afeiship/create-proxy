# next-abstract-storage
> An abstract storage based on next.

## implementation:
- [next-local-storage](https://github.com/afeiship/next-local-storage)
- [next-session-storage](https://github.com/afeiship/next-session-storage)
- [next-weapp-storage](https://github.com/afeiship/next-weapp-storage)

## apis:

## usage:
```js
var _local = new nx.AbstractStorage({
  engine: localStorage,
  prefix: 'my'
});
_local.set('test1', 'test1Value');
_local.sets({
  fei: 'test',
  age: 108,
  items: [
    {
      son: 'feifei',
      age: 0
    }
  ]
});

document.querySelector('#all').innerHTML = JSON.stringify(
  _local.gets(),
  null,
  2
);

document.querySelector('#somekeys').innerHTML = JSON.stringify(
  _local.gets(['fei', 'age']),
  null,
  2
);

document.querySelector('#btn2').onclick = function() {
  _local.empty();
  document.querySelector('#cleard').innerHTML = 'ALL HAS EMPTY!';
};

console.log(_local.get('test1'));
console.log(_local.gets());
console.log(_local.gets(['fei', 'age']));
```

## resources:
- https://www.npmjs.com/package/jest-localstorage-mock
- https://stackoverflow.com/questions/11485420/how-to-mock-localstorage-in-javascript-unit-tests
