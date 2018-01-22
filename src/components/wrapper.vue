<template lang="pug">
    div(:class="$options.$vc.settings.basename")
        slot
</template>

<script>
    import {defaults, toggleElement, closeElement, openElement} from './../defaults'

    export default {
        data: function () {
            return {
                nodes: {},
                status: false,
            }
        },
        // status watcher - change toggle element when status changes
        watch: {
                status: function (new_value, old_value) {
                    if (this.$parent.onlyOneActive === false) {
                        toggleElement(this.nodes.content, this.$options.$vc.settings);
                    } else {
                        if (new_value === true && old_value === false) {
                            let active = this.$parent.$children.filter(function (el) {
                                return el.status === true;
                            });
                            if (active.length > 1) {
                                active.forEach(function (el) {
                                    el.close();
                                    closeElement(el.nodes.content, this.$options.$vc.settings);
                                }.bind(this))
                            }
                            openElement(this.nodes.content, this.$options.$vc.settings);
                            this.open();
                        } else if (old_value === true && new_value === false) {
                            closeElement(this.nodes.content, this.$options.$vc.settings);
                            this.close();
                        }
                    }

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
        overflow: hidden;
        padding: 0;
    }

    .v-collapse-content-end{
        transition: max-height 0.3s ease-in;
        max-height: 500px;
    }
</style>