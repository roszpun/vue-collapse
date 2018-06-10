module.exports = {
  prod: {
    entry: './src/index.js',
    lib: 'vue2-collapse.js',
    extensions: ['.js', '.vue', '.json'],
    env: {
      NODE_ENV: '"development"'
    }
  }
};
