<template lang="pug">
  #app
      #div1.float
          bootstrap
      #div2.float
          bulma
</template>

<script>
import bootstrap from './components/bootstrap.vue'
import bulma from './components/bulma.vue'

export default {
  name: 'App',
  components: {
    bootstrap,
      bulma
  }
}
</script>

<style>
    html, body { height: 100%; padding: 0; margin: 0; }
    pre{
        text-align: left;
    }
    .float { width: 50%; height: 100vh; float: left; }
    #div1 { background: #f4f4f4; }
    #div2 { background: #f9f9f9; }
    #div3 { background: #777; }
    #div4 { background: #444; }
#app {
  width: 100%;
  margin:0;
    height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
