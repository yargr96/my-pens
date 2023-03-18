import '@/styles/main.scss';

import gravity from '@/modules/gravity';
import sierpinskiTriangle from '@/modules/sierpinski-triangle';
import useRenderLoop from '@/utils/useRenderLoop';

const modules = {
    gravity,
    sierpinskiTriangle,
};

interface INavElement extends HTMLElement {
    dataset: { nav: keyof typeof modules };
}

const app = (): void => {
    const renderLoop = useRenderLoop();
    const mountElement = document.querySelector('#content');

    const navElements: NodeListOf<INavElement> = document.querySelectorAll('.nav-item');
    navElements.forEach((element) => {
        element.addEventListener('click', () => {
            const { nav } = element.dataset;

            mountElement.innerHTML = '';
            modules[nav](mountElement, renderLoop);
        });
    });
};

document.addEventListener('DOMContentLoaded', app);
