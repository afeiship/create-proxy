# next-abstract-storage
> An abstract storage based on next.


## usage:
```js
var _local = new nx.AbstractStorage({
  engine: 'localStorage',
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


console.log(_local.get('test1'));
console.log(_local.gets());
console.log(_local.gets(['fei','age']));
```

## todos:
- [ ] todo list..
