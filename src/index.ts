import '@/styles/main.scss';

import gravity from '@/modules/gravity';
import sierpinskiTriangle from '@/modules/sierpinski-triangle';

const modules = {
    gravity,
    sierpinskiTriangle,
};

const app = (): void => {
    const mountElement = document.querySelector('#content');

    const navElements: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-item');
    navElements.forEach((element) => {
        element.addEventListener('click', () => {
            const { nav }: {
                nav: keyof typeof modules
            } = element.dataset as { nav: keyof typeof modules };

            modules[nav](mountElement);
        });
    });
};

document.addEventListener('DOMContentLoaded', app);
