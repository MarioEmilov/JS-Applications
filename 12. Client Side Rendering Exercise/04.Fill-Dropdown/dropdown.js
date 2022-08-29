import { html, render } from "../node_modules/lit-html/lit-html.js";
let baseUrl = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function getAllItems() {
    const res = await fetch(baseUrl);
    const data = await res.json();
    return data;
}

let items = Object.values(await getAllItems());

let cardTemplate = html`${items.map(item => html`<option value=${item._id}>${item.text}</option>`)}`
let main = document.getElementById('menu');
render(cardTemplate, main);

document.querySelector('input[type="submit"]').addEventListener('click', addItem);

async function addItem(e) {
    e.preventDefault();

    let text = document.getElementById('itemText');
    let res = await fetch(baseUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.value })
    })

    let data = await res.json();

    items.push(data)

    if (res.ok == true) {
        cardTemplate = html`${items.map(item => html`<option value=${item._id}>${item.text}</option>`)}`
        render(cardTemplate, main)
    }

    text.value = '';
}