import Button from './Button.vue';

// eslint-disable-next-line import/no-default-export
export default { title: 'Button', component: Button };

// eslint-disable-next-line @typescript-eslint/ban-types
export const Default = (): object => ({
  components: { Button },
  template: '<my-button>Example</my-button>',
});
