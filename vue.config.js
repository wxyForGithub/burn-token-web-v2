module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?'./' : '/', // 默认'/'，部署应用包时的基本 URL
  productionSourceMap:false,
  outputDir:process.env.VUE_APP_title,
  integrity:true, //
}
