<template>
  <div class="tips-box">
    <span class="my-tips">{{ tips }}</span>
  </div>
</template>

<script>
export default {
  name: "tips",
  props: {
    tips: {
      type: String,
      default: 'tips'
    }
  }
}
</script>

<style lang="less" scoped>
.tips-box{
  width: 100%;
  text-align: center;
  margin-top: -20px;
  margin-bottom: 20px;
  .my-tips {
    line-height: 16px;
    color: #8c8c8c;
    font-size: 12px;
  }
}
</style>
