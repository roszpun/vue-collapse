module.exports = {
  prod: {
    entry: './src/index.js',
    lib: 'vue-collapsible.js',
    extensions: ['.js', '.vue', '.json'],
    env: {
      NODE_ENV: '"development"'
    }
  }
};
