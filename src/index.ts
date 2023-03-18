import '@/styles/main.scss';

import gravity from '@/modules/gravity';
import sierpinskiTriangle from '@/modules/sierpinski-triangle';
import useRenderLoop, { IRenderLoop } from '@/utils/useRenderLoop';

interface INavItem {
    text: string;
    module: (mountElement: Element, renderLoop: IRenderLoop) => void;
}

const navItems: INavItem[] = [
    {
        text: 'Gravity',
        module: gravity,
    },
    {
        text: 'Sierpinski triangle',
        module: sierpinskiTriangle,
    },
];

const app = (): void => {
    const renderLoop = useRenderLoop();
    const mountElement = document.querySelector('#content');
    const navItemsContainer = document.querySelector('#nav-items');

    navItems.forEach(({ text, module }) => {
        const item = document.createElement('div');
        item.className = 'sidebar__item';
        item.textContent = text;

        item.addEventListener('click', () => {
            mountElement.innerHTML = '';
            module(mountElement, renderLoop);
        });

        navItemsContainer.appendChild(item);
    });
};

document.addEventListener('DOMContentLoaded', app);
