export function addClass(el: HTMLElement, klass: string | string[]) {
  if (typeof klass === 'string') {
    klass = klass.split(' ');
  }

  const classList = el.classList;

  for (let i = 0; i < klass.length; i++) {
    if (!klass[i]) continue;

    classList.add(klass[i]);
  }
}

export function removeClass(el: HTMLElement, klass: string | string[]) {
  if (typeof klass === 'string') {
    klass = klass.split(' ');
  }

  const classList = el.classList;

  for (let i = 0; i < klass.length; i++) {
    if (!klass[i]) continue;

    classList.remove(klass[i]);
  }
}
