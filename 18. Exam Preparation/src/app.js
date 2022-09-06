import { html, render } from "lit-html/lit-html.js.js.js";
import { getUserData } from "./util.js";
import { page } from "page/page.mjs.js.js";
import { logout } from "./api.js";

let root = document.getElementById('site-content');

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

export function updateUserNav() {
    let userData = getUserData();

    if (userData == true) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    updateUserNav();
    page.redirect('/');
})

page(decorateContext)
updateUserNav();
page.start()