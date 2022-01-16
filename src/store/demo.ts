import { observable, action, computed, makeObservable } from 'mobx';

export class CounterStore {
  @observable
  count = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  increment() {
    this.count++;
  }

  @action
  decrement() {
    this.count--;
  }

  @computed
  get double() {
    return this.count * 2;
  }
}
