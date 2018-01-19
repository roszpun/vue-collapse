<template lang="pug">
    div(:class="$options.$vc.settings.basename")
        slot
</template>

<script>
    import {defaults, toggleElement} from './../defaults'

    export default {
        data: function () {
            return {
                nodes: {},
                status: false,
            }
        },
        // status watcher - change toggle element when status changes
        watch: {
            status: function(val) {
                toggleElement(this.nodes.content, this.$options.$vc.settings);
            }
        },

        // collapse basic instance methods

        methods: {
            toggle: function () {
                this.status = !this.status;
            },
            close: function () {
                this.status = false;
            },
            open: function () {
                this.status = true;
            },
        },

        // mounting

        mounted: function () {
            this.nodes.toggle = this.$el.querySelector('.' + this.$options.$vc.settings.togglerClassDefault);
            this.nodes.content = this.$el.querySelector('.' + this.$options.$vc.settings.contentClassDefault);
            this.nodes.toggle.addEventListener('click', () => {
                this.toggle();
            });
        }
    }
</script>

<style>
    .v-collapse-content{
        max-height: 0;
        transition: max-height 0.3s ease-out;
    }

    .v-collapse-content-start{
        background: red;
        overflow: hidden;
        padding: 0;
    }

    .v-collapse-content-end{
        transition: max-height 0.3s ease-in;
        max-height: 500px;
    }
</style>