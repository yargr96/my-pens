const BurgerMenu = () => {
    const burger = document.querySelector('#burger');
    const sidebar = document.querySelector('#sidebar');

    burger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    const closeMenu = () => sidebar.classList.remove('active');

    return { closeMenu };
};

export default BurgerMenu;
