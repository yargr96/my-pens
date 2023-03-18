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

const DEFAULT_ACTIVE_NAV_ELEMENT_INDEX = 0;

const app = (): void => {
    const { closeMenu } = burgerMenu();

    const renderLoop = useRenderLoop();
    const mountElement = document.querySelector('#content');
    const navItemsContainer = document.querySelector('#nav-items');

    const navElements: Element[] = navItems.map(({ text }) => {
        const item = document.createElement('div');
        item.className = 'sidebar__item';
        item.textContent = text;

        return item;
    });

    const setActiveNavItem = (index: number): void => {
        navElements.forEach((element) => {
            element.classList.remove('active');
        });

        navElements[index].classList.add('active');
    };

    let activeModuleIndex = DEFAULT_ACTIVE_NAV_ELEMENT_INDEX;

    const mountModule = (index: number) => {
        mountElement.innerHTML = '';
        navItems[index].module(mountElement, renderLoop);
        setActiveNavItem(index);
    };

    const setActiveModule = (index: number) => {
        activeModuleIndex = index;
        mountModule(index);
    };

    mountModule(activeModuleIndex);

    navElements.forEach((element, index) => {
        navItemsContainer.appendChild(element);
        element.addEventListener('click', () => {
            setActiveModule(index);
            closeMenu();
        });
    });

    setActiveNavItem(DEFAULT_ACTIVE_NAV_ELEMENT_INDEX);

    mountElement.addEventListener('click', closeMenu);

    let timerId: NodeJS.Timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            mountModule(activeModuleIndex);
        }, 200);
    });
};

document.addEventListener('DOMContentLoaded', app);
