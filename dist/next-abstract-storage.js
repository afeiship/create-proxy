(function () {

  var global = global || this;
  var nx = global.nx || require('next-js-core2');
  var EMPTY_STR = '';
  var DOT = '.';
  var _ = nx.import(['is','json']);

  var NxAbstractStorage = nx.declare('nx.AbstractStorage', {
    methods:{
      init: function(inOptions){
        this.engine = inOptions.engine;
        this.prefix = inOptions.prefix || EMPTY_STR;
        this.api = {
          get: inOptions.get || 'getItem',
          set: inOptions.set || 'setItem',
          remove: inOptions.remove || 'removeItem',
          clear: inOptions.clear || 'clear'
        };
      },
      set: function(inKey,inValue){
        this.engine[this.api.set](this.__key(inKey), nx.stringify(inValue));
      },
      sets: function(inObject){
        nx.each(inObject, function (key, value) {
          this.set(key, value);
        },this);
      },
      get: function(inKey){
        var value = this.engine[this.api.get](this.__key(inKey));
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
        this.engine[this.api.remove](this.__key(inKey));
      },
      clears: function(inKeys){
        var keys = this.__keys(inKeys);
        nx.each(keys,function(_,key){
          this.clear(key);
        },this);
      },
      empty: function(){
        this.engine[this.api.clear]();
      },
      keys: function(){
        return Object.keys(this.engine);
      },
      __key:function (inKey){
        var prefix = this.prefix;
        return prefix ? [prefix,DOT,inKey].join(EMPTY_STR) : inKey;
      },
      __keys: function(inKeys){
        var storeEngine = this.engine;
        var length_,keys;
        var self = this;
        var allNsKeys = [];
        if(!nx.isArray(inKeys)){
          keys = this.keys();
          length_ = this.prefix.length + 1;
          nx.each(keys,function(_,item){
            if( this.prefix && item.indexOf(this.prefix+DOT) === 0 ){
              allNsKeys.push( item.slice(length_) );
            }
          },this);
          return  allNsKeys.length ? allNsKeys : keys;
        }
        return inKeys;
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractStorage;
  }

}());
