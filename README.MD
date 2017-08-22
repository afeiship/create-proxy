# next-abstract-storage
> An abstract storage based on next.


## usage:
```js
var _local = new nx.AbstractStorage({
  engine: localStorage,
  prefix: 'my'
});

_local.set('test1','test1Value');

_local.sets({
  fei:'test',
  age:108,
  items:[{
    son:'feifei',
    age: 0
  }]
});

document.querySelector('#all').innerHTML = JSON.stringify(
  _local.gets(),
  null,
  2
);

document.querySelector('#somekeys').innerHTML = JSON.stringify(
  _local.gets(['fei','age']),
  null,
  2
);

document.querySelector('#btn2').onclick = function(){
  _local.empty();
  document.querySelector('#cleard').innerHTML = 'ALL HAS EMPTY!';
};

console.log(_local.get('test1'));
console.log(_local.gets());
console.log(_local.gets(['fei','age']));

```

## todos:
- [ ] todo list..
