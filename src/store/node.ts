import { types, Instance, destroy, SnapshotIn } from 'mobx-state-tree';
import { getStoreById } from './manager';

/**
 * store 基类 - 添加树的基本操作
 *
 * Root节点比较特殊，其他 Store 节点都是 StoreNode 的子类
 *
 * 属性：
 * id - 唯一标识
 * path - 路径
 * storetype - store 类型
 * parentId - 父 store id
 * childrenIds - 子 store id数组
 *
 * 方法：
 * addChildId - 增加一个子 store
 * removeChildId - 移除一个子 store
 * dispose - 销毁自己（要销毁自己和子 store，通知父 store 移除自己)
 *
 * onChildStoreDispose 监听子 store 的销毁事件
 *
 */
export const StoreNode = types
  .model('StoreNode', {
    id: types.identifier,
    path: '',
    storeType: types.string,
    parentId: '',
    disposed: types.optional(types.boolean, false),
    childrenIds: types.optional(types.array(types.string), [])
  })
  .views(self => {
    return {
      get parentStore(): any {
        return self.parentId && getStoreById(self.parentId);
      },
      get children(): any {
        return self.childrenIds.map(id => getStoreById(id));
      },
      get hasChildren() {
        return !!self.childrenIds.length;
      }
    };
  })
  .actions(self => {
    function addChildId(id: string) {
      self.childrenIds.push(id);
    }

    function removeChildId(id: string) {
      const childIds = self.childrenIds.filter(cid => cid !== id);

      self.childrenIds.replace(childIds);

      // 如果当前节点是需要删除的，则每次移除child的时候都要判断一下
      if (self.disposed) {
        dispose();
      }
    }

    // 限制：要保证只有当子全部移除后才能移除父，如果是叶子结点，则会直接被删除
    function dispose(callback?: () => void) {
      // 先打个标记，暂时不删除，等子全部删除了之后再删除当前节点
      self.disposed = true;

      if (!self.hasChildren) {
        const parentStore = self.parentStore;
        parentStore?.onChildStoreDispose(self);
        destroy(self);
        callback?.();
      }
    }

    return {
      onChildStoreDispose(child: any) {
        removeChildId(child.id);
      },

      addChildId,
      removeChildId,
      dispose
    };
  });

export type IStoreNode = Instance<typeof StoreNode>;
export type SStoreNode = SnapshotIn<typeof StoreNode>;
