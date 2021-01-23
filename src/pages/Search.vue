<template>
  <div class="search">
    <p>当前页:搜素页</p>
    <a @click="jumpList()">去列表页</a>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '搜索页',
  },
  methods: {
    jumpList() {
      this.$router.push({
        path: 'list',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  a {
    color: red;
    text-decoration: none;
  }
}
</style>
