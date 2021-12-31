const QKI_CONFIG = {
  chainId: '20181205',
  chainIdHex: '0x133f0d5',
  chainName:"qki",
  nativeCurrency:"QKI",
  tipsDesc: '推荐使用 qkswap 交易，避免被骗。点击进入',
  tipsUrl: 'https://app.qkswap.io',
  openPluginToast : '请安装metamask插件、或者使用qkpay打开',
  toggleToast : '请使用QKI主网,请切换到QKI主网',
  useToast: '请使用qki主网',
  toggleToast2: '你当前没有使用QKI主网，请切换主网为QKI',
  rpcUrl:['https://sg.node.quarkblockchain.org'],
  blockExplorerUrls:['https://qkiscan.io/']
}

const HECO_CONFIG = {
  chainId: '128',
  chainIdHex: '0x80',
  chainName:"heco",
  nativeCurrency:"HT",
  tipsDesc: '推荐使用 qkswap 交易，避免被骗。点击进入',
  tipsUrl: 'https://app.qkswap.io/',
  openPluginToast : '请安装metamask插件、或者使用qkpay打开',
  toggleToast : '请使用HECO主网,请切换到HECO主网',
  useToast: '请使用HECO主网',
  toggleToast2: '你当前没有使用HECO主网，请切换主网为HECO',
  rpcUrl:['https://http-mainnet.hecochain.com'],
  blockExplorerUrls:['https://hecoinfo.com/']
}
const GLOBAL_CONFIGS = process.env.VUE_APP_PLATFORM == "QKI" ? QKI_CONFIG : HECO_CONFIG
export {
  GLOBAL_CONFIGS,
  QKI_CONFIG,
  HECO_CONFIG
};
