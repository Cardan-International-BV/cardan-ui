// vue-axe ships without type declarations
declare module 'vue-axe' {
  import type { Component, Plugin } from 'vue';

  const VueAxe: Plugin;
  export const VueAxePopup: Component;
  export default VueAxe;
}
