import '@/styles/main.scss';

import gravity from '@/modules/gravity';
import sierpinskiTriangle from '@/modules/sierpinski-triangle';

const modules = {
    gravity,
    sierpinskiTriangle,
};

const app = (): void => {
    modules.gravity();
};

document.addEventListener('DOMContentLoaded', app);
