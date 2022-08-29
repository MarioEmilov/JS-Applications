import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";


let cardTemplate = (c) => html`
<ul>
    <li>
        <img src="./images/${c.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onClick}>Show status code</button>
            <div class="status" style="display: none" id=${c.id}>
                <h4>${c.statusCode}</h4>
                <p>${c.statusMessage}</p>
            </div>
        </div>
    </li>
</ul>`;

function onClick(e) {
    e.preventDefault();

    let cat = e.target.parentNode;
    console.log(cat);
    let result = cat.querySelector('.status').style.display;

    if (result == 'block') {
        cat.querySelector('.status').style.display = 'none';
    } else {
        cat.querySelector('.status').style.display = 'block';
    }
}

let result = cats.map(c => cardTemplate(c));
let main = document.getElementById('allCats');
render(result, main)


