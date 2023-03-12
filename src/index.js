import './styles/main.scss';

import sierpinskiTriangle from "./modules/sierpinski-triangle";

const app = () => {
    sierpinskiTriangle();
};

document.addEventListener('DOMContentLoaded', app);