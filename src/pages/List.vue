<template>
  <div class="list">
    <p>当前页:列表页</p>
    <p>姓名:{{ name }}</p>
    <a @click="jumpSearch()">go搜索页</a>
    <ul>
      <li v-for="item in list" :key="item.id">
         <p>城市: {{item.name}}</p>
         <p>经度: {{item.lat}}</p>
         <p>维度: {{item.lon}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "列表页",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  asyncData({ store, route }) {
    return store.dispatch("getList");
  },
  mounted() {
    this.init();
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    list() {
      return this.$store.state.list;
    },
  },
  methods: {
    init() {
      if (this.list.length == 0) {
        //服务器已经渲染了,客户端就不用再渲染一遍了
        this.$store.dispatch("getList"); //获取页面数据
      }
    },
    jumpSearch() {
      this.$router.push({
        path: "search",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  a {
    color: red;
    text-decoration: none;
  }
}
</style>
