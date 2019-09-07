module.exports = {
  // 基本路径
  publicPath: './',
  devServer: {
    proxy: 'http://localhost:9000/api'
  }
}