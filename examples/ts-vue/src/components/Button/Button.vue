<template>
  <button class="button" @click="onClick" @dblclick="onDoubleClick">
    <slot />!
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Button',
  methods: {
    onClick($event: Event) {
      /**
       * Emitted when the button is clicked.
       * @event click
       * @type {Event}
       */
      this.$emit('click', $event);
    },
    onDoubleClick($event: Event) {
      /**
       * Emitted when the button is double clicked.
       * @event doubleClick
       * @type {Event}
       */
      this.$emit('double-click', $event);
    },
  },
  props: {
    /**
     * The button's color.
     */
    color: {
      type: String,
      default: '#333',
    },
  },
});
</script>
