import { isAlive } from 'mobx-state-tree';
import { IStoreNode } from './node';

const stores: {
  [id: string]: IStoreNode;
} = {};

export function getStoreById(id: string): IStoreNode | undefined {
  return stores[id];
}

// 增加
export function addStore(store: IStoreNode): IStoreNode {
  stores[store.id] = store;

  return store;
}

const isDelete: string[] = [];

// 删除某个节点 - dispose 成功后要同步删除 stores 里缓存的节点
// 但是 dispose 不一定立马会删除节点，所以需要保存起来，一旦成功删除一个节点，就要遍历一下 stores ，清除节点
export function removeStore(store: IStoreNode) {
  isDelete.push(store.id);
  store.dispose(cleanUp);
}

function cleanUp() {
  let i = isDelete.length - 1;

  while (i >= 0) {
    const id = isDelete[i];
    if (stores[id] && !isAlive(stores[id])) {
      isDelete.splice(i, 1);
      delete stores[id];
    }
    i--;
  }
}
