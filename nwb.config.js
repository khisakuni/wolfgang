module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Schubert',
      externals: {
        react: 'React'
      }
    }
  }
}
