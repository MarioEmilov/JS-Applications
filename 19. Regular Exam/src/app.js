// NOT WORKING APP
import { html, render } from "lit-html/lit-html.js.js.js";
import { getUserData } from "./util.js";
//import { page } from "../node_modules/page/page.mjs";
import { logout } from "./api.js";

//let root = document.getElementById('site-content');

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

export function updateUserNav() {
    let userData = getUserData();

    if (userData == true) {
        document.getElementsByClassName('user').style.display = 'inline-block';
        document.getElementsByClassName('guest').style.display = 'none';
    } else {
        document.getElementsByClassName('guest').style.display = 'inline-block';
        document.getElementsByClassName('user').style.display = 'none';
    }
}

document.getElementsByClassName('logoutBtn').addEventListener('click', () => {
    logout();
    updateUserNav();
    page.redirect('/');
})

page(decorateContext)
updateUserNav();
page.start()