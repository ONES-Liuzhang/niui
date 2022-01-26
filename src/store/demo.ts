import { types } from 'mobx-state-tree';

export const CounterStore = types
  .model('CounterStore', {
    count: types.optional(types.number, 0)
  })
  .actions(self => {
    return {
      decrement() {
        self.count--;
      },
      increment() {
        self.count++;
      }
    };
  });
