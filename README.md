# vue-insert-compo
A lightweight helper to insert Vue component and create Vue popups easily.

## What
vue-insert-compo can help you insert Vue component dynamically into the DOM tree.
Some use cases are:
* global notifications
* global modals
* global masks
* anything you can think of


## How

### 1. Installation
If you are using npm:
```
npm install vue-insert-compo --save
```

If you are using yarn:
```
yarn add vue-insert-compo
```


### 2. Use
First, you need to create a Vue component that you want to insert dynamically:
```javascript
// Alert.vue
<template>
  <div v-if="enable"
    styled="position: fixed; top: 50vh; left: 50vh;">
    <div>You are using vue-insert-compo</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // required
      enable: true
    }
  }
}
</script>
```

Second, you can use vue-insert-compo to create a global instance (or a module):
```javascript
import VueInsertCompo from 'vue-insert-compo'
import Alert from './Alert.vue'

const messenger = new VueInsertCompo(Alert)

messenger.enable()    // Insert the Alert component into DOM tree
messenger.disable()   // Hide the Alert component, it is still in memory, no pain to enable again
messenger.toggle()    // Toggle the Alert component
messenger.destroy()   // Destroy the Alert component
```


## API
### Constructor
#### params:
* { Component } Compo - A valid Vue Component, **requiring a boolean "enable" property in data().**
* { Object } opts - Options
 * { String | HTMLElement } opts.hideEl - The element which will be hidden when the component is enabled, and shown when the component is disabled. Can left empty if you don't want this behavior.

```javascript
const insertCompo = new VueInsertCompo(Compo)

// or,

const insertCompo = new VueInsertCompo(Compo, { hideEl: '#el-to-hide' })
```

### .enable()
Will show the component.
* return { Promise } - The promise will be resolved when the component is shown.

### .disable()
Will hide the component.
* return { Promise } - The promise will be resolved when the component is hidden.

### .toggle()
Will toggle the visibility of the component
* return { Promise } - The promise will be resolved when the component is shown / hidden.

### .destroy()
Will clean up the VueInsertCompo instance and the DOM elements created.
