import { RendererStore } from './renderer';
import { IStoreNode, StoreNode } from './node';
import { getEnv, Instance, SnapshotIn, types } from 'mobx-state-tree';
import { addStore, removeStore } from './manager';
import { find } from '../utils/share';

const Stores = [StoreNode, RendererStore];

// 根 store - 配置环境变量
export const RootStore = types
  .model('RootStore', {
    storeType: 'RootStore'
  })
  .views(self => {
    return {
      get fetcher() {
        return getEnv(self).fetcher;
      }
    };
  })
  .actions(self => {
    return {
      addStore(store: {
        id: string;
        path: string;
        storeType: string;
        parentId: string;
        [propsName: string]: any;
      }): IStoreNode {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const factory = find(Stores, s => s.name === store.storeType)!;

        // addStore 的时候为其他 store 注入灵魂(env)
        return addStore(factory.create(store, getEnv(self)));
      },

      removeStore(store: IStoreNode) {
        removeStore(store);
      }
    };
  });

export type IRootStore = Instance<typeof RootStore>;
export type SRootStore = SnapshotIn<typeof RootStore>;

export { RendererStore } from './renderer';
export type { IRendererStore, SRendererStore } from './renderer';
