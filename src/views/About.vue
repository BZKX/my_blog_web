<template>
  <div class="about">
    <h1>About Page</h1>
    <a-space>
      <a-button @click="goPage('/')" type="primary">Home</a-button>
      <a-button @click="goPage('/formBuilder')" type="primary">formBuilder</a-button>
    </a-space>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  methods: {
    goPage(path) {
      this.$router.push(path)
    }
  }
}
</script>
