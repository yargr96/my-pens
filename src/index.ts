import '@/styles/main.scss';

import burgerMenu from '@/layout/buger-menu';
import gravity from '@/modules/gravity';
import sierpinskiTriangle from '@/modules/sierpinski-triangle';
import gameOfLife from '@/modules/game-of-life';
import { IModule, Module } from '@/modules/moduleTypes';

interface INavItem {
    text: string;
    module: Module;
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
    {
        text: 'Game of Life',
        module: gameOfLife,
    },
];

const DEFAULT_ACTIVE_NAV_ELEMENT_INDEX = 2;

const app = (): void => {
    const { closeMenu } = burgerMenu();

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
    let activeModule: IModule;

    const mountModule = (index: number) => {
        activeModule?.beforeUnmount?.();
        mountElement.innerHTML = '';
        activeModule = navItems[index].module(mountElement);
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
