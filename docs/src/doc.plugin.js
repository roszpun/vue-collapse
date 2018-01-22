// Default configuration
const prefix = 'v-collapse';
const basename = 'collapse';

const defaults = {
    'prefix' : prefix,
    'basename' : basename,
    'togglerClassDefault': prefix + '-toggler',
    'togglerClassStart': prefix + '-toggler-start',
    'togglerClassEnd': prefix + '-toggler-end',
    'contentClassDefault': prefix + '-content',
    'contentClassStart': prefix + '-content-start',
    'contentClassEnd': prefix + '-content-end'
};

// Global toggle methods

const toggleElement = function (target, config) {
    target.classList.toggle(config.contentClassEnd);
};

const closeElement = function (target, config) {
    target.classList.remove(config.contentClassEnd);
};

const openElement = function (target, config) {
    target.classList.add(config.contentClassEnd);
};


let VueCollapse = {};
VueCollapse.install = function (Vue, options) {

    // merge configs

    const settings = Object.assign(defaults, options);

    // creating required components
    Vue.component(settings.prefix + '-group', {
        template: '<div class="v-collapse-group"><slot></slot></div>',
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
    });

    Vue.component(settings.prefix + '-wrapper', {
        template : `<div :class="'vc-' + $options.$vc.settings.basename">
  <slot></slot>
</div>`,
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
            if(this.nodes.toggle !== null){
                this.nodes.toggle.addEventListener('click', () => {
                    this.toggle();
                });
            }
        }
    });
    // creates instance of settings in the Vue

    Vue.mixin({
        created: function () {
            this.$options.$vc = {
                settings : settings
            };
        }
    });

    // content directive

    Vue.directive(settings.basename + '-content', {

        // assigning css classes from settings

        bind (el, binding, vnode, oldVnode) {
            vnode.elm.classList.add(vnode.context.$options.$vc.settings.contentClassDefault);
            vnode.elm.classList.add(vnode.context.$options.$vc.settings.contentClassStart);
        }
    });

    // toggler directive

    Vue.directive(settings.basename + '-toggle', {

        // adding toggle class

        bind (el, binding, vnode, oldVnode) {
            vnode.elm.classList.add(vnode.context.$options.$vc.settings.togglerClassDefault);
        },

        // Creating custom toggler handler

        inserted (el, binding, vnode, oldVnode) {
            if (binding.value != null) {
                vnode.elm.addEventListener('click', function () {
                    vnode.context.$refs[binding.value].status = !vnode.context.$refs[binding.value].status;
                }.bind(this));
            }
        }
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueCollapse)
}
export default VueCollapse;