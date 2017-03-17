<p align="center">
  <a href="https://travis-ci.org/f15gdsy/vue-insert-compo"><img src="https://travis-ci.org/f15gdsy/vue-insert-compo.svg?branch=master" alt="Build Status"></a>
  <a href="https://codecov.io/gh/f15gdsy/vue-insert-compo"><img src="https://codecov.io/gh/f15gdsy/vue-insert-compo/branch/master/graph/badge.svg" alt="Coverage Status"></a>
  <a href="https://saucelabs.com/beta/builds/78a4d44d1e494763b9aed392f3e00e7b"><img src="https://saucelabs.com/buildstatus/vue-insert-compo" alt="Build Status"></a>
  <img src="https://img.shields.io/badge/gzip-1.5KB-blue.svg" alt="GZIP Size">
  <br>
  <a href="https://saucelabs.com/beta/builds/78a4d44d1e494763b9aed392f3e00e7b"><img src="https://saucelabs.com/browser-matrix/vue-insert-compo.svg" alt="Build Status"></a>
</p>


# vue-insert-compo
A lightweight helper to insert Vue component and create Vue popups easily. Check out [Demo](https://f15gdsy.github.io/vue-insert-compo/)

## What
vue-insert-compo can help you insert Vue component dynamically into the DOM tree.
Some use cases are:
* global modals
* global notifications
* global loading
* global messages
* anything you can think of

### Browser Compatabilities
Supports all major browsers, IE >= 9.

NOTE: For IE 9, you need a Promise polyfill to use vue-insert-compo.


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
 * { String | HTMLElement } opts.hideEl - The hideEl will be hidden when the component is enabled, and shown when the component is disabled. Can left empty if you don't want this behavior.
 * { String | HTMLElement } opts.wrapperEl - The wrapperEl will be the wrapper of the component if specified. Default is null, and the component is inserted to the body.


```javascript
const insertCompo = new VueInsertCompo(Compo)

// or,

const insertCompo = new VueInsertCompo(Compo, { 
  hideEl: '#el-to-hide',
  wrapperEl: '#wrapper-el'
})
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
