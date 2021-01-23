<template>
  <div class="app" id="root">
    <p>页面头部</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      btn_text: '详情页',
    };
  },
  methods: {
    clickHanlder() {
      this.btn_text = '点我';
    },
  },
};
</script>
<style scoped lang="scss">
.app {
  p {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #333;
    font-size: 30px;
  }
}
</style>
