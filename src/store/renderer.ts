import { getVariable } from '../utils/helper';
import { types, Instance, SnapshotIn } from 'mobx-state-tree';
import { StoreNode } from './node';

// TODO 渲染器 store 可以处理数据
export const RendererStore = StoreNode.named('RendererStore')
  .props({
    data: types.optional(types.frozen(), {}),
    dialogOpen: false,
    dialogData: types.optional(types.frozen(), {})
  })
  .views(self => ({
    getVariableByName(name: string, canAccessSuper = true) {
      return getVariable(self.data, name, canAccessSuper);
    }
  }))
  .actions(self => {
    return {
      initData(data: any) {
        self.data = data;
      },
      openDialog(data: any) {
        self.dialogData = data;
        self.dialogOpen = true;
      },
      closeDialog() {
        self.dialogOpen = false;
      }
    };
  });

export type IRendererStore = Instance<typeof RendererStore>;
export type SRendererStore = SnapshotIn<typeof RendererStore>;
