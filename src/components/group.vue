<template lang="pug">
    div(:class="$options.$vc.basename + '-group'")
        slot
</template>

<script>
    import {defaults, toggleElement} from './../defaults'
    export default {
        data: function () {
            return {}
        },
        // computed props for accessing elements
        computed: {
            elements : function () {
                return this.$children;
            },
            elements_count : function () {
                return this.$children.length;
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