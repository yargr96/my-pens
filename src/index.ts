import '@/styles/main.scss';

import gravity from '@/modules/gravity';
import sierpinskiTriangle from '@/modules/sierpinski-triangle';

const modules = {
    gravity,
    sierpinskiTriangle,
};

interface INavElement extends HTMLElement {
    dataset: { nav: keyof typeof modules };
}

const app = (): void => {
    const mountElement = document.querySelector('#content');

    const navElements: NodeListOf<INavElement> = document.querySelectorAll('.nav-item');
    navElements.forEach((element) => {
        element.addEventListener('click', () => {
            const { nav } = element.dataset;

            modules[nav](mountElement);
        });
    });
};

document.addEventListener('DOMContentLoaded', app);
