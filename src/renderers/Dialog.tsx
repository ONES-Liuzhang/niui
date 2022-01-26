import { Schema, SchemaNode } from '../Schema';
import { defineComponent, PropType, toRef } from 'vue';

interface DialogSchema extends Schema {
  type: 'dialog';

  body?: SchemaNode;

  onConfirm: () => void;

  onCancel: () => void;
}

const dialogProps = {
  show: Boolean,
  onConfirm: Function as PropType<() => void>,
  onCancel: Function as PropType<() => void>,
  onAction: Function as PropType<() => void>,
  zIndex: Number
} as const;

const Dialog = defineComponent({
  name: 'NDialog',
  props: dialogProps,
  setup(props, { slots }) {
    const visible = toRef(props, 'show');

    function renderFooter() {
      return <div class="n-dialog__footer"></div>;
    }

    function renderHeader() {
      return <div class="n-dialog__header"></div>;
    }

    return (
      <div
        class="n-dialog"
        style={{ display: visible.value ? 'block' : 'none' }}
      >
        {renderHeader()}
        {slots.default?.()}
        {renderFooter()}
      </div>
    );
  }
});
