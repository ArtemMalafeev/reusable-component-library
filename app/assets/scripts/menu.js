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

const modal = (modalId, openId, closeId) => {
    const modal = document.getElementById(modalId);
    const open = document.getElementById(openId);
    const close = document.getElementById(closeId);

    open.addEventListener('click', () => {
        console.log('-');
        modal.style.display = 'block';
        document.body.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.overflow = 'initial';
    });
};

modal('modal', 'modal-open', 'modal-close');