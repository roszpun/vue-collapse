<template lang="pug">
  #app
    v-collapse-group
      v-collapse-wrapper
        article.message.is-warning
          .message-header(v-collapse-toggle="")
            p Warning
            button.delete(aria-label='delete')
          .message-body(v-collapse-content='')
            |Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  width: 500px;
  margin: 150px auto 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
