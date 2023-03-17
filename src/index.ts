import '@/styles/main.scss';

import gravity from '@/modules/gravity';
import sierpinskiTriangle from '@/modules/sierpinski-triangle';

const modules = {
    gravity,
    sierpinskiTriangle,
};

const app = (): void => {
    const mountElement = document.querySelector('#content');
    modules.gravity(mountElement);
};

document.addEventListener('DOMContentLoaded', app);
