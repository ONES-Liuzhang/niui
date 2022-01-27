export interface Handler {
  fulfilled?: Promise<any>;
  reason?: Promise<any>;
}

export interface IIntercepter {
  list: Array<Handler>;
  use: (fulfilled?: Promise<any>, reason?: Promise<any>) => number;
}

export class Intercepter implements IIntercepter {
  list: Array<Handler>;

  constructor() {
    this.list = [];
  }

  use(fulfilled?: Promise<any>, reason?: Promise<any>) {
    this.list.push({ fulfilled, reason });
    return this.list.length - 1;
  }
}
