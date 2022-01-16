import { PlainObject } from '../types';
import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { getVariable } from 'src/utils/helper';

import { StoreNode } from './node';

export const iRendererStore = StoreNode.named('iRendererStore')
  .props({
    hasRemoteData: types.optional(types.boolean, false),
    data: types.optional(types.frozen(), {}),
    initedAt: 0, // 初始 init 的时刻
    updatedAt: 0, // 从服务端更新时刻
    pristine: types.optional(types.frozen(), {}),
    action: types.optional(types.frozen(), undefined),
    dialogOpen: false,
    dialogData: types.optional(types.frozen(), undefined),
    drawerOpen: false,
    drawerData: types.optional(types.frozen(), undefined)
  })
  .views(self => ({
    getValueByName(name: string, canAccessSuper = true) {
      return getVariable(self.data, name, canAccessSuper);
    },

    getPristineValueByName(name: string, canAccessSuper = true) {
      return getVariable(self.pristine, name, canAccessSuper);
    }
  }))
  .actions(self => {
    // TODO
    // const dialogCallbacks = new Map();

    return {
      initData(data: object = {}, skipSetPristine = false) {
        self.initedAt = Date.now();

        !skipSetPristine && (self.pristine = data);
        self.data = data;
      },

      reset() {
        self.data = self.pristine;
      },

      updateData(data: object = {}, tag?: object, replace?: boolean) {
        const prev = self.data;
        let newData;
        // TODO
        console.log('updateData', data, tag, replace);
        // if (tag) {
        //   const proto = createObject((self.data as any).__super || null, tag);
        //   newData = createObject(proto, {
        //     ...(replace ? {} : self.data),
        //     ...data
        //   });
        // } else {
        //   newData = extendObject(self.data, data, !replace);
        // }

        Object.defineProperty(newData, '__prev', {
          value: { ...prev },
          enumerable: false,
          configurable: false,
          writable: false
        });

        self.data = newData;
      },

      changeValue(
        name: string,
        value: any,
        changePristine?: boolean,
        force?: boolean,
        otherModifier?: (data: PlainObject) => void
      ) {
        // TODO
        console.log(
          'changeValue',
          name,
          value,
          changePristine,
          force,
          otherModifier
        );
      },

      setCurrentAction(action: object) {
        self.action = action;
      },

      openDialog(ctx: any, additonal?: object, callback?: (ret: any) => void) {
        // TODO
        console.log('openDialog', ctx, additonal, callback);
      },

      closeDialog(result?: any) {
        // TODO
        console.log('closeDialog', result);
      }
    };
  });

export type IIRendererStore = Instance<typeof iRendererStore>;
export type SIRendererStore = SnapshotIn<typeof iRendererStore>;
// export type SIRendererStore = typeof iRendererStore.SnapshotType;
