<template>
  <div class="flex_h_between list_item">
    <div class="flex_v_start">
      <span class="fStyle26_B09B99">{{item && item.account ? subAddress(item.account|| '') : ''}}</span>
      <span class="fStyle22_E5D1CF">钱包地址</span>
    </div>
    <div class="flex_v_end">
      <span class="fStyle32_B09B99_w6">{{item && item.power || '0.00'}}</span>
      <span class="fStyle22_E5D1CF">算力</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object, 
      default: () => {}
    }
  },
  methods: {
    subAddress (addr, subLen = 6 ) {
      const address = addr
      if (address !== '') {
        const prevStr = address.substring(0, subLen)
        const lastStr = address.substring(
          address.length - subLen,
          address.length,
        )
        return prevStr + '...' + lastStr
      } else {
        return ''
      }
    },
  }
}
</script>

<style lang="scss" scoped>
$fColor_B09B99: #B09B99;
$fColor_E5D1CF: #E5D1CF;
$fSize_32: 32px;
$fSize_26: 26px;
$fSize_22: 22px;

.fStyle22_E5D1CF{
  font-size: $fSize_22;
  color: $fColor_E5D1CF;
}
.fStyle26_B09B99{
  font-size: $fSize_26;
  color: $fColor_B09B99;
}
.fStyle32_B09B99_w6{
  font-size: $fSize_26;
  color: $fColor_B09B99;
  font-weight: 600;
}
.list_item{
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>