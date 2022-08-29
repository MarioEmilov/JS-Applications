import { html, render } from "../node_modules/lit-html/lit-html.js";

import { loadAllBooks } from "./api.js";
import { booksTemplate } from "./booksTemplate.js";

let baseUrl = 'http://localhost:3030/jsonstore/collections/books';

document.getElementById('loadBooks').addEventListener('click', onLoad);

async function onLoad() {
    let tableBody = document.querySelector('.container tbody');

    let booksData = await loadAllBooks();

    let template = booksTemplate(Object.values(booksData));
    render(template, tableBody);
}

let Addform = document.getElementById('add-form');
let submitBtn = document.querySelector('#add-form input[type="submit"]');
submitBtn.addEventListener('click', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(Addform);

    const title = formData.get('title').trim();
    const author = formData.get('author').trim();
    const editBtn = formData

    try {
        const res = await fetch(baseUrl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })

        if (res.ok != true) {
            const error = await res.json();
            throw Error(error.message);
        }
    } catch (error) {
        alert(error.message);
    }

    Addform.reset();
    onLoad();
}

let editForm = document.getElementById('edit-form');
editForm.style.display = 'none';



