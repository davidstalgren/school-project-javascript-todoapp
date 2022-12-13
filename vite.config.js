import { defineConfig } from 'vite';

/*
Om ditt repo har adressen https://github.com/Medieinstitutet/fed22d-js-grundkurs-jenni-wumpus,
då ska "base" här nedan vara "/fed22d-js-grundkurs-jenni-wumpus/"
 */

export default defineConfig({
  base: '/fed22d-js-grundkurs-2-todo-davidstalgren', // TODO - ändra till ditt repo-namn
  define: {
    'process.env': {},
  },
});
