<template lang="pug">
div
    article.message.is-primary
        .message-header.bulma-header
            h1 Bulma - other usage.
    .bulma-form
        .field
            label.label Name
            .control
                input.input(type='text', placeholder='e.g Alex Smith')
        .field
            label.label Email
            .control
                input.input(type='email', placeholder='e.g. alexsmith@gmail.com')
        .field
            .control
                label.checkbox
                    input(type='checkbox' v-collapse-toggle="'show_more_fields'")
                    |&nbsp; Yes, I have promo code (click me)
        v-collapse-wrapper(ref="show_more_fields")
            div(v-collapse-content="")
                .field
                    label.label Name
                    .control
                        input.input(type='text', placeholder='e.g Alex Smith')
                .field
                    label.label Email
                    .control
                        input.input(type='email', placeholder='e.g. alexsmith@gmail.com')
        .field
        .field.is-grouped
            p.control
                a.button.is-primary
                    | Submit
            p.control
                a.button.is-light
                    | Cancel
    h1  Soruce:
    pre.pre-scrollable(v-highlightjs='code')
        code(class="hljs")
</template>

<script>
export default {
  data () {
    return {
        code: ` article.message.is-primary
        .message-header.bulma-header
            h1 Bulma - other usage.
    .bulma-form
        .field
            label.label Name
            .control
                input.input(type='text', placeholder='e.g Alex Smith')
        .field
            label.label Email
            .control
                input.input(type='email', placeholder='e.g. alexsmith@gmail.com')
        .field
            .control
                label.checkbox
                    input(type='checkbox' v-collapse-toggle="'show_more_fields'")
                    |&nbsp; Yes, I have promo code (click me)
        v-collapse-wrapper(ref="show_more_fields")
            div(v-collapse-content="")
                .field
                    label.label Name
                    .control
                        input.input(type='text', placeholder='e.g Alex Smith')
                .field
                    label.label Email
                    .control
                        input.input(type='email', placeholder='e.g. alexsmith@gmail.com')
        .field
        .field.is-grouped
            p.control
                a.button.is-primary
                    | Submit
            p.control
                a.button.is-light
                    | Cancel`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bulma-header{
        padding: 18px 0 19px;
        text-align: center;
    }
    .bulma-header h1{
        width: 100%;
        text-align: center;
    }
    .bulma-form{
        padding: 30px;
    }
    label{
        text-align: left;
    }
</style>
