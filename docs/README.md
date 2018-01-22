> VueCollapse - a flexible accordion plugin

# Getting started

## Quick start

In order to make the plugin work we need to download necessary dependencies.

``` bash
npm install --save-dev vue2-collapse
```

Next thing to do is adding the plugin to the Vue.

``` javascript
// Import Vue and vue2-collapse
import Vue from 'vue'
import VueCollapse from 'vue2-collapse'

// Loading the plugin into the Vue.
Vue.use(VueCollapse)
```

## Usage

### Basic example
Every collapse element requires the `<v-collapse-wrapper></v-collapse-wrapper>` component which represent single accordion element.

``` html
<v-collapse-wrapper>
    <div class="header" v-collapse-toggle>
        Click me to see content
    </div>
    <div class="content" v-collapse-content>
        This is hiddend content
    </div>
</v-collapse-wrapper>
```

The div element with `header` class thanks to `v-collapse-toggle` directive will be a clickable element which will show and hide the content. Applying `v-collapse-content` to the element with `content` class binds it with the toggle element. While clicking on the header element, the content will be toggled.

### Grouping elements

VueCollapse allows to wrap more elements into a group components `<v-collapse-group></v-collapse-group>`, which helps with code organisation and provides some additional functionality.

``` html
<v-collapse-group :onlyOneActive="true">
    <v-collapse-wrapper> ... </v-collapse-wrapper>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
</v-collapse-group>
```
By the default, each element will stay open after opening, however setting the `onlyOneActive` to `true` will prevent group from opening more than one element at the same time. This is very common and wanted feature when building accordions.

### Custom toggle element example

In some cases developers need to create a custom toggle element which not necessarily has to rendered within the wrapper element. VueCollapse provides a solution for that cases. Thanks to Vue's API `ref` we can assign an external (located outside the wrapper) toggler.
 
``` html
<button v-collapse-toggle="'toggle_first'">Toggle first element</button>
<button v-collapse-toggle="'toggle_second'">Toggle second element</button>

<v-collapse-wrapper ref="toggle_first">
    <div class="content" v-collapse-content>
        This is hiddend content
    </div>
</v-collapse-wrapper>
<v-collapse-wrapper ref="toggle_second">
    <div class="content" v-collapse-content>
        This is hiddend content
    </div>
</v-collapse-wrapper>
``` 
**Notice:**  the `v-collapse-toggle` directive was removed from the `v-collapse-wrapper` component, but it is **valid** to keep secondary toggler within the wrapper.


### Nesting
VueCollapse allows to nest elements inside each other. The nested element should rendered within the `v-collapse-content` directive element.

``` html
<v-collapse-wrapper>
    <div class="header" v-collapse-toggle>
        Click me to see content
    </div>
    <div class="content" v-collapse-content>
        <v-collapse-wrapper>
            <div class="header" v-collapse-toggle>
                Click me to see content
            </div>
            <div class="content" v-collapse-content>
                This is hiddend content
            </div>
        </v-collapse-wrapper>
    </div>
</v-collapse-wrapper>
```

## Plugin elements
### Components
#### v-collapse-wrapper
Wrapper component which should **always** be a parent of elements which are using `v-collapse-content ` and `v-collapse-toggle` directives.

#### v-collapse-group
This is a group component. Sometimes there is a need of creating several different accordion lists. Grouping list elements helps with more complex cases. Components stores list of all elements in the accordion.

### Directives
#### v-collapse-content
This directive ought to be applied on the DOM element which will contain content of single list element. **Only** this element will be able to be toggled on and off within wrapper component. Element with this directive should **not** be a parent of the element with `v-collapse-toggle` directive.

#### v-collapse-toggle
The directive changes  a default behavior of the element and allows to click on it in order to toggle list element. Note that this directive should be located within the `<v-collapse-wrapper></v-collapse-wrapper>` in order to make it working without manual binding.
However if it is needed to create a toggle element somewhere else, not inside the wrapper component you can use vue's reference to make it work.


## Complex usage

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



