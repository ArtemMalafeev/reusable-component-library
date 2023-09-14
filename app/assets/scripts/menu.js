const menu = (toggleId, menuId) => {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('navigation__menu--show');
        })
    }
};

menu('navigation-open', 'navigation-menu');
