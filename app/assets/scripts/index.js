const menu = (toggleId, menuId) => {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    const body = document.querySelector('body');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('navigation__menu--show');
            body.classList.toggle('page--hidden');
            toggle.classList.toggle('navigation__toggle--open')
        });
    }
};

menu('navigation-open', 'navigation-menu');

const theme = (toggleId) => {
    const page = document.documentElement;
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener('click', () => {
        page.toggleAttribute('black');
    });
};

theme('theme-changer');

const modal = (modalId, openId, closeId) => {
    const modal = document.getElementById(modalId);
    const open = document.getElementById(openId);
    const close = document.getElementById(closeId);

    open.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.overflow = 'initial';
    });
};

modal('modal', 'modal-open', 'modal-close');
