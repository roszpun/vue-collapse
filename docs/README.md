> VueCollapse - a flexible accordion plugin for Vue.js 2

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
        Click me to toggle content
    </div>
    <div class="my-content" v-collapse-content>
        This is hiddend content
    </div>
</v-collapse-wrapper>
```

The div element with `header` class thanks to `v-collapse-toggle` directive will be a clickable element which will show and hide the content. Applying `v-collapse-content` to the element with `content` class binds it with the toggle element. While clicking on the header element, the content will be toggled.

**By the default only one accordion element can be opened, toggling another will close previously opened element.**

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
**By the default, each element will stay opened after toggle action, however setting the `onlyOneActive` to `true` will prevent group from opening more than one element at the same time- same behaviour as non-grouped elements.**
### Custom toggle element

In some cases developers need to create a custom toggle element which not necessarily has to rendered within the wrapper element. VueCollapse provides a solution for that cases. Thanks to Vue's API `ref` we can assign an external (located outside the wrapper) toggler.
 
``` html
<button v-collapse-toggle="'toggle_first'">Toggle first element</button>
<button v-collapse-toggle="'toggle_second'">Toggle second element</button>

<v-collapse-wrapper ref="toggle_first">
    <div class="my-content" v-collapse-content>
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
VueCollapse allows to nest elements inside each other. The nested element should be rendered within the `v-collapse-content` directive element.

``` html
<v-collapse-wrapper>
    <div class="header" v-collapse-toggle>
        Click me to toggle content
    </div>
    <div class="content" v-collapse-content>
        <v-collapse-wrapper>
            <div class="header" v-collapse-toggle>
                Click toggle to toggle content
            </div>
            <div class="content" v-collapse-content>
                This is hiddend content
            </div>
        </v-collapse-wrapper>
    </div>
</v-collapse-wrapper>
```





# Plugin
## Components
In this section of documentation you will find more detailed description the plugin. Each custom component provides own events and methods which can be used in order to extend functionality.

### v-collapse-wrapper
Wrapper component which should **always** be a parent of elements which are using `v-collapse-content ` and `v-collapse-toggle` directives.
Each of the `v-collapse-wrapper` component instance can use following methods, events and stores data, which can be used to perform custom actions. 

#### Methods

| Method        | Description |  Parameters |
| ------------- |:-------------:|:-------------:|
| `.open()`    | Open the instance | none
| `.close()`      | Close the instance| none
| `.toggle()` |   Toggle instance (opens if closed, closes if opened)  | none

##### Usage

In this example we are going to create a custom method which will be responsible for opening referred element. In order to get the instance of component we are using `ref` once again.

Template:
``` html
<v-collapse-wrapper ref="open_me">
    <div class="content" v-collapse-content>
        This is hiddend content
    </div>
</v-collapse-wrapper>
``` 

Vue instance:
``` javascript
module.exports = {
    ...
    methods : {
        trigger_refered_element : function(){
            this.$refs.open_me.open();
        }
    }
    ...
}
``` 

You can also make a reference of group component, that allows you to perform actions on multiple elements without creating multiple refs.

Template:
``` html
<v-collapse-group ref="my_group">
    <v-collapse-wrapper>
        <div class="my-content" v-collapse-content>
            This is hiddend content
        </div>
    </v-collapse-wrapper>
    <v-collapse-wrapper>
        <div class="my-content" v-collapse-content>
            This is hiddend content
        </div>
    </v-collapse-wrapper>
</v-collapse-group>
``` 

Vue instance:
``` javascript
module.exports = {
    ...
    methods : {
            open_second : function(){
                this.$refs.my_group.elements[1].open(); // opens second element
            }
        }
    ...
}
``` 

#### Events

| Event name        |   Arguments passed  | Description |
| ------------- |:-------------: |:-------------:|
| `beforeToggle`  | `vm {Object}` | Invoked before toggle action, returns component instance object|
| `afterToggle`  | `vm {Object}`| Invoked after toggle action, returns component instance object|
| `beforeClose` |  `vm {Object}`| Invoked before close action, returns component instance object|
| `afterClose` | `vm {Object}`| Invoked after close action, returns component instance object|
| `beforeOpen` |  `vm {Object}`| Invoked before open action, returns component instance object|
| `afterOpen` |  `vm {Object}`| Invoked before close action, returns component instance object|
| `afterNodesBinding` |  `vm {Object}, nodes {Object}`| Invoked during mount event in the component, returns component instance and nodes object with toggle and content DOM elements|
| `onStatusChange` |  `vm {Object}, new_status {Boolean}, old_status {Boolean}`| Invoked whenever status of the element changes from open to close (true is opened, false is closed)|

##### Usage
Events work the same way it is presented in official Vue documentation.

Template:
``` html
    <v-collapse-wrapper v-on:beforeClose="my_custom_action">
         <div class="header" v-collapse-toggle>
             Click me to toggle content
         </div>
        <div class="my-content" v-collapse-content>
            This is hiddend content
        </div>
    </v-collapse-wrapper>
``` 

Vue instance:
``` javascript
module.exports = {
    ...
    methods : {
            my_custom_action : function(vm){
                console.log(vm); // logs component object before closing itself
            }
        }
    ...
}
``` 

#### Data properties

Every wrapper components stores necessary data properties, which can be used at some point while extending plugin to own needs.

| Data property | Type |  Description |
| ------------- |:-------------:|:-------------:|
| `nodes`    | {Object} | Object stores DOM elements for toggler and the content. 
| `nodes.toggle`    | {Dom node} | HTML DOM element represents toggler element for the wrapper component. 
| `nodes.content`    | {Dom node} | HTML DOM element represents content element of the wrapper component. 
| `status`      |{Boolean}| The status of the component. Status decides whether element is toggled or not.


### v-collapse-group
This is a group component. Sometimes there is a need of creating several different accordion lists. Grouping list elements helps with more complex cases. Components stores list of all elements in the accordion.


``` html
<v-collapse-group :onlyOneActive="true">
    <v-collapse-wrapper> ... </v-collapse-wrapper>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
</v-collapse-group>

<v-collapse-group>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
    <v-collapse-wrapper> ... </v-collapse-wrapper>
</v-collapse-group>
```
First collapse group will allow only one element to be opened at the same time, while the second group can open all of the elements at the same time.

#### Computed properties
 
#### Custom properties
TODO
#### Methods
TODO

## Directives
### v-collapse-content
This directive ought to be applied on the DOM element which will contain content of single list element. **Only** this element will be able to be toggled on and off within wrapper component. Element with this directive should **not** be a parent of the element with `v-collapse-toggle` directive.

### v-collapse-toggle
The directive changes  a default behavior of the element and allows to click on it in order to toggle list element. Note that this directive should be located within the `<v-collapse-wrapper></v-collapse-wrapper>` in order to make it working without manual binding.
However if there is a need to create the toggle element somewhere else, not inside the wrapper component you can use vue's reference to make it work. 

# Examples

## Basic
<vuep template="#example-basic"></vuep>

<script v-pre type="text/x-template" id="example-basic">
  <template>
    <div>
     <v-collapse-wrapper>
         <div class="header" v-collapse-toggle>
             Click me to toggle content
         </div>
         <div class="my-content" v-collapse-content>
             This is hiddend content
         </div>
     </v-collapse-wrapper>
    </div>
  </template>

  <script>
  import VueCollapse from '/vue-collapse/src/doc.plugin.js' // different version of plugin. It has to be that way in order to make preview work.
    module.exports = {
      data: function () {
        return {}
      }
    }
  </script>
</script>





## Custom toggle element
<vuep template="#example-ref"></vuep>

<script v-pre type="text/x-template" id="example-ref">
  <template>
    <div>
      <button v-collapse-toggle="'toggle_first'">Toggle first element</button>
      <button v-collapse-toggle="'toggle_second'">Toggle second element</button>
      
      <v-collapse-wrapper ref="toggle_first" v-on:beforeToggle="beforeToggle()">
          <div class="my-content" v-collapse-content>
              This is hiddend content
          </div>
      </v-collapse-wrapper>
      <v-collapse-wrapper ref="toggle_second">
          <div class="my-content" v-collapse-content>
              This is hiddend content
          </div>
      </v-collapse-wrapper>
    </div>
  </template>

  <script>
  import VueCollapse from '/vue-collapse/src/doc.plugin.js' // different version of plugin. It has to be that way in order to make preview work.
    module.exports = {
      data: function () {
        return {}
      },
      methods:{
      beforeToggle : function(){
        console.log('siema')
      }
      }
    }
  </script>
</script>


## Custom toggle element with group
<vuep template="#example-ref-grouped"></vuep>

<script v-pre type="text/x-template" id="example-ref-grouped">
  <template>
    <div>
      <button v-collapse-toggle="'toggle_first'">Toggle first element</button>
      <button v-collapse-toggle="'toggle_second'">Toggle second element</button>
      <v-collapse-group>  
          <v-collapse-wrapper ref="toggle_first">
              <div class="my-content" v-collapse-content>
                  This is hiddend content
              </div>
          </v-collapse-wrapper>
          <v-collapse-wrapper ref="toggle_second">
              <div class="my-content" v-collapse-content>
                  This is hiddend content
              </div>
          </v-collapse-wrapper>
      </v-collapse-group>
    </div>
  </template>

  <script>
  import VueCollapse from '/vue-collapse/src/doc.plugin.js' // different version of plugin. It has to be that way in order to make preview work.
    module.exports = {
      data: function () {
        return {}
      }
    }
  </script>
</script>

## Nested accordions
<vuep template="#example-nested"></vuep>

<script v-pre type="text/x-template" id="example-nested">
  <template>
    <div>
     <v-collapse-wrapper>
         <div class="header" v-collapse-toggle>
             Click me to toggle content
         </div>
         <div class="my-content" v-collapse-content>
             <v-collapse-wrapper>
                 <div class="header" v-collapse-toggle>
                     Click toggle to toggle content
                 </div>
                 <div class="my-content" v-collapse-content>
                     This is hiddend content
                 </div>
             </v-collapse-wrapper>
         </div>
     </v-collapse-wrapper>
    </div>
  </template>

  <script>
  import VueCollapse from '/vue-collapse/src/doc.plugin.js' // different version of plugin. It has to be that way in order to make preview work.
    module.exports = {
      data: function () {
        return {}
      }
    }
  </script>
</script>


