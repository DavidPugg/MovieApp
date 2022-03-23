import Vue from 'vue';

interface CustomHtmlElement extends HTMLElement {
    clickOutsideEvent: (event: MouseEvent) => void;
}

Vue.directive('click-outside', {
    bind(el, binding, vnode) {
        (el as CustomHtmlElement).clickOutsideEvent = function (event: MouseEvent) {
            if (!(el === event.target || el.contains(event.target as Node))) {
                (vnode.context as Vue)[binding.expression as keyof Vue](event);
            }
        };
        document.body.addEventListener('click', (el as CustomHtmlElement).clickOutsideEvent);
    },
    unbind(el) {
        document.body.removeEventListener('click', (el as CustomHtmlElement).clickOutsideEvent);
    },
});
