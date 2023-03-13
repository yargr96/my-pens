import '@/styles/main.scss';

import sierpinskiTriangle from '@/modules/sierpinski-triangle';

const app = (): void => {
    sierpinskiTriangle();
};

document.addEventListener('DOMContentLoaded', app);
