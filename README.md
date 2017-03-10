# vue-insert-compo
A lightweight helper to insert Vue component and create Vue popups easily.

## What
vue-insert-compo can help you insert Vue component dynamically into the DOM tree.


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
import InsertCompo from 'vue-insert-compo'
import Alert from './Alert.vue'

const messenger = new InsertCompo(Alert)

messenger.enable()    // Insert the Alert component into DOM tree
messenger.disable()   // Hide the Alert component, it is still in memory, no pain to enable again
messenger.toggle()    // Toggle the Alert component
messenger.destroy()   // Destroy the Alert component
```


## API
todo
