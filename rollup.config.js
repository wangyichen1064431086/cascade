const pkg = require('./package.json');
export default {
  entry:'main.js',
  targets:[
    {dest:pkg.module, format:'es'}
  ]
}