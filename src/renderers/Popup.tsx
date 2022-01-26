import { addClass, removeClass } from '../utils/dom';

let modal: HTMLElement | undefined;
function getModal() {
  if (!modal) {
    modal = document.createElement('div');
    addClass(modal, 'n-modal');
  }

  return modal;
}

export const PopupManager = {
  zIndex: 2000,

  nextZIndex() {
    return this.zIndex++;
  },

  openModal() {
    const modal = getModal();
    modal.style.zIndex = `${this.nextZIndex()}`;
    addClass(modal, 'is-visible');
  },

  closeModal() {
    const modal = getModal();
    removeClass(modal, 'is-visible');
  }
};
