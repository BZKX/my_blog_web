<template>
  <div class="home">
    <h1>Home Page</h1>
    <a-space>
      <a-button @click="goPage('/about')" type="primary">About</a-button>
      <a-button @click="goPage('/formBuilder')" type="primary">formBuilder</a-button>
    </a-space>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    goPage(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
