<template>
    <div class="v-collapse-group">
        <slot></slot>
    </div>
</template>

<script>
    import {defaults} from './../defaults'
    export default {
        data: function () {
            return {}
        },

        props: {
            onlyOneActive: {
                default: false,
                type: Boolean
            }
        },

        // computed props for accessing elements
        computed: {
            elements : function () {
                return this.$children;
            },
            elements_count : function () {
                return this.$children.length;
            },
            active_elements: function () {
                return this.$children.filter(function (el) {
                    return el.status === true;
                })
            }
        },
        methods: {
            closeAll: function () {
                this.$children.forEach(function (el) {
                    el.close();
                })
            },
            openAll: function () {
                this.$children.forEach(function (el) {
                    el.open();
                })
            }
        }
    }
</script>