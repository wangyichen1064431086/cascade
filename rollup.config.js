const pkg = require('./package.json');
export default {
  input:'main.js',
  output:[
    {file:pkg.module, format:'es'}
  ]
}