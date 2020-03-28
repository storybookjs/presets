<template>
  <div class="button-class">{{label}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ButtonClass extends Vue {
  @Prop({ type: String, default: 'Label'}) private label!: string;
}
</script>

<style>
.button-class {
  display: inline-block;
  border: 1px solid #aaa;
  background-color: #fff;
  border-radius: 3px;
}
</style>
