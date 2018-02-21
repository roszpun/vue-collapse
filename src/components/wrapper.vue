<template>
    <div :class="'vc-' + $options.$vc.settings.basename">
        <slot></slot>
    </div>
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
        
        props: ['active'],

        // status watcher - change toggle element when status changes
        watch: {
                active: function(status){
                      if ( status != null ) {
                        this.status = status;
                    }
                },

                status: function (new_value, old_value) {
                    this.$emit('onStatusChange', {vm: this, status: new_value, old_status: old_value});
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
                this.$emit('beforeToggle', this);
                this.status = !this.status;
                this.$emit('afterToggle', this);
            },
            close: function () {
                this.$emit('beforeClose', this);
                this.status = false;
                this.$emit('afterClose', this);
            },
            open: function () {
                this.$emit('beforeOpen', this);
                this.status = true;
                this.$emit('afterOpen', this);
            },
        },

        // mounting

        mounted: function () {
            this.nodes.toggle = this.$el.querySelector('.' + this.$options.$vc.settings.togglerClassDefault);
            this.nodes.content = this.$el.querySelector('.' + this.$options.$vc.settings.contentClassDefault);
            this.$emit('afterNodesBinding', {vm: this, nodes: this.nodes});
            if(this.nodes.toggle !== null){
                this.nodes.toggle.addEventListener('click', () => {
                    this.toggle();
                });
            }
            if ( this.active != null ) {
                    this.status = this.active;
            }
        }
    }
</script>

<style>
    .v-collapse-content{
        max-height: 0;
        transition: max-height 0.3s ease-out;
        overflow: hidden;
        padding: 0;
    }

    .v-collapse-content-end{
        transition: max-height 0.3s ease-in;
        max-height: 500px;
    }
</style>
