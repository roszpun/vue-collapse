<template lang="pug">
div
    .p-3.mb-2.bg-primary.text-white
        .bg-primary Bootstrap
    v-collapse-group(:onlyOneActive="true")
        v-collapse-wrapper(v-for="(item, index) in start", :key="index")
          .card
            .card-header
              h5.mb-0
                button.btn.btn-link(v-collapse-toggle="")
                  | Collapsible Group Item {{index+1}}
            .card-body(v-collapse-content="")
                p
                    | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
    h1  Soruce:
    pre.pre-scrollable(v-highlightjs='code')
        code(class="hljs")
</template>

<script>
export default {
  data () {
    return {
        start: 3,
        code: `v-collapse-group(:onlyOneActive="true")
  v-collapse-wrapper(v-for="(item, index) in start", :key="index")
     .card
        .card-header
           h5.mb-0
              button.btn.btn-link(v-collapse-toggle="") Collapsible Group Item {{index+1}}
        .card-body(v-collapse-content="")
           p
             |Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .v-collapse-group{
        padding: 30px;
    }
    .card-body p{
        padding: 15px;
    }
</style>
