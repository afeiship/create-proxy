declare var wx: any;

const CreateProxy = (): void => {
  console.log('hello');
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = CreateProxy;
}

export default CreateProxy;
