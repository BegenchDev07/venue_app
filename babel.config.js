module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
      compiler: 'vite',  // Switch to Webpack as you are using it now
      useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false
    }]
  ]
}
