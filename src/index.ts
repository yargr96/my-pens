import '@/styles/main.scss';

import burgerMenu from '@/layout/buger-menu';
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
    const { closeMenu } = burgerMenu();

    const renderLoop = useRenderLoop();
    const mountElement = document.querySelector('#content');
    const navItemsContainer = document.querySelector('#nav-items');

    navItems[0].module(mountElement, renderLoop);

    navItems.forEach(({ text, module }) => {
        const item = document.createElement('div');
        item.className = 'sidebar__item';
        item.textContent = text;

        item.addEventListener('click', () => {
            mountElement.innerHTML = '';
            module(mountElement, renderLoop);
            closeMenu();
        });

        navItemsContainer.appendChild(item);
    });

    mountElement.addEventListener('click', closeMenu);
};

document.addEventListener('DOMContentLoaded', app);
