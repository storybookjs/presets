import Button from './Button.vue';

// eslint-disable-next-line import/no-default-export
export default { title: 'Button', component: Button };

export const Default = (): object => ({
  components: { Button },
  template: '<Button>Example</Button>',
});
