<template>
  <div
    :class="[$style.fullY, $style.flexCenter]"
    style="background-color: rgba(255,255,255)"
  >
    <div :class="$style.error">
      <div :class="$style.errorImg">
        <img src="@assets/images/error-page/index-gone.png" />
      </div>
      <p :class="$style.title">啊呀！页面飞走了</p>
      <p :class="$style.msg">抱歉，您所访问的页面不存在</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exception404'
};
</script>

<style lang="less" module>
.box {
  height: 100%;
}

.error {
  text-align: center;

  .errorImg {
    width: 294px;
    height: 170.4px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  p:nth-child(2) {
    font-size: @font-size-large;
    font-weight: @title-font-weight;
    color: rgba(46, 49, 51);
  }

  p:nth-child(3) {
    font-size: @font-size-small;
    color: rgb(92, 97, 102);
  }
}
</style>
