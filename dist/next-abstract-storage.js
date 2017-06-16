(function () {

  var global = global || this;

  var nx = global.nx || require('next-js-core2');
  var NxAbstractStorage = nx.declare('nx.AbstractStorage', {
    methods:{
      init: function(inOptions){
        this.engine = inOptions.engine;
        this.prefix = inOptions.prefix || '';
      },
      set: function(inKey,inValue){
        global[this.engine].setItem(this.__key(inKey), nx.stringify(inValue));
      },
      sets: function(inObject){
        nx.each(inObject, function (key, value) {
          this.set(key, value);
        },this);
      },
      get: function(inKey){
        var value = global[this.engine].getItem(this.__key(inKey));
        return nx.parse(value);
      },
      gets: function(inKeys){
        var result={};
        var keys = this.__keys(inKeys);
        nx.each(keys,function(_,key){
          result[key]=this.get(key);
        },this);
        return result;
      },
      clear: function(inKey){
        global[this.engine].removeItem(this.__key(inKey));
      },
      clears: function(inKeys){
        var keys = this.__keys(inKeys);
        nx.each(keys,function(_,key){
          this.clear(key);
        },this);
      },
      __key:function (inKey){
        var prefix = this.prefix;
        return prefix ? [prefix,'.',inKey].join('') : inKey;
      },
      __keys: function(inKeys){
        var storeEngine = global[this.engine];
        var length_,keys;
        var self = this;
        var allNsKeys = [];
        if(!nx.isArray(inKeys)){
          keys = Object.keys(storeEngine);
          length_ = this.prefix.length + 1;
          nx.each(keys,function(_,item){
            if( item.indexOf(this.prefix+'.') === 0 ){
              allNsKeys.push( item.slice(length_) );
            }
          },this);
          return allNsKeys;
        }
        return inKeys;
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractStorage;
  }

}());
