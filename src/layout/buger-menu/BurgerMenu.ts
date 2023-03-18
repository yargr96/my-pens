interface IBurgerMenu {
    closeMenu: () => void;
}

const BurgerMenu = (): IBurgerMenu => {
    const burger = document.querySelector('#burger');
    const sidebar = document.querySelector('#sidebar');

    burger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    const closeMenu = (): void => {
        sidebar.classList.remove('active');
    };

    return { closeMenu };
};

export default BurgerMenu;
